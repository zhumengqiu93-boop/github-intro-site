'use client';
import { useRef, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export default function TiltCard({ children, className = '', intensity = 8 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(8px)`;
    el.style.transition = 'transform 0.08s ease';
    el.style.setProperty('--mx', `${(x + 0.5) * 100}%`);
    el.style.setProperty('--my', `${(y + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
    el.style.transition = 'transform 0.55s cubic-bezier(0.2,0,0,1)';
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`card-spotlight ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}
