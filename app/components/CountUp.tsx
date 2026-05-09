'use client';
import { useRef, useEffect, useState } from 'react';

interface Props {
  value: string;   // e.g. "3000" or "4.9"
  suffix?: string; // e.g. "+" or ""
  duration?: number;
}

export default function CountUp({ value, suffix = '', duration = 1600 }: Props) {
  const num = parseFloat(value);
  const isFloat = value.includes('.');
  const decimals = isFloat ? (value.split('.')[1]?.length ?? 1) : 0;

  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started.current) {
        started.current = true;
        const startTime = performance.now();
        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * num;
          setDisplay(current.toFixed(decimals));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [num, decimals, duration]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}
