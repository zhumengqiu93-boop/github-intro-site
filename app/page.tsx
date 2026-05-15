'use client';
import { useState } from 'react';
import Link from "next/link";
import { categories, products } from "@/lib/products";
import { i18n, tr } from "@/lib/i18n";
import { useLang } from "@/app/components/LanguageContext";
import LanguageSwitcher  from "@/app/components/LanguageSwitcher";
import dynamic           from "next/dynamic";
import AboutSection      from "@/app/components/AboutSection";
import ShowcaseGrid     from "@/app/components/ShowcaseGrid";
import MarqueeSection    from "@/app/components/MarqueeSection";
import TiltCard          from "@/app/components/TiltCard";
import RevealSection     from "@/app/components/RevealSection";
import MagneticButton    from "@/app/components/MagneticButton";
import ScrollToTop       from "@/app/components/ScrollToTop";
import SplitText         from "@/app/components/SplitText";
import ScrambleText      from "@/app/components/ScrambleText";
import WordSphere        from "@/app/components/WordSphere";
import ProductCover      from "@/app/components/ProductCover";

import IntroAnimation          from "@/app/components/IntroAnimation";
import AuroraBackground        from "@/app/components/AuroraBackground";
import ShinyButton             from "@/app/components/ShinyButton";

/* dynamic imports — no SSR (WebGL / canvas APIs) */
const ThreeBackground  = dynamic(() => import("@/app/components/ThreeBackground"),  { ssr: false });
const ParticleTextHero = dynamic(() => import("@/app/components/ParticleTextHero"), { ssr: false });

function EnTag({ children }: { children: string }) {
  return (
    <span className="en-tag">
      <span className="en-tag-line" />
      <ScrambleText speed={0.5}>{children}</ScrambleText>
    </span>
  );
}
function PlusMark({ className = "" }: { className?: string }) {
  return <span className={`text-[#A855F7] text-sm select-none ${className}`} aria-hidden>＋</span>;
}

export default function Home() {
  const { lang } = useLang();
  const t  = (e: { en: string; zh: string }) => tr(e, lang);
  const featured = products.slice(0, 6);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0A0A0A]" style={{ overflowX: 'clip' }}>

      {/* ══ INTRO ANIMATION (shows once, then gone) ══════ */}
      <IntroAnimation />

      {/* ══ NAV ══════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1A1A1A] bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
          <Link href="/" className="flex items-baseline gap-1 group whitespace-nowrap">
            <span className="text-base md:text-lg font-black tracking-tight">
              {lang === 'en' ? 'Design Resources' : '数字资料站'}
            </span>
            <span className="text-[#A855F7] text-base md:text-lg font-black inline-block
                             group-hover:rotate-12 transition-transform duration-300">。</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm text-[#999]">
            {([
              [t(i18n.nav.about),      '#about'],
              [t(i18n.nav.categories), '#categories'],
              [t(i18n.nav.products),   '#products'],
              [t(i18n.nav.contact),    '/contact'],
            ] as [string, string][]).map(([label, href]) => (
              <Link key={href} href={href} className="nav-link hover:text-white transition-colors">{label}</Link>
            ))}
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher />
            <span className="hidden md:flex items-center gap-1.5 text-[10px] text-[#999]
                             uppercase tracking-[0.18em] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
              {t(i18n.nav.available)}
            </span>
            <MagneticButton href="#products" blob className="btn-accent px-3 py-1.5 text-xs md:px-5 md:py-2 md:text-sm">
              {t(i18n.nav.browseAll)}
            </MagneticButton>
            {/* Mobile menu toggle */}
            <button
              className="md:hidden flex flex-col gap-1.5 p-1.5"
              onClick={() => setMobileMenuOpen(o => !o)}
              aria-label="Toggle menu"
            >
              <span className="block w-5 h-px bg-white transition-all duration-300"
                    style={{ transform: mobileMenuOpen ? 'translateY(5px) rotate(45deg)' : 'none' }} />
              <span className="block w-5 h-px bg-white transition-all duration-300"
                    style={{ opacity: mobileMenuOpen ? 0 : 1 }} />
              <span className="block w-5 h-px bg-white transition-all duration-300"
                    style={{ transform: mobileMenuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div
          className="md:hidden overflow-hidden border-t border-[#1A1A1A]"
          style={{
            maxHeight: mobileMenuOpen ? '300px' : '0',
            transition: 'max-height 0.4s cubic-bezier(0.25,1,0.5,1)',
          }}
        >
          <div className="px-4 py-4 flex flex-col gap-1">
            {([
              [t(i18n.nav.about),      '#about'],
              [t(i18n.nav.categories), '#categories'],
              [t(i18n.nav.products),   '#products'],
              [t(i18n.nav.contact),    '/contact'],
            ] as [string, string][]).map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 px-2 text-sm text-[#999] hover:text-white border-b border-[#111] transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </nav>


      {/* ══ HERO ═════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden pt-[57px]">
        {/* Aurora CSS background layer */}
        <AuroraBackground />
        {/* Three.js wave on top of aurora */}
        <ThreeBackground />

        <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 hidden xl:flex">
          <span className="side-label">Digital · Design · Resources · 2025</span>
        </div>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 hidden xl:flex">
          <span className="side-label">UI · Figma · Motion · Illustration</span>
        </div>

        {/* Meta row */}
        <div className="relative z-10 flex items-center justify-between px-5 md:px-10 pt-6 md:pt-8">
          <RevealSection variant="left" delay={0}>
            <EnTag>Design Resources — Vol.01 / 2025</EnTag>
          </RevealSection>
          <RevealSection variant="left" delay={100} className="hidden md:block">
            <div className="flex items-center gap-6 text-[10px] text-[#999] uppercase tracking-[0.2em] font-medium">
              <span>UI Kit</span><span className="h-3 w-px bg-[#2A2A2A]" />
              <span>Template</span><span className="h-3 w-px bg-[#2A2A2A]" />
              <span>Font</span><span className="h-3 w-px bg-[#2A2A2A]" />
              <span>Illustration</span>
            </div>
          </RevealSection>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-5 md:px-10 py-8 md:py-12">
          <div className="max-w-6xl mx-auto w-full grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-end">
            <div>
              <RevealSection variant="left" delay={80}>
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                  <div className="h-px w-8 bg-[#333]" />
                  <span className="text-[10px] md:text-[11px] text-[#999] uppercase tracking-[0.28em] font-medium">
                    {t(i18n.hero.eyebrow)}
                  </span>
                </div>
              </RevealSection>

              {/* Particle text overlay + HTML headline */}
              <div className="relative mb-8 md:mb-10">
                {/* Particle canvas — sits on top, pointer-events off, blends with screen */}
                <ParticleTextHero
                  lines={[t(i18n.hero.line1), t(i18n.hero.line2)]}
                  className="absolute inset-0 z-10 pointer-events-none"
                />
                {/* Semantic headline underneath — visible but subtly dimmed so particles glow */}
                <h1 className="font-black leading-[0.88] tracking-[-0.03em] relative z-0"
                    style={{ mixBlendMode: 'luminosity' }}>
                  <div className="text-[clamp(48px,9.5vw,144px)] text-white">
                    <SplitText delay={120} stagger={55}>{t(i18n.hero.line1)}</SplitText>
                  </div>
                  <div className="text-[clamp(48px,9.5vw,144px)] text-[#A855F7]"
                       style={{ WebkitTextStroke: '2px #A855F7' }}>
                    <SplitText delay={420} stagger={55}>{t(i18n.hero.line2)}</SplitText>
                  </div>
                </h1>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8">
                <RevealSection delay={720} variant="blur" className="max-w-xs">
                  <p className="text-[#999] text-base leading-relaxed mb-1">{t(i18n.hero.desc1)}</p>
                  <p className="text-[#888] text-sm leading-relaxed">{t(i18n.hero.desc2)}</p>
                </RevealSection>
                <RevealSection delay={860} variant="scale">
                  <div className="flex gap-3 flex-wrap">
                    <ShinyButton href="#categories" variant="accent" className="px-8 py-3.5 text-sm">
                      {t(i18n.hero.explore)}
                    </ShinyButton>
                    <ShinyButton href="#about" variant="outline" className="px-8 py-3.5 text-sm">
                      {t(i18n.hero.about)}
                    </ShinyButton>
                  </div>
                </RevealSection>
              </div>
            </div>

            {/* 3-D Word Sphere + stats — desktop only */}
            <RevealSection delay={500} variant="scale" className="hidden md:flex flex-col items-center gap-6">
              <WordSphere size={320} />
              <div className="flex flex-col gap-4 text-right w-full">
                {([
                  ['50+',    { en: 'Resources',  zh: '发布资料' }],
                  ['3,000+', { en: 'Users',      zh: '付费用户' }],
                  ['4.9 ★',  { en: 'Rating',    zh: '评分'     }],
                ] as [string, { en: string; zh: string }][]).map(([n, l]) => (
                  <div key={n}>
                    <div className="text-2xl font-black text-[#A855F7] leading-none">{n}</div>
                    <div className="text-[10px] text-[#999] uppercase tracking-[0.18em] mt-0.5">
                      {lang === 'en' ? l.en : l.zh}
                    </div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>

        {/* Ticker */}
        <div className="relative z-10 border-t border-[#1A1A1A]">
          <div className="marquee-outer py-3">
            <div className="flex">
              {[0,1].map(t=>(
                <div key={t} className="marquee-track" style={{ animationDuration:'22s' }}>
                  {['UI Kit','Figma Template','Motion','Illustration','Font','Design System','Prototype','Brand Guide',
                    'UI Kit','Figma Template','Motion','Illustration','Font','Design System','Prototype','Brand Guide'].map((item,i)=>(
                    <span key={i} className="inline-flex items-center gap-4 px-7 text-[11px]
                                             font-medium text-[#777] whitespace-nowrap
                                             hover:text-[#A855F7] transition-colors duration-200 cursor-default">
                      <span className="text-[#A855F7] opacity-40">✦</span>{item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ══ 01 · ABOUT ═══════════════════════════════════ */}
      <div className="rule-line" />
      <div className="relative bg-[#0A0A0A]">
        <div className="hidden md:block absolute top-0 left-6 ghost-num select-none pointer-events-none" aria-hidden>01</div>
        <div className="relative z-10 flex items-center justify-between px-5 md:px-10 pt-6 md:pt-8 pb-0">
          <RevealSection variant="left">
            <EnTag>{t(i18n.section.aboutCreator)}</EnTag>
          </RevealSection>
          <span className="text-[10px] text-[#666] uppercase tracking-[0.2em]">{t(i18n.section.yearsOfCraft)}</span>
        </div>
        <AboutSection />
      </div>

      {/* ══ SHOWCASE GRID ════════════════════════════════ */}
      <div className="rule-line" />
      <ShowcaseGrid />


      {/* ══ MARQUEE DIVIDER ══════════════════════════════ */}
      <div className="rule-line" />
      <MarqueeSection />
      <div className="rule-line" />


      {/* ══ 02 · CATEGORIES ══════════════════════════════ */}
      <section id="categories" className="relative bg-[#0A0A0A] px-5 md:px-10 py-16 md:py-24">
        <div className="hidden md:block absolute top-0 right-8 ghost-num select-none pointer-events-none text-right" aria-hidden>02</div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div>
              <RevealSection variant="left">
                <EnTag>{t(i18n.section.browseCategories)}</EnTag>
              </RevealSection>
              <h2 className="text-3xl md:text-5xl font-black mt-3 tracking-tight">
                <SplitText delay={80} stagger={45}>{t(i18n.section.findResources)}</SplitText>
              </h2>
            </div>
            <RevealSection variant="scale" delay={300} className="hidden md:block">
              <div className="text-right">
                <p className="text-[10px] text-[#888] uppercase tracking-[0.2em]">{t(i18n.section.catCount)}</p>
                <p className="text-[10px] text-[#666] uppercase tracking-[0.2em] mt-1">{t(i18n.section.resCount)}</p>
              </div>
            </RevealSection>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
              <RevealSection key={cat.slug} delay={i * 80}>
                <TiltCard className="card-hover card-stack relative rounded-[20px] h-full">
                  <Link href={`/category/${cat.slug}`}
                        className="group relative bg-[#111] border border-[#1E1E1E] rounded-[20px]
                                   p-6 flex flex-col gap-4 overflow-hidden h-full block">
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                         style={{ background:`radial-gradient(circle at 30% 30%, ${cat.color}20, transparent 70%)` }} />
                    <div className="flex items-start justify-between relative z-10">
                      <span className="text-4xl transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">{cat.emoji}</span>
                      <span className="text-[10px] text-[#666] font-bold tabular-nums">{String(i+1).padStart(2,'0')}</span>
                    </div>
                    <div className="relative z-10 flex-1 flex flex-col justify-end">
                      <div className="font-bold text-base mb-1 group-hover:text-[#A855F7] transition-colors duration-300">
                        {lang === 'en' ? cat.nameEn : cat.name}
                      </div>
                      <div className="text-[#999] text-xs leading-relaxed">
                        {lang === 'en' ? cat.descEn : cat.desc}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#1E1E1E] relative z-10">
                      <span className="text-[10px] text-[#888] uppercase tracking-[0.15em]">
                        {cat.count} {t(i18n.section.items)}
                      </span>
                      <span className="text-[#A855F7] text-sm group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>
                  </Link>
                </TiltCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>


      {/* ══ 03 · PRODUCTS ════════════════════════════════ */}
      <div className="rule-line" />
      <section id="products" className="relative bg-[#0A0A0A] px-5 md:px-10 py-16 md:py-24">
        <div className="hidden md:block absolute top-0 left-6 ghost-num select-none pointer-events-none" aria-hidden>03</div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <div>
              <RevealSection variant="left">
                <EnTag>{t(i18n.section.featuredProd)}</EnTag>
              </RevealSection>
              <h2 className="text-3xl md:text-5xl font-black mt-3 tracking-tight">
                <SplitText delay={80} stagger={45}>{t(i18n.section.weeklyPicks)}</SplitText>
              </h2>
            </div>
            <RevealSection variant="scale" delay={300} className="hidden md:block">
              <Link href="#categories" className="btn-outline px-5 py-2.5 text-sm link-arrow">
                {t(i18n.section.viewAll)}
              </Link>
            </RevealSection>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featured.map((product, i) => (
              <RevealSection key={product.id} delay={i * 100}>
                <TiltCard className="card-hover rounded-[20px] h-full">
                  <Link href={`/products/${product.id}`}
                        className="group relative rounded-[20px] overflow-hidden border border-[#1E1E1E] bg-[#111] block h-full">
                    <div className="relative">
                      <ProductCover
                        product={product}
                        tag={lang === 'en' ? (product.tagEn || product.tag) : product.tag}
                        className="aspect-[4/3] w-full flex items-center justify-center text-7xl"
                      />
                      <span className="absolute bottom-3 right-4 text-[9px] text-white/30 uppercase tracking-[0.2em] font-medium z-10">
                        {product.categorySlug}
                      </span>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="text-[10px] text-[#888] uppercase tracking-[0.15em] mb-1.5">
                            {lang === 'en' ? product.categoryEn : product.category}
                          </div>
                          <h3 className="font-black text-lg leading-tight group-hover:text-[#A855F7] transition-colors duration-300">
                            {product.title}
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-2xl font-black text-[#A855F7]">¥{product.price}</div>
                          {product.originalPrice && (
                            <div className="text-xs text-[#888] line-through">¥{product.originalPrice}</div>
                          )}
                        </div>
                      </div>
                      <p className="text-[#999] text-sm line-clamp-2 mb-4">
                        {lang === 'en' ? product.subtitleEn : product.subtitle}
                      </p>
                      <div className="flex items-center justify-between border-t border-[#1A1A1A] pt-3">
                        <span className="text-[10px] text-[#888] uppercase tracking-[0.15em]">{product.format}</span>
                        <span className="text-sm text-[#999] group-hover:text-[#A855F7] link-arrow transition-colors duration-200">
                          {t(i18n.section.viewDetails)}
                        </span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>


      {/* ══ REVERSE MARQUEE ══════════════════════════════ */}
      <div className="rule-line" />
      <div className="marquee-outer bg-[#0A0A0A] py-3 overflow-hidden">
        <div className="flex" style={{ direction:'rtl' }}>
          {[0,1].map(t=>(
            <div key={t} className="marquee-track" style={{ animationDuration:'20s' }}>
              {['Ready to Use','High Quality','Regularly Updated','Original Design','Battle-Tested','Commercial License',
                'Ready to Use','High Quality','Regularly Updated','Original Design','Battle-Tested','Commercial License'].map((item,i)=>(
                <span key={i} className="inline-flex items-center gap-3 px-8 text-[11px]
                                         font-medium text-[#666] whitespace-nowrap
                                         hover:text-[#A855F7] transition-colors duration-200 cursor-default">
                  <PlusMark />{item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="rule-line" />


      {/* ══ FOOTER ═══════════════════════════════════════ */}
      <footer className="px-5 md:px-10 py-12 md:py-16 bg-[#0A0A0A]">
        <RevealSection variant="scale">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10">
            <div>
              <Link href="/" className="flex items-baseline gap-1 group mb-3">
                <span className="text-xl font-black">{lang === 'en' ? 'Design Resources' : '数字资料站'}</span>
                <span className="text-[#A855F7] text-xl font-black inline-block group-hover:rotate-12 transition-transform duration-300">。</span>
              </Link>
              <p className="text-[11px] text-[#888] uppercase tracking-[0.2em] mb-6">{t(i18n.footer.tagline)}</p>
              <p className="text-xs text-[#666]">{t(i18n.footer.rights)}</p>
              <p className="text-[10px] text-[#555] mt-1 uppercase tracking-[0.15em]">{t(i18n.footer.crafted)}</p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="en-tag mb-2"><span className="en-tag-line" />{t(i18n.footer.explore)}</span>
              {categories.map(c=>(
                <Link key={c.slug} href={`/category/${c.slug}`}
                      className="text-[#888] text-sm hover:text-[#A855F7] transition-colors duration-200 link-arrow">
                  {c.emoji} {lang === 'en' ? c.nameEn : c.name} →
                </Link>
              ))}
              <Link href="/contact"
                    className="text-[#888] text-sm hover:text-[#A855F7] transition-colors duration-200 link-arrow mt-1">
                💬 {t(i18n.nav.contact)} →
              </Link>
            </div>

            <div className="flex flex-col gap-3 text-right">
              <span className="en-tag"><span className="en-tag-line" />Resources</span>
              <ScrambleText as="p" className="text-[11px] text-[#666] font-mono" speed={0.55}>{t(i18n.footer.stat1)}</ScrambleText>
              <ScrambleText as="p" className="text-[11px] text-[#666] font-mono" speed={0.55}>{t(i18n.footer.stat2)}</ScrambleText>
              <ScrambleText as="p" className="text-[11px] text-[#666] font-mono" speed={0.55}>{t(i18n.footer.stat3)}</ScrambleText>
              <div className="mt-4"><ScrollToTop /></div>
            </div>
          </div>
        </RevealSection>
      </footer>

    </div>
  );
}
