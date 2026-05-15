'use client';
import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────
   Fluid cursor canvas — filipz dPoyMVB style
   • fixed full-viewport canvas (pointer-events none)
   • stores a velocity field in a grid
   • mouse movement injects velocity at cursor pos
   • velocity diffuses & decays each frame → fluid trail
   • renders as coloured circles with additive blending
   ───────────────────────────────────────────── */

const COLS = 60;   // velocity grid columns
const ROWS = 40;   // velocity grid rows
const DECAY   = 0.94;
const DIFFUSE = 0.18;
const RADIUS  = 40;  // render radius per cell

export default function FluidCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // velocity field: [vx, vy, density]
    let field     = new Float32Array(COLS * ROWS * 3);
    let fieldNext = new Float32Array(COLS * ROWS * 3);

    const idx = (c: number, r: number) =>
      (Math.max(0, Math.min(ROWS - 1, r)) * COLS +
       Math.max(0, Math.min(COLS - 1, c))) * 3;

    const mouse = { x: -1, y: -1, px: -1, py: -1, moving: false };

    const onMove = (e: MouseEvent) => {
      mouse.px = mouse.x; mouse.py = mouse.y;
      mouse.x  = e.clientX;  mouse.y  = e.clientY;
      mouse.moving = true;

      // inject velocity & density at cursor cell
      const col = Math.floor((mouse.x / W) * COLS);
      const row = Math.floor((mouse.y / H) * ROWS);
      const dvx = (mouse.x - mouse.px) * 0.05;
      const dvy = (mouse.y - mouse.py) * 0.05;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const i = idx(col + dc, row + dr);
          field[i]     += dvx;
          field[i + 1] += dvy;
          field[i + 2] += 0.9;  // density injection
        }
      }
    };
    const onLeave = () => { mouse.moving = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('resize', onResize);

    /* ── animation ── */
    let raf = 0;
    const cellW = () => W / COLS;
    const cellH = () => H / ROWS;

    const tick = () => {
      // diffuse + decay
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = idx(c, r);
          // average neighbours for diffusion
          const n  = field[idx(c, r - 1) + 2];
          const s  = field[idx(c, r + 1) + 2];
          const e  = field[idx(c + 1, r) + 2];
          const w  = field[idx(c - 1, r) + 2];
          const d  = field[i + 2];
          fieldNext[i + 2] = (d + (n + s + e + w) * DIFFUSE) / (1 + DIFFUSE * 4) * DECAY;
          fieldNext[i]     = field[i]     * DECAY;
          fieldNext[i + 1] = field[i + 1] * DECAY;
        }
      }
      // swap buffers
      const tmp = field; field = fieldNext; fieldNext = tmp;

      // render
      ctx.clearRect(0, 0, W, H);
      const cw = cellW(), ch = cellH();

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const i = idx(c, r);
          const density = field[i + 2];
          if (density < 0.01) continue;

          const vx = field[i];
          const vy = field[i + 1];
          const speed = Math.sqrt(vx * vx + vy * vy);

          const cx = (c + 0.5) * cw;
          const cy = (r + 0.5) * ch;
          const r2 = Math.min(RADIUS, cw * 0.8) * Math.min(1, density * 1.2);

          // colour: white → yellow based on speed
          const t = Math.min(1, speed * 0.6);
          const red   = Math.round(255 * t + 255 * (1 - t));
          const green = Math.round(245 * t + 255 * (1 - t));
          const blue  = Math.round(66  * t + 255 * (1 - t));

          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r2);
          grad.addColorStop(0, `rgba(${red},${green},${blue},${Math.min(0.45, density * 0.4)})`);
          grad.addColorStop(1, 'rgba(0,0,0,0)');

          ctx.beginPath();
          ctx.arc(cx, cy, r2, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
      aria-hidden
    />
  );
}
