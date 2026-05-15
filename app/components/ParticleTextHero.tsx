'use client';
import { useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────────
   Particle-text canvas hero effect
   • samples text pixels → builds a point cloud
   • mouse proximity scatters particles outward
   • spring force pulls them back home
   • sits as an overlay on top of the HTML text
   ───────────────────────────────────────────── */

interface Particle {
  x: number; y: number;   // current pos
  ox: number; oy: number; // origin (text pixel)
  vx: number; vy: number; // velocity
  size: number;
  alpha: number;
}

function sampleText(
  lines: string[],
  fontSize: number,
  W: number,
  H: number,
  step: number,
  font: string,
): [number, number][] {
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.font = `900 ${fontSize}px ${font}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  const lineH = fontSize * 1.05;
  const totalH = lines.length * lineH;
  lines.forEach((line, i) => {
    ctx.fillText(line, W / 2, H / 2 - totalH / 2 + i * lineH + lineH / 2);
  });
  const { data } = ctx.getImageData(0, 0, W, H);
  const pts: [number, number][] = [];
  for (let y = 0; y < H; y += step) {
    for (let x = 0; x < W; x += step) {
      if (data[(y * W + x) * 4 + 3] > 128) pts.push([x, y]);
    }
  }
  return pts;
}

interface Props {
  lines: string[];
  className?: string;
}

export default function ParticleTextHero({ lines, className = '' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef  = useRef<{
    particles: Particle[];
    mouse: { x: number; y: number };
    raf: number;
    W: number; H: number;
  }>({ particles: [], mouse: { x: -9999, y: -9999 }, raf: 0, W: 0, H: 0 });

  const build = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const state = stateRef.current;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;
    state.W = W; state.H = H;

    const fontSize = Math.min(W * 0.22, 120);
    const step     = Math.max(3, Math.round(fontSize / 30));
    const pts = sampleText(
      lines, fontSize, W, H, step,
      '"Noto Sans SC", "Inter", sans-serif',
    );

    state.particles = pts.map(([ox, oy]) => ({
      x: Math.random() * W, y: Math.random() * H,
      ox, oy,
      vx: 0, vy: 0,
      size:  0.8 + Math.random() * 1.4,
      alpha: 0.6 + Math.random() * 0.4,
    }));
  }, [lines]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const state  = stateRef.current;
    const ctx    = canvas.getContext('2d')!;

    build();

    const onResize = () => build();
    window.addEventListener('resize', onResize);

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      state.mouse = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onLeave = () => { state.mouse = { x: -9999, y: -9999 }; };
    canvas.addEventListener('mousemove', onMove);
    canvas.addEventListener('mouseleave', onLeave);

    /* ── animation ── */
    const REPEL_R  = 90;
    const REPEL_F  = 5;
    const SPRING   = 0.06;
    const FRICTION = 0.82;

    const tick = () => {
      const { W, H, mouse, particles } = stateRef.current;
      ctx.clearRect(0, 0, W, H);

      for (const p of particles) {
        // repulsion from mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_R) {
          const force = (REPEL_R - dist) / REPEL_R * REPEL_F;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }
        // spring back to origin
        p.vx += (p.ox - p.x) * SPRING;
        p.vy += (p.oy - p.y) * SPRING;
        // friction
        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;

        // draw particle
        const closeness = Math.max(0, 1 - dist / REPEL_R);
        const bright = closeness > 0.2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + closeness * 0.8), 0, Math.PI * 2);
        ctx.fillStyle = bright
          ? `rgba(212,245,66,${p.alpha})`
          : `rgba(255,255,255,${p.alpha * 0.55})`;
        ctx.fill();
      }

      state.raf = requestAnimationFrame(tick);
    };

    state.raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMove);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, [build]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  );
}
