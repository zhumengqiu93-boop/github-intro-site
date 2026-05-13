'use client';
import Link from "next/link";
import { categories, products } from "@/lib/products";
import { i18n, tr } from "@/lib/i18n";
import { useLang } from "@/app/components/LanguageContext";
import LanguageSwitcher  from "@/app/components/LanguageSwitcher";
import ParticleCanvas    from "@/app/components/ParticleCanvas";
import AboutSection      from "@/app/components/AboutSection";
import MarqueeSection    from "@/app/components/MarqueeSection";
import TiltCard          from "@/app/components/TiltCard";
import RevealSection     from "@/app/components/RevealSection";
import MagneticButton    from "@/app/components/MagneticButton";
import ScrollToTop       from "@/app/components/ScrollToTop";
import SplitText         from "@/app/components/SplitText";
import ScrambleText      from "@/app/components/ScrambleText";
import WordSphere        from "@/app/components/WordSphere";

function EnTag({ children }: { children: string }) {
  return (
    <span className="en-tag">
      <span className="en-tag-line" />
      <ScrambleText speed={0.5}>{children}</ScrambleText>
    </span>
  );
}
function PlusMark({ className = "" }: { className?: string }) {
  return <span className={`text-[#D4F542] text-sm select-none ${className}`} aria-hidden>＋</span>;
}

export default function Home() {
  const { lang } = useLang();
  const t  = (e: { en: string; zh: string }) => tr(e, lang);
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">

      {/* ══ NAV ══════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
                      px-4 md:px-8 py-3 md:py-4 border-b border-[#1A1A1A] bg-[#0A0A0A]/90 backdrop-blur-md">
        <Link href="/" className="flex items-baseline gap-1 group whitespace-nowrap">
          <span className="text-base md:text-lg font-black tracking-tight">
            {lang === 'en' ? 'Design Resources' : '数字资料站'}
          </span>
          <span className="text-[#D4F542] text-base md:text-lg font-black inline-block
                           group-hover:rotate-12 transition-transform duration-300">。</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm text-[#666]">
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
          <span className="hidden md:flex items-center gap-1.5 text-[10px] text-[#555]
                           uppercase tracking-[0.18em] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4F542] animate-pulse" />
            {t(i18n.nav.available)}
          </span>
          <MagneticButton href="#products" blob className="btn-accent px-3 py-1.5 text-xs md:px-5 md:py-2 md:text-sm">
            {t(i18n.nav.browseAll)}
          </MagneticButton>
        </div>
      </nav>


      {/* ══ HERO ═════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden pt-[57px]">
        <ParticleCanvas />

        <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full
                        bg-[#D4F542]/6 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-20 left-0 w-[360px] h-[360px] rounded-full
                        bg-[#4ECFFF]/4 blur-[100px] pointer-events-none" />

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
            <div className="flex items-center gap-6 text-[10px] text-[#555] uppercase tracking-[0.2em] font-medium">
              <span>UI Kit</span><span className="h-3 w-px bg-[#2A2A2A]" />
              <span>Template</span><span className="h-3 w-px bg-[#2A2A2A]" />
              <span>Font</span><span className="h-3 w-px bg-[#2A2A2A]" />
              <span>Illustration</span>
            </div>
          </RevealSection>
        </div>

        {/* Main content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-5 md:px-10 py-8 md:py-12">
          <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[1fr_auto] gap-8 md:gap-12 items-end">
            <div>
              <RevealSection variant="left" delay={80}>
                <div className="flex items-center gap-3 mb-5 md:mb-6">
                  <div className="h-px w-8 bg-[#333]" />
                  <span className="text-[10px] md:text-[11px] text-[#555] uppercase tracking-[0.28em] font-medium">
                    {t(i18n.hero.eyebrow)}
                  </span>
                </div>
              </RevealSection>

              <h1 className="font-black leading-[0.88] tracking-[-0.03em] mb-8 md:mb-10">
                <div className="text-[clamp(48px,9.5vw,144px)] text-white">
                  <SplitText delay={120} stagger={55}>{t(i18n.hero.line1)}</SplitText>
                </div>
                <div className="text-[clamp(48px,9.5vw,144px)] text-[#D4F542]"
                     style={{ WebkitTextStroke: '2px #D4F542' }}>
                  <SplitText delay={420} stagger={55}>{t(i18n.hero.line2)}</SplitText>
                </div>
              </h1>

              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-8">
                <RevealSection delay={720} variant="blur" className="max-w-xs">
                  <p className="text-[#666] text-base leading-relaxed mb-1">{t(i18n.hero.desc1)}</p>
                  <p className="text-[#444] text-sm leading-relaxed">{t(i18n.hero.desc2)}</p>
                </RevealSection>
                <RevealSection delay={860} variant="scale">
                  <div className="flex gap-3 flex-wrap">
                    <MagneticButton href="#categories" blob className="btn-accent px-8 py-3.5 text-sm">
                      {t(i18n.hero.explore)}
                    </MagneticButton>
                    <MagneticButton href="#about" blob className="btn-outline px-8 py-3.5 text-sm">
                      {t(i18n.hero.about)}
                    </MagneticButton>
                  </div>
                </RevealSection>
              </div>
            </div>

            {/* 3-D Word Sphere + stats — desktop only */}
            <RevealSection delay={500} variant="scale" className="hidden md:flex flex-col items-center gap-6">
              <WordSphere size={320} />
              <div className="flex flex-col gap-4 text-right w-full">
                {([
                  ['50+',    '发布资料 / Resources'],
                  ['3,000+', '付费用户 / Users'],
                  ['4.9 ★',  '评分 / Rating'],
                ] as [string, string][]).map(([n, l]) => (
                  <div key={l}>
                    <div className="text-2xl font-black text-[#D4F542] leading-none">{n}</div>
                    <div className="text-[10px] text-[#555] uppercase tracking-[0.18em] mt-0.5">{l}</div>
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
                                             font-medium text-[#3A3A3A] whitespace-nowrap
                                             hover:text-[#D4F542] transition-colors duration-200 cursor-default">
                      <span className="text-[#D4F542] opacity-40">✦</span>{item}
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
          <span className="text-[10px] text-[#333] uppercase tracking-[0.2em]">{t(i18n.section.yearsOfCraft)}</span>
        </div>
        <AboutSection />
      </div>


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
                <p className="text-[10px] text-[#444] uppercase tracking-[0.2em]">{t(i18n.section.catCount)}</p>
                <p className="text-[10px] text-[#333] uppercase tracking-[0.2em] mt-1">{t(i18n.section.resCount)}</p>
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
                      <span className="text-[10px] text-[#333] font-bold tabular-nums">{String(i+1).padStart(2,'0')}</span>
                    </div>
                    <div className="relative z-10 flex-1 flex flex-col justify-end">
                      <div className="font-bold text-base mb-1 group-hover:text-[#D4F542] transition-colors duration-300">
                        {lang === 'en' ? cat.nameEn : cat.name}
                      </div>
                      <div className="text-[#555] text-xs leading-relaxed">
                        {lang === 'en' ? cat.descEn : cat.desc}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#1E1E1E] relative z-10">
                      <span className="text-[10px] text-[#444] uppercase tracking-[0.15em]">
                        {cat.count} {t(i18n.section.items)}
                      </span>
                      <span className="text-[#D4F542] text-sm group-hover:translate-x-1 transition-transform duration-200">→</span>
                    </div>
                    <div className="tooltip-wrap absolute top-3 right-3 z-20">
                      <div className="tooltip-tip">{lang === 'en' ? `Browse ${cat.nameEn}` : `浏览全部 ${cat.name}`}</div>
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
              <Link href="/category/ui-kit" className="btn-outline px-5 py-2.5 text-sm link-arrow">
                {t(i18n.section.viewAll)}
              </Link>
            </RevealSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {featured.map((product, i) => (
              <RevealSection key={product.id} delay={i * 100}>
                <TiltCard className="card-hover rounded-[20px] h-full">
                  <Link href={`/products/${product.id}`}
                        className="group relative rounded-[20px] overflow-hidden border border-[#1E1E1E] bg-[#111] block h-full">
                    <div className="h-52 flex items-center justify-center text-7xl relative overflow-hidden"
                         style={{ background: product.cover }}>
                      <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">{product.emoji}</span>
                      {product.tag && (
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold text-[#0A0A0A]"
                              style={{ background: product.tagColor }}>
                          {lang === 'en' ? (product.tagEn || product.tag) : product.tag}
                        </span>
                      )}
                      <span className="absolute bottom-3 right-4 text-[9px] text-white/30 uppercase tracking-[0.2em] font-medium">
                        {product.categorySlug}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                    </div>
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="text-[10px] text-[#444] uppercase tracking-[0.15em] mb-1.5">
                            {lang === 'en' ? product.categoryEn : product.category}
                          </div>
                          <h3 className="font-black text-lg leading-tight group-hover:text-[#D4F542] transition-colors duration-300">
                            {product.title}
                          </h3>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-2xl font-black text-[#D4F542]">¥{product.price}</div>
                          {product.originalPrice && (
                            <div className="text-xs text-[#444] line-through">¥{product.originalPrice}</div>
                          )}
                        </div>
                      </div>
                      <p className="text-[#555] text-sm line-clamp-2 mb-4">
                        {lang === 'en' ? product.subtitleEn : product.subtitle}
                      </p>
                      <div className="flex items-center justify-between border-t border-[#1A1A1A] pt-3">
                        <span className="text-[10px] text-[#444] uppercase tracking-[0.15em]">{product.format}</span>
                        <span className="text-sm text-[#555] group-hover:text-[#D4F542] link-arrow transition-colors duration-200">
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
                                         font-medium text-[#2E2E2E] whitespace-nowrap
                                         hover:text-[#D4F542] transition-colors duration-200 cursor-default">
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
                <span className="text-[#D4F542] text-xl font-black inline-block group-hover:rotate-12 transition-transform duration-300">。</span>
              </Link>
              <p className="text-[11px] text-[#444] uppercase tracking-[0.2em] mb-6">{t(i18n.footer.tagline)}</p>
              <p className="text-xs text-[#333]">{t(i18n.footer.rights)}</p>
              <p className="text-[10px] text-[#2A2A2A] mt-1 uppercase tracking-[0.15em]">{t(i18n.footer.crafted)}</p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="en-tag mb-2"><span className="en-tag-line" />{t(i18n.footer.explore)}</span>
              {categories.map(c=>(
                <Link key={c.slug} href={`/category/${c.slug}`}
                      className="text-[#444] text-sm hover:text-[#D4F542] transition-colors duration-200 link-arrow">
                  {c.emoji} {lang === 'en' ? c.nameEn : c.name} →
                </Link>
              ))}
              <Link href="/contact"
                    className="text-[#444] text-sm hover:text-[#D4F542] transition-colors duration-200 link-arrow mt-1">
                💬 {t(i18n.nav.contact)} →
              </Link>
            </div>

            <div className="flex flex-col gap-3 text-right">
              <span className="en-tag flex-row-reverse"><span className="en-tag-line" />Resources</span>
              <ScrambleText as="p" className="text-[11px] text-[#333] font-mono" speed={0.55}>{t(i18n.footer.stat1)}</ScrambleText>
              <ScrambleText as="p" className="text-[11px] text-[#333] font-mono" speed={0.55}>{t(i18n.footer.stat2)}</ScrambleText>
              <ScrambleText as="p" className="text-[11px] text-[#333] font-mono" speed={0.55}>{t(i18n.footer.stat3)}</ScrambleText>
              <div className="mt-4"><ScrollToTop /></div>
            </div>
          </div>
        </RevealSection>
      </footer>

    </div>
  );
}
