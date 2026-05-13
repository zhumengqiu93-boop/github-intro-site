'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Lang } from '@/lib/i18n';

interface LangCtx { lang: Lang; toggle: () => void }

const Ctx = createContext<LangCtx>({ lang: 'en', toggle: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const saved = localStorage.getItem('site-lang') as Lang;
    if (saved === 'en' || saved === 'zh') setLang(saved);
  }, []);

  const toggle = () =>
    setLang(prev => {
      const next: Lang = prev === 'en' ? 'zh' : 'en';
      localStorage.setItem('site-lang', next);
      return next;
    });

  return <Ctx.Provider value={{ lang, toggle }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
