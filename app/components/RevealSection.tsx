'use client';
import { useRef, useEffect, ReactNode } from 'react';

type Variant = 'default' | 'blur' | 'left' | 'scale';

interface Props {
  children: ReactNode;
  delay?: number;      // ms
  className?: string;
  variant?: Variant;
}

const variantClass: Record<Variant, string> = {
  default: 'reveal',
  blur:    'reveal-blur',
  left:    'reveal-left',
  scale:   'reveal-scale',
};

export default function RevealSection({
  children,
  delay = 0,
  className = '',
  variant = 'default',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('visible');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${variantClass[variant]} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
