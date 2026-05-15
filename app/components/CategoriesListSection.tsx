'use client';
import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/products';
import { useLang } from './LanguageContext';

/* ─── preview images per category ─────────────────────────────────── */
const PREVIEW_IMGS: Record<string, string> = {
  'ui-kit':       'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=720&h=960&fit=crop&q=85',
  'template':     'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=720&h=960&fit=crop&q=85',
  'font':         'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=720&h=960&fit=crop&q=85',
  'illustration': 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=720&h=960&fit=crop&q=85',
};

const EASE = 'cubic-bezier(0.25, 1, 0.5, 1)';

export default function CategoriesListSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { lang } = useLang();

  const activeColor = categories.find(c => c.slug === hovered)?.color ?? '#A855F7';

  return (
    <section id="categories" className="relative bg-[#0A0A0A] overflow-hidden">
      {/* Ghost number */}
      <div
        className="hidden md:block absolute top-0 right-8 select-none pointer-events-none text-right
                   text-[180px] font-black text-white leading-none"
        style={{ opacity: 0.025 }}
        aria-hidden
      >02</div>

      <div className="max-w-6xl mx-auto px-5 md:px-10 py-16 md:py-24 relative z-10">

        {/* ── Header ── */}
        <div className="flex items-end justify-between mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-5 h-px bg-[#A855F7]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#A855F7]">
                {lang === 'en' ? 'Browse Categories' : '浏览分类'}
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              {lang === 'en' ? 'Find Your Resources' : '找到你需要的资源'}
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[10px] text-[#888] uppercase tracking-[0.2em]">
              {lang === 'en' ? '04 Categories' : '04 个分类'}
            </p>
            <p className="text-[10px] text-[#666] uppercase tracking-[0.2em] mt-1">
              {lang === 'en' ? '41 Resources' : '41 件资料'}
            </p>
          </div>
        </div>

        {/* ── List + floating preview panel ── */}
        <div className="relative">

          {/* Floating image preview — right side */}
          <div
            className="hidden md:block absolute right-0 top-1/2 pointer-events-none overflow-hidden rounded-2xl z-20"
            style={{
              width: '36%',
              height: '480px',
              transform: `translateY(-50%) ${hovered ? 'translateX(0) scale(1)' : 'translateX(28px) scale(0.96)'}`,
              opacity: hovered ? 1 : 0,
              transition: `opacity 0.55s ${EASE}, transform 0.65s ${EASE}`,
            }}
          >
            {/* Stack all images, cross-fade between them */}
            {categories.map((cat) => (
              <div
                key={cat.slug}
                className="absolute inset-0"
                style={{
                  opacity: hovered === cat.slug ? 1 : 0,
                  transition: `opacity 0.45s ease`,
                }}
              >
                <img
                  src={PREVIEW_IMGS[cat.slug]}
                  alt={cat.nameEn}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
                {/* Tint + bottom fade */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(160deg, ${cat.color}55 0%, transparent 55%),
                                 linear-gradient(to top, #0A0A0A 0%, transparent 35%)`,
                  }}
                />
                {/* Category label on image */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div
                    className="text-[10px] uppercase tracking-[0.25em] font-bold mb-1.5"
                    style={{ color: cat.color }}
                  >
                    {lang === 'en' ? cat.nameEn : cat.name}
                  </div>
                  <div className="text-white/50 text-xs">
                    {cat.count} {lang === 'en' ? 'resources available' : '个资源可用'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* List rows */}
          <div
            style={{
              paddingRight: hovered ? '38%' : '0',
              transition: `padding-right 0.55s ${EASE}`,
            }}
          >
            {categories.map((cat, i) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="group flex items-center gap-4 md:gap-7 border-t border-[#1E1E1E] relative"
                style={{
                  paddingTop:    '1.75rem',
                  paddingBottom: '1.75rem',
                  opacity: hovered && hovered !== cat.slug ? 0.18 : 1,
                  transition: `opacity 0.45s ${EASE}`,
                }}
                onMouseEnter={() => setHovered(cat.slug)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Row background wash */}
                <div
                  className="absolute inset-0 -z-10"
                  style={{
                    background: `${cat.color}0D`,
                    opacity: hovered === cat.slug ? 1 : 0,
                    transition: `opacity 0.3s ease`,
                  }}
                />

                {/* Left accent line (scaleY in from top on hover) */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] origin-top"
                  style={{
                    background: cat.color,
                    transform: hovered === cat.slug ? 'scaleY(1)' : 'scaleY(0)',
                    transition: `transform 0.45s ${EASE}`,
                  }}
                />

                {/* Index */}
                <span className="text-[11px] text-[#555] font-bold tabular-nums shrink-0 w-7 text-right select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Emoji */}
                <span
                  className="text-3xl md:text-4xl shrink-0 select-none"
                  style={{
                    display: 'inline-block',
                    transform: hovered === cat.slug
                      ? 'scale(1.18) rotate(-10deg)'
                      : 'scale(1) rotate(0deg)',
                    transition: `transform 0.4s ${EASE}`,
                  }}
                >
                  {cat.emoji}
                </span>

                {/* Name + reveal-description */}
                <div
                  className="flex-1 min-w-0"
                  style={{
                    transform: hovered === cat.slug ? 'translateX(8px)' : 'translateX(0)',
                    transition: `transform 0.45s ${EASE}`,
                  }}
                >
                  <div
                    className="font-black tracking-tight leading-tight truncate"
                    style={{
                      fontSize: 'clamp(1.25rem, 3vw, 2.5rem)',
                      color: hovered === cat.slug ? cat.color : 'white',
                      transition: `color 0.3s ease`,
                    }}
                  >
                    {lang === 'en' ? cat.nameEn : cat.name}
                  </div>
                  {/* Description — slides down on hover */}
                  <div
                    className="text-[#888] text-xs md:text-sm overflow-hidden"
                    style={{
                      maxHeight: hovered === cat.slug ? '2.5rem' : '0',
                      opacity:   hovered === cat.slug ? 1 : 0,
                      marginTop: hovered === cat.slug ? '0.35rem' : '0',
                      transition: `max-height 0.4s ${EASE}, opacity 0.35s ease, margin-top 0.4s ${EASE}`,
                    }}
                  >
                    {lang === 'en' ? cat.descEn : cat.desc}
                  </div>
                </div>

                {/* Count + arrow */}
                <div className="shrink-0 flex items-center gap-3 md:gap-5">
                  <span
                    className="hidden md:block text-[11px] text-[#666] uppercase tracking-[0.2em]"
                    style={{
                      opacity: hovered === cat.slug ? 1 : 0.6,
                      transition: `opacity 0.3s ease`,
                    }}
                  >
                    {cat.count}&nbsp;{lang === 'en' ? 'items' : '件'}
                  </span>
                  <span
                    className="text-lg md:text-xl font-bold"
                    style={{
                      color: cat.color,
                      transform: hovered === cat.slug ? 'translateX(6px)' : 'translateX(0)',
                      transition: `transform 0.4s ${EASE}`,
                    }}
                  >
                    →
                  </span>
                </div>
              </Link>
            ))}

            {/* Bottom border */}
            <div className="border-t border-[#1E1E1E]" />
          </div>
        </div>

      </div>
    </section>
  );
}
