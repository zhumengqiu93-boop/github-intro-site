'use client';
import dynamic from 'next/dynamic';

/* Lazy-load heavy canvas effects client-side only */
const FluidCursor = dynamic(() => import('./FluidCursor'), { ssr: false });

export default function ClientEffects() {
  return <FluidCursor />;
}
