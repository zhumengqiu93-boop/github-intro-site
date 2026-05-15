'use client';
import { useRef, useEffect, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: 'accent' | 'outline';
}

/**
 * Wiggle button — hover 时左右持续晃动（sine 旋转振荡），
 * 松开后振幅渐减归零。模拟 GSAP CustomWiggle 效果（azmKBBJ）。
 */
export default function ShinyButton({ href, children, className = '', variant = 'accent' }: Props) {
  const btnRef   = useRef<HTMLAnchorElement>(null);
  const hovered  = useRef(false);
  const amp      = useRef(0);     // current amplitude (deg), lerps 0 ↔ MAX
  const t        = useRef(0);     // time accumulator for sine
  const rafId    = useRef<number>(0);
  const lastTs   = useRef(0);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const MAX_AMP  = 11;    // peak rotation degrees
    const FREQ     = 5.8;   // oscillations per second
    const AMP_IN   = 0.18;  // lerp speed building up
    const AMP_OUT  = 0.09;  // lerp speed fading out (slower = more springy)

    const tick = (now: number) => {
      const dt = Math.min((now - lastTs.current) / 1000, 0.05); // cap at 50ms
      lastTs.current = now;
      t.current += dt;

      const target = hovered.current ? MAX_AMP : 0;
      const speed  = hovered.current ? AMP_IN : AMP_OUT;
      amp.current  = amp.current + (target - amp.current) * speed;

      const angle = amp.current * Math.sin(t.current * FREQ * Math.PI * 2);

      // small scale pulse in sync with oscillation (squish feel)
      const pulse = 1 + Math.abs(Math.sin(t.current * FREQ * Math.PI * 2)) * (amp.current / MAX_AMP) * 0.04;

      btn.style.transform = `rotate(${angle}deg) scale(${pulse})`;

      rafId.current = requestAnimationFrame(tick);
    };

    lastTs.current = performance.now();
    rafId.current  = requestAnimationFrame(tick);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lastTs.current = performance.now();
          rafId.current = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(rafId.current);
        }
      },
      { threshold: 0 }
    );
    observer.observe(btn);

    const onEnter = () => { hovered.current = true; };
    const onLeave = () => { hovered.current = false; };

    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mouseleave', onLeave);

    return () => {
      btn.removeEventListener('mouseenter', onEnter);
      btn.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  const base =
    variant === 'accent'
      ? 'bg-[#A855F7] text-white hover:bg-[#9333EA]'
      : 'bg-transparent text-white border border-[#555] hover:border-[#A855F7]/60';

  return (
    <Link
      ref={btnRef}
      href={href}
      className={`relative overflow-hidden inline-flex items-center justify-center gap-2
                  rounded-full font-bold transition-colors duration-200
                  ${base} ${className}`}
      style={{ willChange: 'transform', transformOrigin: 'center' }}
    >
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </Link>
  );
}
