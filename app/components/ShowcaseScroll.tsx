'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageContext';

/* ─── Types ───────────────────────────────────────────────────────── */
interface BiLang { en: string; zh: string }
interface StatItem { val: string; label: BiLang }

interface IntroPanel  { type: 'intro';   id: string; label: BiLang; heading: BiLang; sub: BiLang; accent: string; bg: string; stats: StatItem[] }
interface ProductPanel { type: 'product'; id: string; label: BiLang; heading: BiLang; sub: BiLang; accent: string; bg: string; href: string; price: string; original?: string; image?: string; emoji: string; tags: string[]; tagColor: string }
interface CtaPanel    { type: 'cta';     id: string; label: BiLang; heading: BiLang; sub: BiLang; accent: string; bg: string; href: string }
type Panel = IntroPanel | ProductPanel | CtaPanel;

/* ─── Panel data ──────────────────────────────────────────────────── */
const PANELS: Panel[] = [
  {
    id: 'intro', type: 'intro',
    label:   { en: 'Selected Works', zh: '精选作品' },
    heading: { en: 'Crafted\nwith soul.', zh: '每一件\n都用心做。' },
    sub:     { en: '50+ design resources, updated regularly.', zh: '50+ 精品资源，持续更新中。' },
    accent: '#A855F7', bg: '#0A0A0A',
    stats: [
      { val: '50+',    label: { en: 'Resources', zh: '资料数' } },
      { val: '3,000+', label: { en: 'Users',     zh: '付费用户' } },
      { val: '4.9',    label: { en: 'Rating',    zh: '评分' } },
    ],
  },
  {
    id: 'p1', type: 'product',
    label:    { en: 'Illustration · Hot',  zh: '插画素材 · 热卖' },
    heading:  { en: 'Grain Buds\nSolar Term', zh: '小满节气\n插画资源包' },
    sub:      { en: 'Wallpapers · Stickers · Keychain designs', zh: '壁纸 · 贴纸 · 钥匙链全套' },
    price: '¥49', original: '¥99',
    href: '/products/1',
    accent: '#7EC67A', bg: '#080e08',
    image: '/covers/小满.png', emoji: '🌾',
    tags: ['PNG', 'AI', 'SVG'], tagColor: '#A855F7',
  },
  {
    id: 'p2', type: 'product',
    label:   { en: 'Web Template · New', zh: '网页模板 · 新品' },
    heading: { en: 'Dashboard\nPro', zh: '数据后台\nPro 模板' },
    sub:     { en: 'Next.js · Tailwind · 20+ pages ready', zh: 'Next.js · Tailwind · 20+ 完整页面' },
    price: '¥79',
    href: '/products/2',
    accent: '#42B8F5', bg: '#080c14',
    emoji: '🖥️',
    tags: ['Next.js', 'Tailwind', 'React'], tagColor: '#42B8F5',
  },
  {
    id: 'cta', type: 'cta',
    label:   { en: 'Ready to explore?', zh: '准备好了吗？' },
    heading: { en: 'Browse all\nresources.', zh: '探索全部\n设计资源。' },
    sub:     { en: 'UI kits · Templates · Fonts · Illustrations', zh: 'UI 组件 · 模板 · 字体 · 插画' },
    accent: '#A855F7', bg: '#0A0A0A',
    href: '#categories',
  },
];

const N = PANELS.length;

/* ─── Root component ──────────────────────────────────────────────── */
export default function ShowcaseScroll() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef   = useRef<number>(0);
  const targetX  = useRef(0);
  const currentX = useRef(0);
  const [activeIdx, setActiveIdx] = useState(0);
  const { lang } = useLang();

  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const onScroll = () => {
      const outerTop    = outer.getBoundingClientRect().top + window.scrollY;
      const outerHeight = outer.offsetHeight;
      const vh          = window.innerHeight;
      const scrollable  = outerHeight - vh;
      const raw         = (window.scrollY - outerTop) / scrollable;
      const progress    = Math.max(0, Math.min(1, raw));

      targetX.current = progress * (N - 1) * window.innerWidth;
      setActiveIdx(Math.round(progress * (N - 1)));
    };

    const animate = () => {
      currentX.current += (targetX.current - currentX.current) * 0.1;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${-currentX.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    // Snap to correct position on mount — skip lerp from 0
    currentX.current = targetX.current;
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div ref={outerRef} style={{ height: `${N * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden bg-[#0A0A0A]">

        {/* Progress dots */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-2.5">
          {PANELS.map((p, i) => (
            <div key={p.id} className="rounded-full transition-all duration-500"
                 style={{
                   width:  i === activeIdx ? '6px' : '4px',
                   height: i === activeIdx ? '20px' : '4px',
                   background: i === activeIdx ? '#A855F7' : 'rgba(255,255,255,0.15)',
                 }} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2
                        transition-opacity duration-500 pointer-events-none"
             style={{ opacity: activeIdx === 0 ? 1 : 0 }}>
          <span className="text-[10px] text-[#888] uppercase tracking-[0.2em]">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#333] to-transparent" />
        </div>

        {/* Horizontal track */}
        <div ref={trackRef} className="flex h-full" style={{ width: `${N * 100}vw`, willChange: 'transform' }}>
          {PANELS.map((panel, idx) => (
            <div key={panel.id} className="relative flex-shrink-0 h-full overflow-hidden"
                 style={{ width: '100vw', background: panel.bg }}>

              {panel.type === 'intro'   && <IntroPanelView   panel={panel} lang={lang} />}
              {panel.type === 'product' && <ProductPanelView panel={panel} lang={lang} />}
              {panel.type === 'cta'     && <CtaPanelView     panel={panel} lang={lang} />}

              {/* Panel number */}
              <div className="absolute bottom-8 left-8 md:left-16 text-[10px] font-mono uppercase tracking-[0.2em] transition-colors duration-500"
                   style={{ color: idx === activeIdx ? panel.accent : '#222' }}>
                {String(idx + 1).padStart(2, '0')} / {String(N).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Intro panel ─────────────────────────────────────────────────── */
function IntroPanelView({ panel, lang }: { panel: IntroPanel; lang: string }) {
  const lines = (lang === 'en' ? panel.heading.en : panel.heading.zh).split('\n');
  return (
    <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full
                      bg-[#A855F7]/4 blur-[180px] pointer-events-none" />

      <div className="flex items-center gap-3 mb-10">
        <span className="w-8 h-px" style={{ background: panel.accent }} />
        <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: panel.accent }}>
          {lang === 'en' ? panel.label.en : panel.label.zh}
        </span>
      </div>

      <h2 className="font-black tracking-tight leading-[0.9] mb-10"
          style={{ fontSize: 'clamp(52px, 9vw, 130px)' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ color: i === 0 ? '#fff' : panel.accent }}>{line}</div>
        ))}
      </h2>

      <p className="text-[#999] text-base md:text-lg max-w-sm mb-14">
        {lang === 'en' ? panel.sub.en : panel.sub.zh}
      </p>

      <div className="flex gap-10 md:gap-16">
        {panel.stats.map(s => (
          <div key={s.val}>
            <div className="text-3xl md:text-4xl font-black text-white tabular-nums">{s.val}</div>
            <div className="text-[10px] text-[#888] uppercase tracking-[0.18em] mt-1 font-mono">
              {lang === 'en' ? s.label.en : s.label.zh}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Product panel ───────────────────────────────────────────────── */
function ProductPanelView({ panel, lang }: { panel: ProductPanel; lang: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  const lines    = (lang === 'en' ? panel.heading.en : panel.heading.zh).split('\n');
  const hasImage = !!panel.image && !imgFailed;

  return (
    <div className="relative z-10 h-full grid md:grid-cols-2 items-center
                    px-8 md:px-16 lg:px-24 gap-8 md:gap-0 max-w-7xl mx-auto w-full">
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: `radial-gradient(circle at 70% 50%, ${panel.accent}08, transparent 65%)` }} />

      {/* Left: text */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-6 h-px" style={{ background: panel.accent }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: panel.accent }}>
            {lang === 'en' ? panel.label.en : panel.label.zh}
          </span>
        </div>

        <h2 className="font-black tracking-tight leading-[0.9] mb-6 text-white"
            style={{ fontSize: 'clamp(40px, 6.5vw, 96px)' }}>
          {lines.map((line, i) => <div key={i}>{line}</div>)}
        </h2>

        <p className="text-[#999] text-sm md:text-base mb-8 max-w-xs leading-relaxed">
          {lang === 'en' ? panel.sub.en : panel.sub.zh}
        </p>

        <div className="flex flex-wrap gap-2 mb-10">
          {panel.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-full text-xs font-bold border"
                  style={{ borderColor: `${panel.accent}40`, color: panel.accent, background: `${panel.accent}10` }}>
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div>
            <div className="text-3xl font-black" style={{ color: panel.accent }}>{panel.price}</div>
            {panel.original && (
              <div className="text-xs text-[#888] line-through mt-0.5">{panel.original}</div>
            )}
          </div>
          <Link href={panel.href}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold
                           text-[#0A0A0A] transition-all duration-300 hover:scale-105"
                style={{ background: panel.accent }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px 6px ${panel.accent}40`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
            {lang === 'en' ? 'View Details' : '查看详情'} →
          </Link>
        </div>
      </div>

      {/* Right: image */}
      <div className="relative z-10 flex items-center justify-center md:justify-end">
        <div className="relative w-full max-w-sm md:max-w-none md:w-[380px] lg:w-[440px]">
          <div className="rounded-[28px] overflow-hidden border aspect-square flex items-center justify-center text-8xl md:text-9xl"
               style={{ borderColor: `${panel.accent}20`, background: `linear-gradient(135deg, ${panel.accent}08, transparent)` }}>
            {hasImage ? (
              <img src={panel.image} alt={panel.heading.en}
                   onError={() => setImgFailed(true)}
                   className="w-full h-full object-cover" />
            ) : (
              <span className="select-none">{panel.emoji}</span>
            )}
          </div>
          <div className="absolute -top-4 -right-4 px-4 py-2 rounded-full text-xs font-black text-[#0A0A0A] shadow-lg"
               style={{ background: panel.tagColor }}>
            {panel.tags[0]}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── CTA panel ───────────────────────────────────────────────────── */
function CtaPanelView({ panel, lang }: { panel: CtaPanel; lang: string }) {
  const lines = (lang === 'en' ? panel.heading.en : panel.heading.zh).split('\n');
  return (
    <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8 md:px-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#A855F7]/5 via-transparent to-[#4ECFFF]/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                      w-[800px] h-[800px] rounded-full bg-[#A855F7]/3 blur-[200px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-10">
          <span className="w-6 h-px bg-[#A855F7]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#A855F7]">
            {lang === 'en' ? panel.label.en : panel.label.zh}
          </span>
          <span className="w-6 h-px bg-[#A855F7]" />
        </div>

        <h2 className="font-black tracking-tight leading-[0.9] mb-8 text-white"
            style={{ fontSize: 'clamp(52px, 9vw, 130px)' }}>
          {lines.map((line, i) => <div key={i}>{line}</div>)}
        </h2>

        <p className="text-[#999] text-base md:text-lg mb-14 max-w-sm mx-auto">
          {lang === 'en' ? panel.sub.en : panel.sub.zh}
        </p>

        <Link href={panel.href}
              className="inline-flex items-center gap-3 px-10 py-4 rounded-full text-base font-black
                         text-[#0A0A0A] bg-[#A855F7] transition-all duration-300
                         hover:scale-105 hover:shadow-[0_0_40px_8px_rgba(168,85,247,0.25)]">
          {lang === 'en' ? 'Browse All Resources' : '浏览全部资源'} →
        </Link>
      </div>
    </div>
  );
}
