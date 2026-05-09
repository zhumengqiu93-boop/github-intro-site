'use client';
import { useEffect, useRef, useState } from 'react';
import CountUp from './CountUp';
import RevealSection from './RevealSection';

/* ── Cycling roles (flora-style stacked words) ── */
const ROLES = ['UI/UX 设计师', '资料创作者', '独立创作者', '设计工具控'];

/* ── Stats shown in the right panel ── */
const STATS = [
  { val: '50',   sfx: '+', label: '发布资料',  sub: 'Resources'  },
  { val: '3000', sfx: '+', label: '付费用户',  sub: 'Customers'  },
  { val: '4.9',  sfx: '',  label: '平均评分',  sub: 'Avg Rating' },
  { val: '10',   sfx: '年+', label: '设计经验', sub: 'Experience' },
];

/* ── Skill tags shown in panel ── */
const SKILLS = ['Figma', 'UI Components', 'Design System', 'Illustration', 'Prototyping', 'Motion'];

function StackedWords() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive(i => (i + 1) % ROLES.length), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col gap-0 select-none" aria-label={ROLES[active]}>
      {ROLES.map((role, i) => {
        const isActive = i === active;
        return (
          <div
            key={role}
            className="leading-[1.05] font-black tracking-tight cursor-default transition-all duration-700"
            style={{
              fontSize: 'clamp(36px, 5.5vw, 80px)',
              color: isActive ? '#fff' : 'transparent',
              WebkitTextStroke: isActive ? '0' : '1px rgba(255,255,255,0.13)',
              opacity: isActive ? 1 : 0.55,
              filter: isActive ? 'none' : 'blur(0.5px)',
              transform: isActive ? 'translateX(0)' : 'translateX(-4px)',
            }}
          >
            {role}
            {isActive && (
              <span
                className="inline-block w-2 h-2 rounded-full bg-[#D4F542] ml-3 align-middle"
                style={{ animation: 'glow-pulse-accent 2s ease-in-out infinite' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Minimal sparkline bars (decorative) ── */
function MiniChart() {
  const bars = [40, 65, 45, 80, 55, 90, 70, 100, 75, 95];
  return (
    <div className="flex items-end gap-1 h-10">
      {bars.map((h, i) => (
        <div
          key={i}
          className="rounded-sm flex-1 transition-all duration-500"
          style={{
            height: `${h}%`,
            background: i === bars.length - 1
              ? '#D4F542'
              : `rgba(212,245,66,${0.08 + i * 0.04})`,
            animationDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setEntered(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
    >
      {/* Full-bleed dark background with subtle texture */}
      <div className="absolute inset-0 bg-[#080808]" />
      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#D4F542]/[0.03] via-transparent to-[#4ECFFF]/[0.03] pointer-events-none" />
      {/* Dot-grid texture */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 md:px-16 py-28 md:py-36">
        <div className="grid md:grid-cols-[1fr_1fr] gap-16 xl:gap-24 items-center">

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Small label */}
            <div
              className="flex items-center gap-3 mb-10 transition-all duration-700"
              style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(16px)', transitionDelay: '0ms' }}
            >
              <span className="w-6 h-px bg-[#444]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#555]">About Creator</span>
            </div>

            {/* Stacked cycling words */}
            <div
              className="mb-10 transition-all duration-700"
              style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(24px)', transitionDelay: '80ms' }}
            >
              <StackedWords />
            </div>

            {/* Body copy */}
            <div
              className="transition-all duration-700"
              style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(20px)', transitionDelay: '200ms' }}
            >
              <p className="text-[#555] text-base leading-relaxed mb-3 max-w-md">
                专注 UI/UX 设计领域 <strong className="text-[#888]">10年+</strong>，曾服务多家互联网公司。
                把工作中积累的设计资产、模板和工具整理成资料包，帮助更多设计师提效。
              </p>
              <p className="text-[#3A3A3A] text-sm leading-relaxed max-w-md">
                所有资料均由本人亲自制作，注重实用性与品质，每一份都经过真实项目验证。
              </p>
            </div>

            {/* Skill tags */}
            <div
              className="mt-10 flex flex-wrap gap-2 transition-all duration-700"
              style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(16px)', transitionDelay: '320ms' }}
            >
              {SKILLS.map((s, i) => (
                <span
                  key={s}
                  className="px-3 py-1.5 text-xs font-semibold border border-[#222] text-[#555] rounded-full tag-hover cursor-default"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Bottom rule with number */}
            <div
              className="mt-14 flex items-center gap-4 transition-all duration-700"
              style={{ opacity: entered ? 1 : 0, transitionDelay: '440ms' }}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#222]">02</span>
              <span className="flex-1 h-px bg-[#1A1A1A]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2A2A2A]">Creator Profile</span>
            </div>
          </div>

          {/* ── RIGHT COLUMN — dark panel card ── */}
          <div
            className="transition-all duration-700"
            style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(32px) scale(0.97)', transitionDelay: '120ms' }}
          >
            <div className="rounded-[28px] border border-[#1E1E1E] bg-[#0E0E0E] overflow-hidden">

              {/* Panel header bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#181818]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28CA42]" />
                </div>
                <span className="text-[11px] text-[#333] font-mono uppercase tracking-widest">creator.profile</span>
                <span className="w-5 h-5 rounded-full bg-[#D4F542]/10 border border-[#D4F542]/20 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4F542]" />
                </span>
              </div>

              {/* Avatar + name row */}
              <div className="px-6 py-6 border-b border-[#141414]">
                <div className="flex items-center gap-4">
                  {/* Avatar circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#D4F542]/20 to-[#4ECFFF]/20
                                    border border-[#D4F542]/20 flex items-center justify-center text-2xl">
                      🎨
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#D4F542] border-2 border-[#0E0E0E]" />
                  </div>
                  <div>
                    <div className="font-black text-white text-base">@design_creator</div>
                    <div className="text-[#444] text-xs mt-0.5 font-mono">UI/UX Designer · 10年+ exp</div>
                  </div>
                  <div className="ml-auto px-3 py-1 rounded-full bg-[#D4F542]/10 border border-[#D4F542]/20
                                  text-[#D4F542] text-xs font-bold">
                    Available
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 border-b border-[#141414]">
                {STATS.map((s, i) => (
                  <div
                    key={s.label}
                    className={`px-6 py-5 group cursor-default hover:bg-[#141414] transition-colors duration-200
                                ${i % 2 === 0 && i < STATS.length - 1 ? 'border-r border-[#141414]' : ''}
                                ${i < 2 ? 'border-b border-[#141414]' : ''}`}
                  >
                    <div className="text-2xl font-black text-white tabular-nums group-hover:text-[#D4F542] transition-colors duration-300">
                      {entered ? <CountUp value={s.val} suffix={s.sfx} /> : '—'}
                    </div>
                    <div className="text-[#555] text-xs mt-1">{s.label}</div>
                    <div className="text-[#2A2A2A] text-[10px] font-mono uppercase tracking-wider mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Activity chart */}
              <div className="px-6 py-5 border-b border-[#141414]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] text-[#444] font-mono uppercase tracking-widest">Monthly Output</span>
                  <span className="text-[11px] text-[#D4F542] font-bold">↑ 12%</span>
                </div>
                <MiniChart />
              </div>

              {/* Recent tag row */}
              <div className="px-6 py-5">
                <div className="text-[11px] text-[#333] font-mono uppercase tracking-widest mb-3">Recent Work</div>
                <div className="flex flex-wrap gap-2">
                  {['UI Kit Pro', 'Figma Templates', 'Design System', 'Icon Pack'].map(tag => (
                    <span key={tag}
                          className="px-3 py-1 rounded-lg bg-[#141414] border border-[#1E1E1E]
                                     text-[#555] text-xs font-medium hover:border-[#D4F542]/30
                                     hover:text-[#D4F542] transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge below card */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-[#1A1A1A]" />
              <span className="text-[10px] font-mono text-[#2A2A2A] uppercase tracking-widest">Crafted with care</span>
              <div className="flex-1 h-px bg-[#1A1A1A]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
