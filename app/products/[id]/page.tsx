import Link from "next/link";
import { getProductById, products } from "@/lib/products";
import { notFound } from "next/navigation";
import RevealSection from "@/app/components/RevealSection";
import MagneticButton from "@/app/components/MagneticButton";
import SplitText from "@/app/components/SplitText";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#1E1E1E] sticky top-0 z-50
                      bg-[#0A0A0A]/90 backdrop-blur-md">
        <Link href="/" className="text-xl font-black tracking-tight group">
          数字资料站<span className="text-[#D4F542] inline-block group-hover:rotate-12 transition-transform duration-300">。</span>
        </Link>
        <Link href={`/category/${product.categorySlug}`}
              className="text-[#999] text-sm hover:text-white transition-colors link-arrow">
          ← 返回 {product.category}
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left: Cover */}
          <RevealSection delay={0}>
            <div>
              <div className="w-full aspect-square rounded-[32px] flex items-center justify-center text-[120px]
                              relative overflow-hidden border border-[#2A2A2A] group cursor-pointer"
                   style={{ background: product.cover }}>
                <span className="relative z-10 transition-transform duration-500 group-hover:scale-110">
                  {product.emoji}
                </span>
                {product.tag && (
                  <span className="absolute top-6 right-6 px-4 py-1.5 rounded-full text-sm font-bold text-[#0A0A0A]
                                   transition-transform duration-300 group-hover:scale-105"
                        style={{ background: product.tagColor }}>
                    {product.tag}
                  </span>
                )}
                {/* Shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/12 to-transparent
                                translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
              </div>

              {/* Format badge */}
              <div className="mt-4 flex gap-3">
                <span className="px-4 py-2 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] text-sm text-[#999]
                                 tag-hover cursor-default">
                  格式：{product.format}
                </span>
                {product.pages && (
                  <span className="px-4 py-2 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] text-sm text-[#999]
                                   tag-hover cursor-default">
                    {product.pages} 页
                  </span>
                )}
              </div>
            </div>
          </RevealSection>

          {/* Right: Info */}
          <RevealSection delay={120}>
            <div className="sticky top-24">
              <RevealSection variant="left">
                <p className="text-[#D4F542] text-sm font-bold uppercase tracking-widest mb-3">{product.category}</p>
              </RevealSection>
              <h1 className="text-4xl font-black mb-2 leading-tight">
                <SplitText delay={80} stagger={40}>{product.title}</SplitText>
              </h1>
              <RevealSection delay={200} variant="blur">
                <p className="text-[#666] mb-6">{product.subtitle}</p>
              </RevealSection>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-8">
                <span className="text-5xl font-black text-[#D4F542] tabular-nums">¥{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-[#444] line-through">¥{product.originalPrice}</span>
                )}
                {product.originalPrice && (
                  <span className="text-sm bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full animate-pulse">
                    省 ¥{product.originalPrice - product.price}
                  </span>
                )}
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 mb-10">
                {/* Premium rotating-border buy button */}
                <MagneticButton blob className="btn-premium w-full py-4 text-lg rounded-2xl font-black relative overflow-hidden">
                  立即购买 ¥{product.price}
                </MagneticButton>

                <MagneticButton blob className="btn-outline w-full py-4 text-base rounded-2xl">
                  <span className="flex items-center justify-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 1l2.09 4.26L15 6.27l-3.5 3.41.83 4.82L8 12.25l-4.33 2.25.83-4.82L1 6.27l4.91-.01L8 1z"
                            stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                    </svg>
                    加入收藏
                  </span>
                </MagneticButton>
              </div>

              {/* Includes */}
              <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
                <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-[#999]">资料包含</h3>
                <ul className="space-y-3">
                  {product.includes.map((item, idx) => (
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
              <SplitText delay={0} stagger={50}>资料介绍</SplitText>
            </h2>
            <RevealSection delay={100} variant="blur">
              <p className="text-[#999] leading-relaxed text-lg max-w-3xl">{product.description}</p>
            </RevealSection>
          </div>
        </RevealSection>

        {/* Notice */}
        <RevealSection delay={100}>
          <div className="mt-10 bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 flex gap-4
                          hover:border-[#D4F542]/20 transition-colors duration-300">
            <span className="text-2xl float-anim-slow">💡</span>
            <div>
              <p className="font-bold mb-1 text-sm">购买须知</p>
              <p className="text-[#666] text-sm leading-relaxed">
                购买后将通过邮件发送下载链接，永久有效。本资料仅限个人/商业使用，不可二次销售或分发。如有问题请联系客服。
              </p>
            </div>
          </div>
        </RevealSection>

        {/* More products CTA */}
        <RevealSection delay={200}>
          <div className="mt-16 text-center">
            <p className="text-[#555] mb-4 text-sm">还有更多优质资料等你发现</p>
            <MagneticButton href="/category/ui-kit" className="btn-accent px-8 py-4 text-base rounded-2xl">
              浏览全部资料 →
            </MagneticButton>
          </div>
        </RevealSection>
      </div>
    </div>
  );
}
