'use client';
import { useRef, ReactNode, MouseEvent } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  as?: 'button' | 'a';
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.35,
  as: Tag = href ? 'a' : 'button',
}: Props) {
  const wrapRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const ease = 'cubic-bezier(0.2,0,0,1)';

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el = wrapRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width / 2;
    const dy = e.clientY - rect.top - rect.height / 2;
    el.style.transform    = `translate(${dx * strength * 0.5}px, ${dy * strength * 0.5}px)`;
    inner.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    el.style.transition    = `transform 0.12s ${ease}`;
    inner.style.transition = `transform 0.12s ${ease}`;
  };

  const onLeave = () => {
    const el = wrapRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;
    el.style.transform    = 'translate(0,0)';
    inner.style.transform = 'translate(0,0)';
    el.style.transition    = `transform 0.55s ${ease}`;
    inner.style.transition = `transform 0.55s ${ease}`;
  };

  const addRipple = (e: MouseEvent<HTMLElement>) => {
    const el = wrapRef.current;
    if (!el || !el.classList.contains('btn-accent')) return;
    const rect = el.getBoundingClientRect();
    const span = document.createElement('span');
    span.className = 'ripple';
    span.style.left = `${e.clientX - rect.left - 30}px`;
    span.style.top  = `${e.clientY - rect.top  - 30}px`;
    el.appendChild(span);
    span.addEventListener('animationend', () => span.remove());
  };

  return (
    <Tag
      ref={wrapRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseDown={addRipple}
      className={className}
    >
      <span ref={innerRef} style={{ display: 'block' }}>
        {children}
      </span>
    </Tag>
  );
}
