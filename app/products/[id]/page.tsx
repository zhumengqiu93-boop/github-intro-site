import Link from "next/link";
import { getProductById, products } from "@/lib/products";
import { notFound } from "next/navigation";

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
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#1E1E1E]">
        <Link href="/" className="text-xl font-black tracking-tight">数字资料站<span className="text-[#D4F542]">。</span></Link>
        <Link href={`/category/${product.categorySlug}`} className="text-[#999] text-sm hover:text-white transition-colors">
          ← 返回 {product.category}
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Cover */}
          <div>
            <div className="w-full aspect-square rounded-[32px] flex items-center justify-center text-[120px] relative overflow-hidden border border-[#2A2A2A]"
              style={{ background: product.cover }}>
              <span className="relative z-10">{product.emoji}</span>
              {product.tag && (
                <span className="absolute top-6 right-6 px-4 py-1.5 rounded-full text-sm font-bold text-[#0A0A0A]"
                  style={{ background: product.tagColor }}>
                  {product.tag}
                </span>
              )}
            </div>
            {/* Format badge */}
            <div className="mt-4 flex gap-3">
              <span className="px-4 py-2 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] text-sm text-[#999]">
                格式：{product.format}
              </span>
              {product.pages && (
                <span className="px-4 py-2 rounded-full bg-[#1E1E1E] border border-[#2A2A2A] text-sm text-[#999]">
                  {product.pages} 页
                </span>
              )}
            </div>
          </div>

          {/* Right: Info */}
          <div className="sticky top-8">
            <p className="text-[#D4F542] text-sm font-bold uppercase tracking-widest mb-3">{product.category}</p>
            <h1 className="text-4xl font-black mb-2 leading-tight">{product.title}</h1>
            <p className="text-[#666] mb-6">{product.subtitle}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <span className="text-5xl font-black text-[#D4F542]">¥{product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-[#444] line-through">¥{product.originalPrice}</span>
              )}
              {product.originalPrice && (
                <span className="text-sm bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full">
                  省 ¥{product.originalPrice - product.price}
                </span>
              )}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 mb-10">
              <button className="btn-accent w-full py-4 text-lg rounded-2xl font-black">
                立即购买 ¥{product.price}
              </button>
              <button className="btn-outline w-full py-4 text-base rounded-2xl">
                加入收藏
              </button>
            </div>

            {/* Includes */}
            <div className="bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6">
              <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-[#999]">资料包含</h3>
              <ul className="space-y-3">
                {product.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#D4F542]/20 flex items-center justify-center flex-shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#D4F542" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 border-t border-[#1E1E1E] pt-12">
          <h2 className="text-2xl font-black mb-6">资料介绍</h2>
          <p className="text-[#999] leading-relaxed text-lg max-w-3xl">{product.description}</p>
        </div>

        {/* Notice */}
        <div className="mt-10 bg-[#141414] border border-[#2A2A2A] rounded-2xl p-6 flex gap-4">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-bold mb-1 text-sm">购买须知</p>
            <p className="text-[#666] text-sm leading-relaxed">
              购买后将通过邮件发送下载链接，永久有效。本资料仅限个人/商业使用，不可二次销售或分发。如有问题请联系客服。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
