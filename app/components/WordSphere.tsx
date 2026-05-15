'use client';
import { useEffect, useRef } from 'react';

/* ── Design-related words for the sphere ── */
const WORDS = [
  'Figma', 'UI Kit', 'Typography', 'Motion', 'Color',
  'Grid', 'Vector', 'Icon', 'Layout', 'Font',
  'Brand', 'Logo', 'Design', 'Prototype', 'Animation',
  'Component', 'Spacing', 'Style', 'Pixel', 'Frame',
  'Layer', 'Shadow', 'Gradient', 'Wireframe', 'UX',
  'Visual', 'Palette', 'Contrast',
];

interface Props {
  /** Diameter of the sphere in px (default 340) */
  size?: number;
}

export default function WordSphere({ size = 340 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef    = useRef({ x: 0, y: 0, active: false });
  const rafRef      = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const R = size * 0.44; // sphere radius
    const N = WORDS.length;

    /* ── Build 3-D positions using Fibonacci / golden-angle spiral ── */
    type Point = { x: number; y: number; z: number; el: HTMLSpanElement };
    const pts: Point[] = [];

    WORDS.forEach((word, i) => {
      const phi   = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i; // golden angle

      const x = R * Math.sin(phi) * Math.cos(theta);
      const y = R * Math.sin(phi) * Math.sin(theta);
      const z = R * Math.cos(phi);

      const el = document.createElement('span');
      el.textContent = word;
      Object.assign(el.style, {
        position:      'absolute',
        left:          '50%',
        top:           '50%',
        transform:     'translate(-50%,-50%)',
        whiteSpace:    'nowrap',
        cursor:        'default',
        fontWeight:    '700',
        letterSpacing: '0.04em',
        userSelect:    'none',
        pointerEvents: 'none',
        lineHeight:    '1',
        willChange:    'transform,opacity',
      } as CSSStyleDeclaration);

      container.appendChild(el);
      pts.push({ x, y, z, el });
    });

    /* ── Mouse tracking ── */
    const onMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left - size / 2) / (size / 2),
        y: (e.clientY - rect.top  - size / 2) / (size / 2),
        active: true,
      };
    };
    const onLeave = () => { mouseRef.current.active = false; };
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);

    /* ── Rotation helpers ── */
    const rotY = (list: Point[], a: number) => {
      const cos = Math.cos(a), sin = Math.sin(a);
      list.forEach(p => {
        const x = p.x * cos + p.z * sin;
        const z = -p.x * sin + p.z * cos;
        p.x = x; p.z = z;
      });
    };
    const rotX = (list: Point[], a: number) => {
      const cos = Math.cos(a), sin = Math.sin(a);
      list.forEach(p => {
        const y = p.y * cos - p.z * sin;
        const z = p.y * sin + p.z * cos;
        p.y = y; p.z = z;
      });
    };

    /* ── Animation loop ── */
    const BASE_Y = 0.004;  // auto-spin speed around Y
    const BASE_X = 0.0015; // slight tilt

    const tick = () => {
      const { x, y, active } = mouseRef.current;

      const dy = active ? BASE_Y + x * 0.018 : BASE_Y;
      const dx = active ? BASE_X - y * 0.012 : BASE_X;

      rotY(pts as Point[], dy);
      rotX(pts as Point[], dx);

      (pts as Point[]).forEach(p => {
        /* Perspective projection */
        const perspective = size * 1.6;
        const scale = perspective / (perspective - p.z);

        const left    = p.x * scale + size / 2;
        const top     = p.y * scale + size / 2;
        const opacity = Math.max(0, Math.min(1, (p.z + R) / (R * 2)));
        const fs      = Math.max(9, 15 * scale * (p.z + R) / (R * 2));

        /* Color: bright yellow for front, white mid, dim gray for back */
        const t = (p.z + R) / (R * 2); // 0 = back, 1 = front
        let color: string;
        if (t > 0.78)       color = '#A855F7';
        else if (t > 0.52)  color = '#ffffff';
        else                color = '#3a3a3a';

        Object.assign(p.el.style, {
          left:      `${left}px`,
          top:       `${top}px`,
          opacity:   `${opacity.toFixed(3)}`,
          fontSize:  `${fs.toFixed(1)}px`,
          color,
          zIndex:    `${Math.round(t * 100)}`,
        });
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    const visObs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          cancelAnimationFrame(rafRef.current);
        }
      },
      { threshold: 0 }
    );
    visObs.observe(container);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      visObs.disconnect();
      pts.forEach(p => p.el.remove());
    };
  }, [size]);

  return (
    <div
      ref={containerRef}
      style={{ width: size, height: size, position: 'relative' }}
      aria-hidden
    />
  );
}
