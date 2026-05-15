'use client';

/**
 * AuroraBackground — pure CSS animated aurora blobs for the hero.
 * Replaces / layers under ThreeBackground. position:absolute fills parent.
 */
export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base noise grain */}
      <div className="absolute inset-0 opacity-[0.025]"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '200px 200px' }} />

      {/* Blob 1 — violet, top-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: '70vw', height: '70vw',
          top: '-20%', right: '-15%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, rgba(168,85,247,0.06) 50%, transparent 70%)',
          animation: 'aurora-drift-1 18s ease-in-out infinite',
          filter: 'blur(60px)',
        }}
      />

      {/* Blob 2 — indigo, bottom-left */}
      <div
        className="absolute rounded-full"
        style={{
          width: '55vw', height: '55vw',
          bottom: '-10%', left: '-10%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.14) 0%, rgba(99,102,241,0.05) 50%, transparent 70%)',
          animation: 'aurora-drift-2 22s ease-in-out infinite',
          filter: 'blur(70px)',
        }}
      />

      {/* Blob 3 — cyan accent, center */}
      <div
        className="absolute rounded-full"
        style={{
          width: '40vw', height: '40vw',
          top: '30%', left: '35%',
          background: 'radial-gradient(circle, rgba(78,207,255,0.08) 0%, transparent 65%)',
          animation: 'aurora-drift-3 26s ease-in-out infinite',
          filter: 'blur(80px)',
        }}
      />

      {/* Blob 4 — deep violet, mid-right */}
      <div
        className="absolute rounded-full"
        style={{
          width: '45vw', height: '45vw',
          top: '20%', right: '5%',
          background: 'radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 60%)',
          animation: 'aurora-drift-4 20s ease-in-out infinite',
          filter: 'blur(90px)',
        }}
      />

      <style>{`
        @keyframes aurora-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(-5%, 8%)  scale(1.08); }
          66%       { transform: translate(6%, -5%)  scale(0.95); }
        }
        @keyframes aurora-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(8%, -6%)  scale(1.06); }
          66%       { transform: translate(-4%, 7%)  scale(0.97); }
        }
        @keyframes aurora-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50%       { transform: translate(-7%, -8%) scale(1.12); }
        }
        @keyframes aurora-drift-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          40%       { transform: translate(-8%, 5%)  scale(1.05); }
          80%       { transform: translate(5%, 8%)   scale(0.93); }
        }
      `}</style>
    </div>
  );
}
