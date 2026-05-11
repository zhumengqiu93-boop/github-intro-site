'use client';
import { useRef, ElementType } from 'react';

/* Mix of ASCII symbols + numbers — works for English labels */
const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%*!?&/\\';

interface Props {
  children: string;
  as?: ElementType;
  className?: string;
  /** Characters revealed per animation frame (higher = faster resolve) */
  speed?: number;
}

export default function ScrambleText({
  children,
  as: Tag = 'span',
  className = '',
  speed = 0.45,
}: Props) {
  const elRef    = useRef<HTMLElement>(null);
  const frameRef = useRef<number>(0);
  const iterRef  = useRef(0);

  const scramble = () => {
    const el = elRef.current;
    if (!el) return;
    cancelAnimationFrame(frameRef.current);
    iterRef.current = 0;

    const original = children;

    const tick = () => {
      el.textContent = original
        .split('')
        .map((ch, i) => {
          if (ch === ' ') return ' ';
          if (i < Math.floor(iterRef.current)) return ch;
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join('');

      if (iterRef.current < original.length) {
        iterRef.current += speed;
        frameRef.current = requestAnimationFrame(tick);
      } else {
        el.textContent = original;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  const reset = () => {
    cancelAnimationFrame(frameRef.current);
    if (elRef.current) elRef.current.textContent = children;
  };

  return (
    <Tag
      ref={elRef}
      className={'scramble-wrap ' + className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
    >
      {children}
    </Tag>
  );
}
