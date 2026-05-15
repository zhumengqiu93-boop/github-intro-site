'use client';
import { useRef, ReactNode, MouseEvent } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  as?: 'button' | 'a';
  blob?: boolean;
}

export default function MagneticButton({
  children,
  className = '',
  href,
  onClick,
  strength = 0.35,
  as: Tag = href ? 'a' : 'button',
  blob = false,
}: Props) {
  const wrapRef  = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const blobRef  = useRef<HTMLSpanElement>(null);
  const shinyRef = useRef<HTMLSpanElement>(null);

  const ease = 'cubic-bezier(0.2,0,0,1)';

  const onEnter = (e: MouseEvent<HTMLElement>) => {
    const shiny = shinyRef.current;
    if (shiny) shiny.classList.add('mag-shiny-active');

    if (!blob) return;
    const el = wrapRef.current;
    const b  = blobRef.current;
    if (!el || !b) return;
    const rect = el.getBoundingClientRect();
    b.style.left = `${e.clientX - rect.left}px`;
    b.style.top  = `${e.clientY - rect.top}px`;
    b.classList.add('blob-active');
  };

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const el    = wrapRef.current;
    const inner = innerRef.current;
    const shiny = shinyRef.current;
    if (!el || !inner) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - rect.left - rect.width  / 2;
    const dy = e.clientY - rect.top  - rect.height / 2;
    el.style.transform    = `translate(${dx * strength * 0.5}px, ${dy * strength * 0.5}px)`;
    inner.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    el.style.transition    = `transform 0.12s ${ease}`;
    inner.style.transition = `transform 0.12s ${ease}`;
    if (shiny) {
      shiny.style.setProperty('--mag-sx', `${e.clientX - rect.left}px`);
      shiny.style.setProperty('--mag-sy', `${e.clientY - rect.top}px`);
    }
  };

  const onLeave = () => {
    const el    = wrapRef.current;
    const inner = innerRef.current;
    const b     = blobRef.current;
    const shiny = shinyRef.current;
    if (!el || !inner) return;
    el.style.transform    = 'translate(0,0)';
    inner.style.transform = 'translate(0,0)';
    el.style.transition    = `transform 0.55s ${ease}`;
    inner.style.transition = `transform 0.55s ${ease}`;
    if (b) b.classList.remove('blob-active');
    if (shiny) shiny.classList.remove('mag-shiny-active');
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

  const blobClass = blob ? ' relative overflow-hidden' : ' relative overflow-hidden';

  return (
    <Tag
      ref={wrapRef as React.RefObject<HTMLButtonElement & HTMLAnchorElement>}
      href={href}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onMouseDown={addRipple}
      className={className + blobClass}
    >
      {blob && <span ref={blobRef} className="blob-fill" aria-hidden />}
      {/* Shiny cursor-tracking glint overlay */}
      <span
        ref={shinyRef}
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          borderRadius: 'inherit',
          background: 'radial-gradient(circle 80px at var(--mag-sx, 50%) var(--mag-sy, 50%), rgba(255,255,255,0.18) 0%, transparent 70%)',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          zIndex: 2,
        }}
      />
      <span ref={innerRef} style={{ display: 'block', position: 'relative', zIndex: 3 }}>
        {children}
      </span>
    </Tag>
  );
}
