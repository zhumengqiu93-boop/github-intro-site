'use client';
import { useState } from 'react';
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

export default function ProductDetail({ product }: { product: Product }) {
  const { lang } = useLang();
  const t = (e: { en: string; zh: string }) => tr(e, lang);
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(contact.wechatId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const tag = lang === 'en' ? (product.tagEn || product.tag) : product.tag;

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-[#1E1E1E]
                      sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md">
        <Link href="/" className="text-base md:text-xl font-black tracking-tight group whitespace-nowrap">
          {lang === 'en' ? 'Design Resources' : '数字资料站'}
          <span className="text-[#D4F542] inline-block group-hover:rotate-12 transition-transform duration-300">。</span>
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
        <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-start">

          {/* Left: Cover */}
          <RevealSection delay={0}>
            <div>
              <div className="w-full aspect-square rounded-[32px] flex items-center justify-center text-[120px]
                              relative overflow-hidden border border-[#2A2A2A] group cursor-pointer"
                   style={{ background: product.cover }}>
                <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                  {product.emoji}
                </span>
                {tag && (
                  <span className="absolute top-6 right-6 px-4 py-1.5 rounded-full text-sm font-bold text-[#0A0A0A]
                                   transition-transform duration-300 group-hover:scale-105"
                        style={{ background: product.tagColor }}>
                    {tag}
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </div>

              {/* Format badges */}
              <div className="mt-4 flex gap-3">
                <span className="px-4 py-2 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] text-sm text-[#999] tag-hover cursor-default">
                  {t(i18n.product.formatLabel)}: {product.format}
                </span>
                {product.pages && (
                  <span className="px-4 py-2 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] text-sm text-[#999] tag-hover cursor-default">
                    {product.pages} {t(i18n.product.pagesLabel)}
                  </span>
                )}
              </div>
            </div>
          </RevealSection>

          {/* Right: Info */}
          <RevealSection delay={120}>
            <div className="sticky top-24">
              <RevealSection variant="left">
                <p className="text-[#D4F542] text-sm font-bold uppercase tracking-widest mb-3">
                  {lang === 'en' ? product.categoryEn : product.category}
                </p>
              </RevealSection>
              <h1 className="text-3xl md:text-4xl font-black mb-2 leading-tight">
                <SplitText delay={80} stagger={40}>{product.title}</SplitText>
              </h1>
              <RevealSection delay={200} variant="blur">
                <p className="text-[#666] mb-6">
                  {lang === 'en' ? product.subtitleEn : product.subtitle}
                </p>
              </RevealSection>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-4xl md:text-5xl font-black text-[#D4F542] tabular-nums">¥{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg md:text-xl text-[#444] line-through">¥{product.originalPrice}</span>
                    <span className="text-sm bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full animate-pulse">
                      {t(i18n.product.save)} ¥{product.originalPrice - product.price}
                    </span>
                  </>
                )}
              </div>

              {/* ── Contact via WeChat ── */}
              <div className="bg-[#0E0E0E] border border-[#1E1E1E] rounded-2xl overflow-hidden mb-8">
                {/* Contact header */}
                <div className="px-5 py-4 border-b border-[#141414]">
                  <h3 className="font-black text-base text-white">{t(i18n.product.contactTitle)}</h3>
                  <p className="text-[#555] text-xs mt-1 leading-relaxed">{t(i18n.product.contactDesc)}</p>
                </div>

                {/* WeChat ID + copy */}
                <div className="px-5 py-4 border-b border-[#141414]">
                  <div className="text-[10px] text-[#333] font-mono uppercase tracking-wider mb-2">WeChat ID</div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#141414] border border-[#222] rounded-xl px-3 py-2.5 font-mono text-white text-sm select-all truncate">
                      {contact.wechatId}
                    </div>
                    <button
                      onClick={copyId}
                      className="flex-shrink-0 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer"
                      style={{
                        borderColor: copied ? 'rgba(212,245,66,0.5)' : '#222',
                        color: copied ? '#D4F542' : '#555',
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
                    <div className="text-[#444] text-xs leading-relaxed">
                      {lang === 'en'
                        ? 'Scan with WeChat · Send product name · Receive link'
                        : '微信扫码 → 发送资料名称 → 收到下载链接'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Includes */}
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
                      <span className="w-5 h-5 rounded-full bg-[#D4F542]/20 flex items-center justify-center
                                       flex-shrink-0 group-hover/item:bg-[#D4F542]/40 transition-colors duration-200">
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 3" stroke="#D4F542" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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

        {/* Description */}
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

        {/* Notice */}
        <RevealSection delay={100}>
          <div className="mt-10 bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 flex gap-4
                          hover:border-[#D4F542]/20 transition-colors duration-300">
            <span className="text-2xl float-anim-slow">💡</span>
            <div>
              <p className="font-bold mb-1 text-sm">{t(i18n.product.noticeTitle)}</p>
              <p className="text-[#666] text-sm leading-relaxed">{t(i18n.product.noticeText)}</p>
            </div>
          </div>
        </RevealSection>

        {/* More CTA */}
        <RevealSection delay={200}>
          <div className="mt-16 text-center">
            <p className="text-[#555] mb-4 text-sm">{t(i18n.product.moreTitle)}</p>
            <MagneticButton href="/" blob className="btn-accent px-8 py-4 text-base rounded-2xl">
              {t(i18n.product.browseAll)}
            </MagneticButton>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
