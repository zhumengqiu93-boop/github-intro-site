'use client';
import { useEffect, useRef, useState } from 'react';
import CountUp from './CountUp';
import RevealSection from './RevealSection';
import { useLang } from './LanguageContext';
import { i18n, tr } from '@/lib/i18n';

function StackedWords({ roles }: { roles: readonly string[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
    const id = setInterval(() => setActive(i => (i + 1) % roles.length), 2400);
    return () => clearInterval(id);
  }, [roles]);

  return (
    <div className="flex flex-col gap-0 select-none" aria-label={roles[active]}>
      {roles.map((role, i) => {
        const isActive = i === active;
        return (
          <div
            key={role}
            className="leading-[1.05] font-black tracking-tight cursor-default transition-all duration-700"
            style={{
              fontSize: 'clamp(28px, 7vw, 80px)',
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
                className="inline-block w-2 h-2 rounded-full bg-[#A855F7] ml-3 align-middle"
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
              ? '#A855F7'
              : `rgba(168,85,247,${0.08 + i * 0.04})`,
            animationDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  );
}

export default function AboutSection() {
  const { lang } = useLang();
  const t = (e: { en: string; zh: string }) => tr(e, lang);
  const roles = lang === 'en' ? i18n.about.rolesEn : i18n.about.rolesZh;
  const skills = lang === 'en' ? i18n.about.skillsEn : i18n.about.skillsZh;
  const recentTags = lang === 'en' ? i18n.about.recentTags.en : i18n.about.recentTags.zh;
  const stats = [
    { val: '50',   sfx: '+',  label: t(i18n.about.statsLabels.resources),  sub: 'Resources'  },
    { val: '3000', sfx: '+',  label: t(i18n.about.statsLabels.customers),  sub: 'Customers'  },
    { val: '4.9',  sfx: '',   label: t(i18n.about.statsLabels.rating),     sub: 'Avg Rating' },
    { val: '10',   sfx: lang === 'en' ? 'yr+' : '年+', label: t(i18n.about.statsLabels.experience), sub: 'Experience' },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setEntered(true); obs.disconnect(); } },
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
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
      <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7]/[0.03] via-transparent to-[#4ECFFF]/[0.03] pointer-events-none" />
      {/* Dot-grid texture */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 py-14 md:py-36">
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 md:gap-16 xl:gap-24 items-center">

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Small label */}
            <div
              className="flex items-center gap-3 mb-10 transition-all duration-700"
              style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(16px)', transitionDelay: '0ms' }}
            >
              <span className="w-6 h-px bg-[#444]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#999]">{lang === 'en' ? 'About Creator' : '关于创作者'}</span>
            </div>

            {/* Stacked cycling words */}
            <div
              className="mb-10 transition-all duration-700"
              style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(24px)', transitionDelay: '80ms' }}
            >
              <StackedWords roles={roles} />
            </div>

            {/* Body copy */}
            <div
              className="transition-all duration-700"
              style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(20px)', transitionDelay: '200ms' }}
            >
              <p className="text-[#999] text-base leading-relaxed mb-3 max-w-md"
                 dangerouslySetInnerHTML={{ __html: lang === 'en' ? i18n.about.desc1En : i18n.about.desc1Zh }} />
              <p className="text-[#777] text-sm leading-relaxed max-w-md">
                {lang === 'en' ? i18n.about.desc2En : i18n.about.desc2Zh}
              </p>
            </div>

            {/* Skill tags */}
            <div
              className="mt-10 flex flex-wrap gap-2 transition-all duration-700"
              style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(16px)', transitionDelay: '320ms' }}
            >
              {skills.map((s, i) => (
                <span
                  key={s}
                  className="px-3 py-1.5 text-xs font-semibold border border-[#222] text-[#999] rounded-full tag-hover cursor-default"
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
              <span className="text-[10px] font-black uppercase tracking-[0.28em] text-[#444]">02</span>
              <span className="flex-1 h-px bg-[#1A1A1A]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#555]">Creator Profile</span>
            </div>
          </div>

          {/* ── RIGHT COLUMN — dark panel card ── */}
          <div
            className="transition-all duration-700"
            style={{ opacity: entered ? 1 : 0, transform: entered ? 'none' : 'translateY(32px) scale(0.97)', transitionDelay: '120ms' }}
          >
            <div className="rounded-[28px] border border-[#1E1E1E] bg-[#0E0E0E] overflow-hidden">

              {/* Panel header bar */}
              <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-[#181818]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28CA42]" />
                </div>
                <span className="text-[11px] text-[#666] font-mono uppercase tracking-widest">{t(i18n.about.profileLabel)}</span>
                <span className="w-5 h-5 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
                </span>
              </div>

              {/* Avatar + name row */}
              <div className="px-4 md:px-6 py-4 md:py-6 border-b border-[#141414]">
                <div className="flex items-center gap-3">
                  {/* Avatar circle */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-[#A855F7]/20 to-[#4ECFFF]/20
                                    border border-[#A855F7]/20 flex items-center justify-center text-xl md:text-2xl">
                      🎨
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#A855F7] border-2 border-[#0E0E0E]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-black text-white text-sm md:text-base truncate">{t(i18n.about.handle)}</div>
                    <div className="text-[#888] text-xs mt-0.5 font-mono truncate">{t(i18n.about.handleSub)}</div>
                  </div>
                  <div className="flex-shrink-0 px-2.5 py-1 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20
                                  text-[#A855F7] text-xs font-bold whitespace-nowrap">
                    {t(i18n.about.available)}
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 border-b border-[#141414]">
                {stats.map((s, i) => (
                  <div
                    key={s.label}
                    className={`px-4 md:px-6 py-4 md:py-5 group cursor-default hover:bg-[#141414] transition-colors duration-200
                                ${i % 2 === 0 && i < stats.length - 1 ? 'border-r border-[#141414]' : ''}
                                ${i < 2 ? 'border-b border-[#141414]' : ''}`}
                  >
                    <div className="text-2xl font-black text-white tabular-nums group-hover:text-[#A855F7] transition-colors duration-300">
                      {entered ? <CountUp value={s.val} suffix={s.sfx} /> : '—'}
                    </div>
                    <div className="text-[#999] text-xs mt-1">{s.label}</div>
                    <div className="text-[#555] text-[10px] font-mono uppercase tracking-wider mt-0.5">{s.sub}</div>
                  </div>
                ))}
              </div>

              {/* Activity chart */}
              <div className="px-4 md:px-6 py-4 md:py-5 border-b border-[#141414]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] text-[#888] font-mono uppercase tracking-widest">{t(i18n.about.monthlyOutput)}</span>
                  <span className="text-[11px] text-[#A855F7] font-bold">↑ 12%</span>
                </div>
                <MiniChart />
              </div>

              {/* Recent tag row */}
              <div className="px-4 md:px-6 py-4 md:py-5">
                <div className="text-[11px] text-[#666] font-mono uppercase tracking-widest mb-3">{t(i18n.about.recentWork)}</div>
                <div className="flex flex-wrap gap-2">
                  {recentTags.map(tag => (
                    <span key={tag}
                          className="px-3 py-1 rounded-lg bg-[#141414] border border-[#1E1E1E]
                                     text-[#999] text-xs font-medium hover:border-[#A855F7]/30
                                     hover:text-[#A855F7] transition-all duration-200 cursor-default">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badge below card */}
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-[#1A1A1A]" />
              <span className="text-[10px] font-mono text-[#555] uppercase tracking-widest">Crafted with care</span>
              <div className="flex-1 h-px bg-[#1A1A1A]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
