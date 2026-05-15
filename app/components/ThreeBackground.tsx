'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   Three.js animated hero background
   • dense grid of points on an XZ plane
   • each point's Y position animated by sin waves
   • mouse position shifts the wave phase / tilt
   • camera slowly orbits for a cinematic look
   ───────────────────────────────────────────── */

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── scene ── */
    const scene    = new THREE.Scene();
    const W        = mount.clientWidth;
    const H        = mount.clientHeight;
    const camera   = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 14, 28);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── grid geometry ── */
    const COLS = 80, ROWS = 50;
    const SPACING = 0.55;
    const count = COLS * ROWS;

    const positions = new Float32Array(count * 3);
    const sizes     = new Float32Array(count);
    const colors    = new Float32Array(count * 3);

    let idx = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions[idx * 3]     = (c - COLS / 2) * SPACING;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = (r - ROWS / 2) * SPACING;
        sizes[idx]   = 1.4 + Math.random() * 0.8;
        colors[idx * 3]     = 0.13; // R
        colors[idx * 3 + 1] = 0.13; // G
        colors[idx * 3 + 2] = 0.13; // B → dim base
        idx++;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors,    3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes,     1));

    const mat = new THREE.ShaderMaterial({
      vertexColors: true,
      transparent:  true,
      depthWrite:   false,
      uniforms: {
        uTime:    { value: 0 },
        uMouse:   { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: renderer.getPixelRatio() },
      },
      vertexShader: /* glsl */`
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vWave;
        uniform float uTime;
        uniform vec2 uMouse;

        void main() {
          vColor = color;
          vec3 pos = position;

          // compound sine waves — XZ driven
          float wave = sin(pos.x * 0.45 + uTime * 0.8) * 0.9
                     + sin(pos.z * 0.35 + uTime * 0.6) * 0.7
                     + sin((pos.x + pos.z) * 0.28 + uTime * 1.1) * 0.5;

          // mouse influence — create a swell near cursor XZ projection
          float mdist = length(vec2(pos.x, pos.z) - uMouse * 15.0);
          float mwave = exp(-mdist * mdist * 0.012) * 3.5;
          pos.y = wave + mwave;

          vWave = (wave + mwave + 3.0) / 6.0; // 0→1 brightness

          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (220.0 / -mvPos.z);
          gl_Position  = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: /* glsl */`
        varying vec3 vColor;
        varying float vWave;

        void main() {
          // soft circle
          vec2 uv = gl_PointCoord * 2.0 - 1.0;
          float d = dot(uv, uv);
          if (d > 1.0) discard;
          float a = (1.0 - d) * (0.5 + vWave * 0.5);

          // colour: dark grey → white → yellow accent at peaks
          vec3 col = mix(vec3(0.12), vec3(0.9), vWave);
          col = mix(col, vec3(0.835, 0.961, 0.259), max(0.0, vWave - 0.75) * 4.0);

          gl_FragColor = vec4(col, a * 0.75);
        }
      `,
    });

    const points = new THREE.Points(geo, mat);
    scene.add(points);

    /* ── mouse ── */
    const mouse = new THREE.Vector2(0, 0);
    const onMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove);

    /* ── resize ── */
    const onResize = () => {
      const W = mount.clientWidth, H = mount.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    /* ── render loop ── */
    let raf = 0;
    const clock = new THREE.Clock();

    const tick = () => {
      const t = clock.getElapsedTime();
      mat.uniforms.uTime.value  = t;
      mat.uniforms.uMouse.value.lerp(mouse, 0.04);

      // slow camera sway
      camera.position.x = Math.sin(t * 0.07) * 4;
      camera.position.y = 13 + Math.sin(t * 0.05) * 1.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden
    />
  );
}
