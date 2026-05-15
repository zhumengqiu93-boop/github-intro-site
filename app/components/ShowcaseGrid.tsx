'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useLang } from './LanguageContext';

/* ─── 9 grid items (3 × 3) ────────────────────────────────────────── */
const ITEMS = [
  { id: 0, row: 0, col: 0, img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=500&fit=crop&q=85', label: { en: 'Brand Identity', zh: '品牌设计'   }, cat: { en: 'Branding',      zh: '品牌视觉' }, href: '/category/ui-kit',       color: '#6750A4' },
  { id: 1, row: 0, col: 1, img: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?w=900&h=500&fit=crop&q=85', label: { en: 'IP Character',   zh: 'IP 形象设计' }, cat: { en: 'IP Design',     zh: 'IP 设计'  }, href: '/category/illustration', color: '#A855F7' },
  { id: 2, row: 0, col: 2, img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=500&fit=crop&q=85', label: { en: 'Typography',     zh: '字体排版'    }, cat: { en: 'Font',          zh: '字体资源' }, href: '/category/font',         color: '#2A7D6B' },
  { id: 3, row: 1, col: 0, img: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&h=600&fit=crop&q=85', label: { en: 'Illustration',   zh: '数字插画'    }, cat: { en: 'Illustration',  zh: '插画'     }, href: '/category/illustration', color: '#D4822A' },
  { id: 4, row: 1, col: 1, img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=900&h=600&fit=crop&q=85', label: { en: 'Motion Design',  zh: '动态设计'    }, cat: { en: 'Motion',        zh: '动效设计' }, href: '/products/2',            color: '#42B8F5' },
  { id: 5, row: 1, col: 2, img: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&h=600&fit=crop&q=85', label: { en: 'UI Component',   zh: 'UI 组件库'   }, cat: { en: 'UI Kit',        zh: 'UI 组件'  }, href: '/category/ui-kit',       color: '#F54242' },
  { id: 6, row: 2, col: 0, img: '/covers/小満.png',                                                                        label: { en: 'Grain Buds',     zh: '小满插画'    }, cat: { en: 'Illustration',  zh: '节气插画' }, href: '/products/1',            color: '#7EC67A' },
  { id: 7, row: 2, col: 1, img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=900&h=500&fit=crop&q=85', label: { en: 'Landing Page',   zh: '落地页模板'  }, cat: { en: 'Template',      zh: '网页模板' }, href: '/products/5',            color: '#A855F7' },
  { id: 8, row: 2, col: 2, img: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&h=500&fit=crop&q=85', label: { en: 'Font Bundle',    zh: '字体合集'    }, cat: { en: 'Font',          zh: '字体'     }, href: '/category/font',         color: '#F5A642' },
];

/* Easing for grid transitions */
const EASE = 'cubic-bezier(0.25, 1, 0.5, 1)';

export default function ShowcaseGrid() {
  const [hovered, setHovered] = useState<number | null>(null);
  const { lang } = useLang();

  const item     = hovered !== null ? ITEMS[hovered] : null;
  const hRow     = item?.row ?? null;
  const hCol     = item?.col ?? null;

  /* Expand the hovered row/col; shrink the rest */
  const cols = hCol === null
    ? '1fr 1.6fr 1fr'
    : [0, 1, 2].map(c => c === hCol ? '2.6fr' : '0.7fr').join(' ');

  const rows = hRow === null
    ? '1fr 1.15fr 1fr'
    : [0, 1, 2].map(r => r === hRow ? '2.2fr' : '0.7fr').join(' ');

  return (
    <section className="relative bg-[#080808] overflow-hidden">
      {/* ── Section header ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 pt-16 md:pt-20 pb-8 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-6 h-px bg-[#A855F7]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#A855F7]">
              {lang === 'en' ? 'Featured Works' : '精选作品'}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            {lang === 'en' ? 'Design that ships.' : '设计，落地。'}
          </h2>
        </div>
        <Link
          href="#categories"
          className="hidden md:inline-flex items-center gap-2 px-6 py-3 rounded-full border
                     border-[#222] text-sm text-[#999] hover:text-white hover:border-[#444]
                     transition-all duration-300"
        >
          {lang === 'en' ? 'Browse All' : '浏览全部'} →
        </Link>
      </div>

      {/* ── Grid ── */}
      <div className="px-5 md:px-10 pb-8 max-w-6xl mx-auto"
           style={{ height: 'calc(100vh - 180px)', minHeight: 480 }}>
        <div
          className="grid gap-2 md:gap-2.5 w-full h-full"
          style={{
            gridTemplateColumns: cols,
            gridTemplateRows:    rows,
            transition: `grid-template-columns 0.65s ${EASE}, grid-template-rows 0.65s ${EASE}`,
          }}
        >
          {ITEMS.map((it) => {
            const isActive = hovered === it.id;
            /* Cells not in hovered row OR col dim out */
            const dimmed   = hovered !== null && hRow !== it.row && hCol !== it.col;

            return (
              <Link
                key={it.id}
                href={it.href}
                className="relative overflow-hidden rounded-xl md:rounded-2xl block"
                style={{
                  opacity:    dimmed ? 0.35 : 1,
                  transition: `opacity 0.5s ${EASE}`,
                }}
                onMouseEnter={() => setHovered(it.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Photo */}
                <img
                  src={it.img}
                  alt={it.label.en}
                  draggable={false}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  style={{
                    transform:  isActive ? 'scale(1.07)' : 'scale(1.01)',
                    transition: `transform 0.75s ${EASE}`,
                  }}
                />

                {/* Always-on subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

                {/* Hover gradient */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                  style={{
                    opacity:    isActive ? 1 : 0,
                    transition: `opacity 0.4s ${EASE}`,
                  }}
                />

                {/* Category chip — resting state */}
                <div
                  className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[9px] md:text-[10px] font-bold backdrop-blur-sm"
                  style={{
                    background: `${it.color}22`,
                    border:     `1px solid ${it.color}44`,
                    color:      it.color,
                    opacity:    isActive ? 0 : 0.9,
                    transform:  isActive ? 'translateY(-4px)' : 'translateY(0)',
                    transition: `opacity 0.3s ease, transform 0.3s ease`,
                  }}
                >
                  {lang === 'en' ? it.cat.en : it.cat.zh}
                </div>

                {/* Hover label */}
                <div
                  className="absolute bottom-0 left-0 right-0 p-4 md:p-5"
                  style={{
                    transform:  isActive ? 'translateY(0)' : 'translateY(10px)',
                    opacity:    isActive ? 1 : 0,
                    transition: `transform 0.45s ${EASE}, opacity 0.35s ease`,
                  }}
                >
                  <div
                    className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.22em] mb-1"
                    style={{ color: it.color }}
                  >
                    {lang === 'en' ? it.cat.en : it.cat.zh}
                  </div>
                  <div className="text-white font-black text-sm md:text-lg leading-tight">
                    {lang === 'en' ? it.label.en : it.label.zh}
                  </div>
                  <div className="flex items-center gap-2 mt-2 md:mt-3">
                    <span className="text-[10px] md:text-xs text-white/50">
                      {lang === 'en' ? 'View Resource' : '查看资源'}
                    </span>
                    <span className="text-xs md:text-sm transition-transform duration-300 group-hover:translate-x-1"
                          style={{ color: it.color }}>→</span>
                  </div>
                </div>

                {/* Accent dot — top-right */}
                <div
                  className="absolute top-3 right-3 w-2 h-2 rounded-full"
                  style={{
                    background: it.color,
                    opacity:    isActive ? 1 : 0,
                    transform:  isActive ? 'scale(1)' : 'scale(0)',
                    transition: `all 0.35s ${EASE} 0.08s`,
                  }}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
