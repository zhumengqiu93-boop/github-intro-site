import Link from "next/link";
import { categories, products } from "@/lib/products";

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* ── Nav ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 border-b border-[#1E1E1E] bg-[#0A0A0A]/90 backdrop-blur-md">
        <span className="text-xl font-black tracking-tight">数字资料站<span className="text-[#D4F542]">。</span></span>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#999]">
          <Link href="#about" className="hover:text-white transition-colors">关于我</Link>
          <Link href="#categories" className="hover:text-white transition-colors">资料分类</Link>
          <Link href="#products" className="hover:text-white transition-colors">精选资料</Link>
        </div>
        <a href="#products" className="btn-accent px-5 py-2 text-sm">浏览全部</a>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center pt-20 overflow-hidden">
        {/* bg decoration */}
        <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#D4F542]/5 blur-[120px] pointer-events-none" />
        <div className="absolute top-60 left-20 w-[180px] h-[180px] rounded-[28px] bg-[#1E1E1E] border border-[#2A2A2A] rotate-[-8deg] overflow-hidden opacity-60">
          <div className="w-full h-full flex items-center justify-center text-5xl">🎨</div>
        </div>
        <div className="absolute top-48 right-16 w-[160px] h-[160px] rounded-[28px] bg-[#1E1E1E] border border-[#2A2A2A] rotate-[6deg] overflow-hidden opacity-60">
          <div className="w-full h-full flex items-center justify-center text-5xl">🖥️</div>
        </div>

        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2A2A2A] text-sm text-[#999] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#D4F542] animate-pulse"></span>
            正在上新 · 本周新增 6 款资料
          </div>
          <h1 className="text-6xl md:text-8xl font-black leading-[1.05] mb-6">
            精选<span className="text-[#D4F542]">数字</span><br />资料商店
          </h1>
          <p className="text-lg text-[#999] max-w-xl mx-auto mb-10 leading-relaxed">
            UI 组件库、网页模板、字体素材、插画资源<br />即买即用，为你的设计提速。
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <a href="#categories" className="btn-accent px-8 py-4 text-base">探索资料分类 →</a>
            <a href="#about" className="btn-outline px-8 py-4 text-base">了解作者</a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#444] text-xs animate-bounce">
          <span>向下滚动</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-[#D4F542] text-sm font-bold uppercase tracking-widest mb-4">关于我</p>
            <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              你好，我是<br /><span className="text-[#D4F542]">一名设计师</span><br />也是资料创作者。
            </h2>
            <p className="text-[#999] leading-relaxed mb-6">
              专注 UI/UX 设计领域 5 年，曾服务多家互联网公司。我把自己在工作中积累的设计资产、模板和工具整理成资料包，帮助更多设计师提效。
            </p>
            <p className="text-[#999] leading-relaxed mb-8">
              所有资料均由我亲自制作，注重实用性与品质，每一份都经过真实项目验证。
            </p>
            <div className="flex gap-8">
              {[["50+","发布资料"],["3000+","付费用户"],["4.9","平均评分"]].map(([num, label]) => (
                <div key={label}>
                  <div className="text-3xl font-black text-[#D4F542]">{num}</div>
                  <div className="text-sm text-[#666] mt-1">{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="w-full aspect-square rounded-[32px] bg-[#141414] border border-[#2A2A2A] flex items-center justify-center overflow-hidden">
              <div className="text-[120px]">👩‍🎨</div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#D4F542] text-[#0A0A0A] rounded-2xl p-4 font-black">
              <div className="text-2xl">5年+</div>
              <div className="text-xs font-medium">设计经验</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section id="categories" className="px-6 py-24 bg-[#0D0D0D]">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#D4F542] text-sm font-bold uppercase tracking-widest mb-3">资料分类</p>
              <h2 className="text-4xl font-black">找到你需要的资源</h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="card-hover group relative bg-[#141414] border border-[#2A2A2A] rounded-[24px] p-6 flex flex-col gap-4 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `radial-gradient(circle at 30% 30%, ${cat.color}18, transparent 70%)` }} />
                <div className="text-4xl">{cat.emoji}</div>
                <div>
                  <div className="font-bold text-lg mb-1">{cat.name}</div>
                  <div className="text-[#666] text-sm leading-relaxed">{cat.desc}</div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-[#2A2A2A]">
                  <span className="text-xs text-[#555]">{cat.count} 款资料</span>
                  <span className="text-[#D4F542] text-sm group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section id="products" className="px-6 py-24 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-[#D4F542] text-sm font-bold uppercase tracking-widest mb-3">精选资料</p>
            <h2 className="text-4xl font-black">本周热门推荐</h2>
          </div>
          <Link href="/category/ui-kit" className="btn-outline px-5 py-2 text-sm hidden md:block">查看全部</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featured.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="card-hover group relative rounded-[24px] overflow-hidden border border-[#2A2A2A] bg-[#141414]"
            >
              {/* Cover */}
              <div className="h-52 flex items-center justify-center text-7xl relative overflow-hidden"
                style={{ background: product.cover }}>
                <span className="relative z-10">{product.emoji}</span>
                {product.tag && (
                  <span className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-[#0A0A0A]"
                    style={{ background: product.tagColor }}>
                    {product.tag}
                  </span>
                )}
              </div>
              {/* Info */}
              <div className="p-6">
                <div className="text-xs text-[#666] mb-2">{product.category}</div>
                <h3 className="font-black text-xl mb-1 group-hover:text-[#D4F542] transition-colors">{product.title}</h3>
                <p className="text-[#666] text-sm mb-4 line-clamp-2">{product.subtitle}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-[#D4F542]">¥{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-[#555] line-through">¥{product.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-sm text-[#555] group-hover:text-[#D4F542] transition-colors">查看详情 →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#1E1E1E] px-6 py-12 text-center text-[#444] text-sm">
        <p className="text-xl font-black text-white mb-2">数字资料站<span className="text-[#D4F542]">。</span></p>
        <p>© 2025 数字资料站 · 所有资料均为原创，商用须授权</p>
      </footer>
    </div>
  );
}
