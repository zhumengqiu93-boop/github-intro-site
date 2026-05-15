'use client';
import { useState } from 'react';
import type { Product } from '@/lib/products';

interface Props {
  product: Product;
  tag?: string;
  className?: string;
}

/**
 * Renders product.image when available; falls back to gradient + emoji if the
 * image is missing or fails to load.  Used in card thumbnails across the site.
 */
export default function ProductCover({ product, tag, className = '' }: Props) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = !!product.image && !imgFailed;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
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
        <>
          <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">
            {product.emoji}
          </span>
          {/* Shimmer */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                          translate-x-[-100%] group-hover:translate-x-[100%]
                          transition-transform duration-700 skew-x-12" />
        </>
      )}

      {tag && (
        <span
          className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold
                     text-[#0A0A0A] z-10 transition-transform duration-300 group-hover:scale-105"
          style={{ background: product.tagColor }}
        >
          {tag}
        </span>
      )}
    </div>
  );
}
