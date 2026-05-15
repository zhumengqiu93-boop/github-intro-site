'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import type { Product } from '@/lib/products';
import { contact } from '@/lib/contact';
import { i18n, tr } from '@/lib/i18n';
import { useLang } from './LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import RevealSection    from './RevealSection';
import MagneticButton   from './MagneticButton';
import SplitText        from './SplitText';

/* ── Cover image with emoji fallback on error ── */
function CoverImage({ product, tag }: { product: Product; tag?: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = !!product.image && !imgFailed;

  return (
    <div
      className="w-full aspect-[4/3] md:aspect-square rounded-[28px] relative overflow-hidden
                 border border-[#2A2A2A] group cursor-pointer"
      style={{ background: product.cover }}
    >
      {showImg ? (
        <img
          src={product.image}
          alt={product.title}
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover
                     transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center
                         text-[120px] transition-transform duration-500 group-hover:scale-110">
          {product.emoji}
        </span>
      )}

      {tag && (
        <span className="absolute top-5 right-5 px-4 py-1.5 rounded-full text-sm font-bold
                         text-[#0A0A0A] z-10 transition-transform duration-300 group-hover:scale-105"
              style={{ background: product.tagColor }}>
          {tag}
        </span>
      )}

      {/* Shimmer on non-image covers */}
      {!showImg && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent
                        translate-x-[-100%] group-hover:translate-x-[100%]
                        transition-transform duration-700 skew-x-12" />
      )}
    </div>
  );
}

/* ── Detail-page image gallery ── */
function ImageGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<number, boolean>>({});

  if (!images || images.length === 0) {
    /* Placeholder skeleton while waiting for images */
    return (
      <div className="mt-16 border-t border-[#1E1E1E] pt-12">
        <h2 className="text-xl font-black mb-6 text-[#666] uppercase tracking-widest">
          Gallery · 图集
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map(n => (
            <div key={n}
                 className="aspect-video rounded-2xl bg-[#141414] border border-[#1E1E1E]
                            flex items-center justify-center text-[#555] text-sm">
              即将上传 · Coming soon
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 border-t border-[#1E1E1E] pt-12">
      {/* Section heading */}
      <h2 className="text-xl font-black mb-8 uppercase tracking-widest text-[#999]">
        Gallery · 图集
      </h2>

      {/* Main large preview */}
      <div className="w-full rounded-[24px] overflow-hidden border border-[#2A2A2A] mb-4
                      bg-[#141414] aspect-video relative">
        {!failed[active] ? (
          <img
            key={active}
            src={images[active]}
            alt={`${title} — ${active + 1}`}
            onError={() => setFailed(f => ({ ...f, [active]: true }))}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#666]">
            图片加载失败
          </div>
        )}
        {/* Image counter */}
        <span className="absolute bottom-4 right-4 px-3 py-1 rounded-full
                         bg-black/50 text-white text-xs font-mono backdrop-blur-sm">
          {active + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={() => setActive(i)}
            className={`flex-shrink-0 w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden
                        border-2 transition-all duration-200
                        ${i === active
                          ? 'border-[#A855F7] opacity-100'
                          : 'border-transparent opacity-50 hover:opacity-80'}`}
          >
            {!failed[i] ? (
              <img
                src={src}
                alt={`thumb ${i + 1}`}
                onError={() => setFailed(f => ({ ...f, [i]: true }))}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[#1E1E1E]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════ */
export default function ProductDetail({ product }: { product: Product }) {
  const { lang } = useLang();
  const t = (e: { en: string; zh: string }) => tr(e, lang);
  const [copied, setCopied] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowStickyBar(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const copyId = () => {
    navigator.clipboard.writeText(contact.wechatId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const tag = lang === 'en' ? (product.tagEn || product.tag) : product.tag;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">

      {/* ── Nav ── */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4
                      border-b border-[#1E1E1E] sticky top-0 z-50
                      bg-[#0A0A0A]/90 backdrop-blur-md">
        <Link href="/" className="text-base md:text-xl font-black tracking-tight group whitespace-nowrap">
          {lang === 'en' ? 'Design Resources' : '数字资料站'}
          <span className="text-[#A855F7] inline-block group-hover:rotate-12 transition-transform duration-300">。</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href={`/category/${product.categorySlug}`}
                className="text-[#999] text-sm hover:text-white transition-colors link-arrow">
            {t(i18n.product.backTo)} {lang === 'en' ? product.categoryEn : product.category}
          </Link>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-5 md:px-6 py-12 md:py-16">

        {/* ── Top: Cover + Info ── */}
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">

          {/* Left: Cover image */}
          <RevealSection delay={0}>
            <div>
              <CoverImage product={product} tag={tag} />

              {/* Format badges */}
              <div className="mt-4 flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-full bg-[#1E1E1E] border border-[#2A2A2A]
                                 text-sm text-[#999] tag-hover cursor-default">
                  {t(i18n.product.formatLabel)}: {product.format}
                </span>
                {product.pages && (
                  <span className="px-4 py-2 rounded-full bg-[#1E1E1E] border border-[#2A2A2A]
                                   text-sm text-[#999] tag-hover cursor-default">
                    {product.pages} {t(i18n.product.pagesLabel)}
                  </span>
                )}
              </div>
            </div>
          </RevealSection>

          {/* Right: Product info */}
          <RevealSection delay={120}>
            <div className="sticky top-24">

              <RevealSection variant="left">
                <p className="text-[#A855F7] text-sm font-bold uppercase tracking-widest mb-3">
                  {lang === 'en' ? product.categoryEn : product.category}
                </p>
              </RevealSection>

              <h1 className="text-3xl md:text-4xl font-black mb-2 leading-tight">
                <SplitText delay={80} stagger={40}>{product.title}</SplitText>
              </h1>

              <RevealSection delay={200} variant="blur">
                <p className="text-[#999] mb-6">
                  {lang === 'en' ? product.subtitleEn : product.subtitle}
                </p>
              </RevealSection>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl md:text-5xl font-black text-[#A855F7] tabular-nums">
                  ¥{product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg md:text-xl text-[#888] line-through">
                      ¥{product.originalPrice}
                    </span>
                    <span className="text-sm bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full animate-pulse">
                      {t(i18n.product.save)} ¥{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* WeChat contact card */}
              <div className="bg-[#0E0E0E] border border-[#1E1E1E] rounded-2xl overflow-hidden mb-8">
                <div className="px-5 py-4 border-b border-[#141414]">
                  <h3 className="font-black text-base text-white">{t(i18n.product.contactTitle)}</h3>
                  <p className="text-[#999] text-xs mt-1 leading-relaxed">{t(i18n.product.contactDesc)}</p>
                </div>

                {/* WeChat ID + copy */}
                <div className="px-5 py-4 border-b border-[#141414]">
                  <div className="text-[10px] text-[#666] font-mono uppercase tracking-wider mb-2">
                    WeChat ID
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#141414] border border-[#222] rounded-xl px-3 py-2.5
                                    font-mono text-white text-sm select-all truncate">
                      {contact.wechatId}
                    </div>
                    <button
                      onClick={copyId}
                      className="flex-shrink-0 px-4 py-2.5 rounded-xl border text-xs font-bold
                                 transition-all duration-200 cursor-pointer"
                      style={{
                        borderColor: copied ? 'rgba(168,85,247,0.5)' : '#222',
                        color: copied ? '#A855F7' : '#555',
                      }}
                    >
                      {copied ? t(i18n.product.copied) : t(i18n.product.copyId)}
                    </button>
                  </div>
                </div>

                {/* QR Code */}
                <div className="px-5 py-5 flex items-center gap-5">
                  <div className="p-3 bg-white rounded-xl flex-shrink-0">
                    <QRCode value={contact.wechatQrValue} size={88} fgColor="#0A0A0A" bgColor="#fff" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold mb-1">{t(i18n.product.scanHint)}</div>
                    <div className="text-[#888] text-xs leading-relaxed">
                      {lang === 'en'
                        ? 'Scan with WeChat · Send product name · Receive link'
                        : '微信扫码 → 发送资料名称 → 收到下载链接'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Includes list */}
              <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
                <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-[#999]">
                  {t(i18n.product.includes)}
                </h3>
                <ul className="space-y-3">
                  {(lang === 'en' ? product.includesEn : product.includes).map((item, idx) => (
                    <li key={item}
                        className="flex items-center gap-3 text-sm group/item cursor-default
                                   transition-all duration-200 hover:translate-x-1"
                        style={{ transitionDelay: `${idx * 30}ms` }}>
                      <span className="w-5 h-5 rounded-full bg-[#A855F7]/20 flex items-center justify-center
                                       flex-shrink-0 group-hover/item:bg-[#A855F7]/40 transition-colors duration-200">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="#A855F7" strokeWidth="1.5"
                                strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                      <span className="group-hover/item:text-white transition-colors duration-200">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </RevealSection>
        </div>

        {/* ── Image Gallery ── */}
        <RevealSection delay={0}>
          <ImageGallery images={product.images ?? []} title={product.title} />
        </RevealSection>

        {/* ── Description ── */}
        <RevealSection delay={0}>
          <div className="mt-16 border-t border-[#1E1E1E] pt-12">
            <h2 className="text-2xl font-black mb-6">
              <SplitText delay={0} stagger={50}>{t(i18n.product.description)}</SplitText>
            </h2>
            <RevealSection delay={100} variant="blur">
              <p className="text-[#999] leading-relaxed text-lg max-w-3xl">
                {lang === 'en' ? product.descriptionEn : product.description}
              </p>
            </RevealSection>
          </div>
        </RevealSection>

        {/* ── Notice ── */}
        <RevealSection delay={100}>
          <div className="mt-10 bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 flex gap-4
                          hover:border-[#A855F7]/20 transition-colors duration-300">
            <span className="text-2xl float-anim-slow">💡</span>
            <div>
              <p className="font-bold mb-1 text-sm">{t(i18n.product.noticeTitle)}</p>
              <p className="text-[#999] text-sm leading-relaxed">{t(i18n.product.noticeText)}</p>
            </div>
          </div>
        </RevealSection>

        {/* ── More CTA ── */}
        <RevealSection delay={200}>
          <div className="mt-16 text-center">
            <p className="text-[#999] mb-4 text-sm">{t(i18n.product.moreTitle)}</p>
            <MagneticButton href="/" blob className="btn-accent px-8 py-4 text-base rounded-2xl">
              {t(i18n.product.browseAll)}
            </MagneticButton>
          </div>
        </RevealSection>

      </div>

      {/* Sticky purchase bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#1E1E1E]
                   bg-[#0A0A0A]/95 backdrop-blur-md px-4 py-3 flex items-center justify-between gap-4"
        style={{
          transform: showStickyBar ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.4s cubic-bezier(0.25,1,0.5,1)',
        }}
      >
        <div className="min-w-0">
          <div className="font-black text-white truncate text-sm">{product.title}</div>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-lg font-black text-[#A855F7]">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#888] line-through">¥{product.originalPrice}</span>
            )}
          </div>
        </div>
        <button
          onClick={copyId}
          className="shrink-0 px-5 py-2.5 rounded-full text-sm font-black
                     text-[#0A0A0A] bg-[#A855F7] hover:bg-[#9333EA]
                     transition-colors duration-200 whitespace-nowrap"
        >
          {lang === 'en' ? 'Get via WeChat' : '微信获取'}
        </button>
      </div>
    </div>
  );
}
