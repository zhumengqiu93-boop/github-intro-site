'use client';
import { useState } from 'react';
import Link from 'next/link';
import QRCode from 'react-qr-code';
import { contact } from '@/lib/contact';
import { i18n, tr } from '@/lib/i18n';
import { useLang } from '@/app/components/LanguageContext';
import LanguageSwitcher from '@/app/components/LanguageSwitcher';
import MagneticButton   from '@/app/components/MagneticButton';
import RevealSection    from '@/app/components/RevealSection';

export default function ContactPage() {
  const { lang } = useLang();
  const t = (e: { en: string; zh: string }) => tr(e, lang);
  const [copied, setCopied] = useState(false);

  const copyId = () => {
    navigator.clipboard.writeText(contact.wechatId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] overflow-x-hidden">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between
                      px-4 md:px-8 py-3 md:py-4 border-b border-[#1A1A1A] bg-[#0A0A0A]/90 backdrop-blur-md">
        <Link href="/" className="flex items-baseline gap-1 group whitespace-nowrap">
          <span className="text-base md:text-lg font-black tracking-tight">
            {lang === 'en' ? 'Design Resources' : '数字资料站'}
          </span>
          <span className="text-[#A855F7] text-base md:text-lg font-black inline-block
                           group-hover:rotate-12 transition-transform duration-300">。</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link href="/" className="text-[#999] text-sm hover:text-white transition-colors">
            ← {lang === 'en' ? 'Back' : '返回'}
          </Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-5 md:px-8 pt-28 pb-20">

        {/* Header */}
        <RevealSection variant="blur">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#444]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#999]">
              {t(i18n.contact.enLabel)}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">
            {t(i18n.contact.pageTitle)}
          </h1>
          <p className="text-[#999] text-base leading-relaxed mb-12">{t(i18n.contact.subtitle)}</p>
        </RevealSection>

        {/* Main contact card */}
        <RevealSection delay={100} variant="scale">
          <div className="rounded-[28px] border border-[#1E1E1E] bg-[#0E0E0E] overflow-hidden">

            {/* Card header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#181818]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28CA42]" />
              </div>
              <span className="text-[11px] text-[#666] font-mono uppercase tracking-widest">contact.info</span>
              <span className="w-5 h-5 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7]" />
              </span>
            </div>

            {/* Profile row */}
            <div className="px-6 py-6 border-b border-[#141414]">
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#A855F7]/20 to-[#4ECFFF]/20
                                  border border-[#A855F7]/20 flex items-center justify-center text-3xl">
                    🎨
                  </div>
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#A855F7] border-2 border-[#0E0E0E]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-black text-white text-lg">
                    {lang === 'en' ? contact.name : contact.nameZh}
                  </div>
                  <div className="text-[#888] text-xs mt-0.5 font-mono">UI/UX Designer · Creator</div>
                </div>
                <div className="flex-shrink-0 px-3 py-1 rounded-full bg-[#A855F7]/10 border border-[#A855F7]/20
                                text-[#A855F7] text-xs font-bold">
                  {lang === 'en' ? 'Open' : '开放合作'}
                </div>
              </div>
            </div>

            {/* WeChat ID row */}
            <div className="px-6 py-5 border-b border-[#141414]">
              <div className="text-[11px] text-[#888] font-mono uppercase tracking-widest mb-3">
                {t(i18n.contact.wechatLabel)}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-[#141414] border border-[#222] rounded-xl px-4 py-3 font-mono text-white text-base select-all">
                  {contact.wechatId}
                </div>
                <button
                  onClick={copyId}
                  className="flex-shrink-0 px-4 py-3 rounded-xl border transition-all duration-200 text-sm font-bold
                             cursor-pointer select-none
                             hover:border-[#A855F7]/40 hover:text-[#A855F7]"
                  style={{
                    borderColor: copied ? 'rgba(168,85,247,0.5)' : '#222',
                    color: copied ? '#A855F7' : '#666',
                  }}
                >
                  {copied ? t(i18n.contact.copied) : t(i18n.contact.copy)}
                </button>
              </div>
            </div>

            {/* QR Code */}
            <div className="px-6 py-8 flex flex-col items-center gap-4">
              <div className="text-[11px] text-[#888] font-mono uppercase tracking-widest self-start">
                {t(i18n.contact.scanHint)}
              </div>
              <div className="p-5 bg-white rounded-2xl shadow-lg shadow-black/40">
                <QRCode
                  value={contact.wechatQrValue}
                  size={180}
                  fgColor="#0A0A0A"
                  bgColor="#ffffff"
                  style={{ display: 'block' }}
                />
              </div>
              <p className="text-[#888] text-xs text-center max-w-[220px] leading-relaxed">
                {t(i18n.contact.scanHint)} — WeChat ID: <span className="text-[#A855F7]">{contact.wechatId}</span>
              </p>
            </div>

            {/* Info row */}
            <div className="grid grid-cols-2 border-t border-[#141414]">
              <div className="px-6 py-4 border-r border-[#141414]">
                <div className="text-[10px] text-[#666] font-mono uppercase tracking-wider mb-1">Response</div>
                <div className="text-sm text-[#999]">{t(i18n.contact.responseTime)}</div>
              </div>
              <div className="px-6 py-4">
                <div className="text-[10px] text-[#666] font-mono uppercase tracking-wider mb-1">Hours</div>
                <div className="text-sm text-[#999]">{t(i18n.contact.workingHours)}</div>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* CTA back */}
        <RevealSection delay={200}>
          <div className="mt-10 text-center">
            <MagneticButton href="/" blob className="btn-accent px-8 py-3.5 text-sm">
              {lang === 'en' ? 'Browse Resources →' : '浏览全部资料 →'}
            </MagneticButton>
          </div>
        </RevealSection>

      </div>
    </div>
  );
}
