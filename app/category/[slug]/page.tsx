import Link from "next/link";
import { getProductsByCategory, getCategoryBySlug, categories } from "@/lib/products";
import { notFound } from "next/navigation";
import TiltCard from "@/app/components/TiltCard";
import RevealSection from "@/app/components/RevealSection";
import SplitText from "@/app/components/SplitText";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const items = getProductsByCategory(slug);
  if (!category) notFound();

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#1E1E1E]
                      sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md">
        <Link href="/" className="text-xl font-black tracking-tight group">
          数字资料站<span className="text-[#D4F542] inline-block group-hover:rotate-12 transition-transform duration-300">。</span>
        </Link>
        <Link href="/" className="text-[#999] text-sm hover:text-white transition-colors link-arrow">← 返回首页</Link>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <RevealSection variant="scale">
              <span className="text-5xl float-anim">{category.emoji}</span>
            </RevealSection>
            <div>
              <RevealSection variant="left">
                <p className="text-[#D4F542] text-sm font-bold uppercase tracking-widest mb-1">资料分类</p>
              </RevealSection>
              <h1 className="text-4xl font-black">
                <SplitText delay={60} stagger={45}>{category.name}</SplitText>
              </h1>
            </div>
          </div>
          <RevealSection delay={200} variant="blur">
            <p className="text-[#666] mt-2 max-w-xl">{category.desc}</p>
          </RevealSection>
        </div>

        {/* Product Grid */}
        {items.length === 0 ? (
          <RevealSection>
            <div className="text-center py-24 text-[#444]">
              <div className="text-6xl mb-4 float-anim">📦</div>
              <p className="text-lg">该分类暂无资料，敬请期待！</p>
            </div>
          </RevealSection>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((product, i) => (
              <RevealSection key={product.id} delay={i * 90}>
                <TiltCard className="card-hover card-stack rounded-[24px] h-full">
                  <Link
                    href={`/products/${product.id}`}
                    className="group relative rounded-[24px] overflow-hidden border border-[#2A2A2A] bg-[#141414] block h-full"
                  >
                    <div className="h-44 flex items-center justify-center text-6xl relative overflow-hidden"
                         style={{ background: product.cover }}>
                      <span className="transition-transform duration-500 group-hover:scale-110">
                        {product.emoji}
                      </span>
                      {product.tag && (
                        <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-[#0A0A0A]
                                         transition-transform duration-300 group-hover:scale-105"
                              style={{ background: product.tagColor }}>
                          {product.tag}
                        </span>
                      )}
                      {/* Shimmer */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
                                      translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                    </div>
                    <div className="p-5">
                      <h3 className="font-black text-lg mb-1 group-hover:text-[#D4F542] transition-colors duration-300">
                        {product.title}
                      </h3>
                      <p className="text-[#666] text-sm mb-4 line-clamp-2">{product.subtitle}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-black text-[#D4F542]">¥{product.price}</span>
                          {product.originalPrice && (
                            <span className="text-xs text-[#555] line-through">¥{product.originalPrice}</span>
                          )}
                        </div>
                        <span className="text-xs text-[#555] group-hover:text-[#D4F542] link-arrow transition-colors duration-200">
                          查看详情 →
                        </span>
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </RevealSection>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
