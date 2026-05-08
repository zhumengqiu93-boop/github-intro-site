import Link from "next/link";
import { getProductsByCategory, getCategoryBySlug, categories } from "@/lib/products";
import { notFound } from "next/navigation";

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
      <nav className="flex items-center justify-between px-8 py-5 border-b border-[#1E1E1E]">
        <Link href="/" className="text-xl font-black tracking-tight">数字资料站<span className="text-[#D4F542]">。</span></Link>
        <Link href="/" className="text-[#999] text-sm hover:text-white transition-colors">← 返回首页</Link>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{category.emoji}</span>
            <div>
              <p className="text-[#D4F542] text-sm font-bold uppercase tracking-widest mb-1">资料分类</p>
              <h1 className="text-4xl font-black">{category.name}</h1>
            </div>
          </div>
          <p className="text-[#666] mt-2 max-w-xl">{category.desc}</p>
        </div>

        {/* Product Grid */}
        {items.length === 0 ? (
          <div className="text-center py-24 text-[#444]">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-lg">该分类暂无资料，敬请期待！</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="card-hover group rounded-[24px] overflow-hidden border border-[#2A2A2A] bg-[#141414]"
              >
                <div className="h-44 flex items-center justify-center text-6xl relative"
                  style={{ background: product.cover }}>
                  {product.emoji}
                  {product.tag && (
                    <span className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-[#0A0A0A]"
                      style={{ background: product.tagColor }}>
                      {product.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-black text-lg mb-1 group-hover:text-[#D4F542] transition-colors">{product.title}</h3>
                  <p className="text-[#666] text-sm mb-4 line-clamp-2">{product.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-[#D4F542]">¥{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#555] line-through">¥{product.originalPrice}</span>
                      )}
                    </div>
                    <span className="text-xs text-[#555] group-hover:text-[#D4F542] transition-colors">查看详情 →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
