'use client';
import { useEffect, useRef, useState } from 'react';

export default function IntroAnimation() {
  const [phase, setPhase]   = useState<'idle' | 'counting' | 'leaving' | 'done'>('idle');
  const [count, setCount]   = useState(0);
  const skipRef             = useRef(false);

  useEffect(() => {
    if (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('intro-done')) {
      setPhase('done');
      return;
    }

    setPhase('counting');

    /* Count 0 → 100 over ~1.4 s */
    const start = performance.now();
    const DURATION = 1400;
    let raf: number;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) { raf = requestAnimationFrame(tick); }
      else {
        /* Pause at 100 then leave */
        setTimeout(() => {
          setPhase('leaving');
          setTimeout(() => {
            setPhase('done');
            sessionStorage.setItem('intro-done', '1');
          }, 900);
        }, 280);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (phase === 'done') return null;

  const leaving = phase === 'leaving';

  const handleClick = () => {
    if (phase === 'counting' || phase === 'idle') {
      setPhase('leaving');
      sessionStorage.setItem('intro-done', '1');
      setTimeout(() => setPhase('done'), 900);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden cursor-pointer"
      aria-hidden
      onClick={handleClick}
    >
      {/* Top panel */}
      <div
        className="absolute top-0 left-0 right-0 bg-[#0A0A0A] flex items-end justify-center pb-1"
        style={{
          height: '50%',
          transform: leaving ? 'translateY(-100%)' : 'translateY(0)',
          transition: leaving ? 'transform 0.85s cubic-bezier(0.76,0,0.24,1)' : 'none',
        }}
      >
        {/* Brand mark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-full pt-2
                        text-white font-black text-lg tracking-tight whitespace-nowrap select-none"
             style={{ opacity: leaving ? 0 : 1, transition: 'opacity 0.3s ease' }}>
          Design Resources
          <span style={{ color: 'var(--accent)' }}>。</span>
        </div>
      </div>

      {/* Bottom panel */}
      <div
        className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] flex items-start justify-center pt-1"
        style={{
          height: '50%',
          transform: leaving ? 'translateY(100%)' : 'translateY(0)',
          transition: leaving ? 'transform 0.85s cubic-bezier(0.76,0,0.24,1)' : 'none',
        }}
      >
        {/* Counter */}
        <div
          className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-full pb-1
                     font-black tabular-nums select-none leading-none"
          style={{
            fontSize: 'clamp(72px, 18vw, 200px)',
            color: 'var(--accent)',
            opacity: leaving ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {count}
        </div>
      </div>

      {/* Horizontal rule at the seam */}
      <div
        className="absolute left-0 right-0"
        style={{
          top: '50%',
          height: '1px',
          background: 'rgba(168,85,247,0.3)',
          transform: leaving ? 'scaleX(0)' : 'scaleX(1)',
          transition: leaving ? 'transform 0.4s ease' : 'none',
          transformOrigin: 'center',
        }}
      />
    </div>
  );
}
