'use client';
import Link from 'next/link';
import TiltCard from './TiltCard';
import RevealSection from './RevealSection';
import SplitText from './SplitText';
import LanguageSwitcher from './LanguageSwitcher';
import ProductCover from './ProductCover';
import { useLang } from './LanguageContext';
import { i18n, tr } from '@/lib/i18n';
import type { Category, Product } from '@/lib/products';

interface Props {
  category: Category;
  items: Product[];
}

export default function CategoryGrid({ category, items }: Props) {
  const { lang } = useLang();
  const t = (e: { en: string; zh: string }) => tr(e, lang);

  const categoryName = lang === 'en' ? category.nameEn : category.name;
  const categoryDesc = lang === 'en' ? category.descEn : category.desc;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-[#1E1E1E]
                      sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md">
        <Link href="/" className="text-base md:text-xl font-black tracking-tight group whitespace-nowrap">
          {lang === 'en' ? 'Design Resources' : '数字资料站'}
          <span className="text-[#A855F7] inline-block group-hover:rotate-12 transition-transform duration-300">。</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/" className="text-[#999] text-sm hover:text-white transition-colors link-arrow">
            {t(i18n.category.backHome)}
          </Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-5 md:px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <RevealSection variant="scale">
              <span className="text-5xl float-anim">{category.emoji}</span>
            </RevealSection>
            <div>
              <RevealSection variant="left">
                <p className="text-[#A855F7] text-sm font-bold uppercase tracking-widest mb-1">
                  {t(i18n.category.pageLabel)}
                </p>
              </RevealSection>
              <h1 className="text-4xl font-black">
                <SplitText delay={60} stagger={45}>{categoryName}</SplitText>
              </h1>
            </div>
          </div>
          <RevealSection delay={200} variant="blur">
            <p className="text-[#999] mt-2 max-w-xl">{categoryDesc}</p>
          </RevealSection>
        </div>

        {/* Product Grid */}
        {items.length === 0 ? (
          <RevealSection>
            <div className="text-center py-24 text-[#888]">
              <div className="text-6xl mb-4 float-anim">📦</div>
              <p className="text-lg">{t(i18n.category.empty)}</p>
            </div>
          </RevealSection>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((product, i) => {
              const tag = lang === 'en' ? (product.tagEn || product.tag) : product.tag;
              const subtitle = lang === 'en' ? product.subtitleEn : product.subtitle;
              return (
                <RevealSection key={product.id} delay={i * 90}>
                  <TiltCard className="card-hover card-stack rounded-[24px] h-full">
                    <Link
                      href={`/products/${product.id}`}
                      className="group relative rounded-[24px] overflow-hidden border border-[#2A2A2A] bg-[#141414] block h-full"
                    >
                      <ProductCover
                        product={product}
                        tag={tag}
                        className="aspect-[4/3] w-full flex items-center justify-center text-6xl"
                      />
                      <div className="p-5">
                        <h3 className="font-black text-lg mb-1 group-hover:text-[#A855F7] transition-colors duration-300">
                          {product.title}
                        </h3>
                        <p className="text-[#999] text-sm mb-4 line-clamp-2">{subtitle}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-black text-[#A855F7]">¥{product.price}</span>
                            {product.originalPrice && (
                              <span className="text-xs text-[#999] line-through">¥{product.originalPrice}</span>
                            )}
                          </div>
                          <span className="text-xs text-[#999] group-hover:text-[#A855F7] link-arrow transition-colors duration-200">
                            {t(i18n.category.viewDetail)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </TiltCard>
                </RevealSection>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
