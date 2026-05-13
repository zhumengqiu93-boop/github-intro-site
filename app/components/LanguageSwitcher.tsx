'use client';
import { useLang } from './LanguageContext';

export default function LanguageSwitcher() {
  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      aria-label="Switch language"
      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-[#2A2A2A]
                 text-[11px] font-bold uppercase tracking-wider
                 hover:border-[#D4F542]/50 transition-all duration-200 cursor-pointer"
    >
      <span className={lang === 'en' ? 'text-white' : 'text-[#444]'}>EN</span>
      <span className="text-[#333] mx-0.5">/</span>
      <span className={lang === 'zh' ? 'text-white' : 'text-[#444]'}>中</span>
    </button>
  );
}
