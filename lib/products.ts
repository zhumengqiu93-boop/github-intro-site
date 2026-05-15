export type Product = {
  id: string;
  title: string;
  subtitle: string;
  subtitleEn: string;
  category: string;
  categoryEn: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  tagEn?: string;
  tagColor?: string;
  cover: string;       // CSS gradient fallback
  image?: string;      // real cover image path (overrides cover + emoji when set)
  images?: string[];   // detail page showcase gallery (multiple images)
  emoji: string;
  description: string;
  descriptionEn: string;
  includes: string[];
  includesEn: string[];
  format: string;
  pages?: number;
};

export type Category = {
  slug: string;
  name: string;
  nameEn: string;
  desc: string;
  descEn: string;
  emoji: string;
  color: string;
  count: number;
};

export const categories: Category[] = [
  {
    slug: "ui-kit",
    name: "UI 组件库", nameEn: "UI Kit",
    desc: "Figma 可编辑组件，覆盖常用场景",
    descEn: "Editable Figma components for common UI scenarios",
    emoji: "🎨", color: "#6750A4", count: 12,
  },
  {
    slug: "template",
    name: "网页模板", nameEn: "Web Templates",
    desc: "开箱即用的落地页与后台模板",
    descEn: "Ready-to-use landing pages and dashboard templates",
    emoji: "🖥️", color: "#D4822A", count: 8,
  },
  {
    slug: "font",
    name: "字体资源", nameEn: "Font Resources",
    desc: "精选中英文商用字体合集",
    descEn: "Curated commercial-use Chinese & English typefaces",
    emoji: "✍️", color: "#2A7D6B", count: 6,
  },
  {
    slug: "illustration",
    name: "插画素材", nameEn: "Illustrations",
    desc: "手绘风 & 扁平风插画 PNG/SVG",
    descEn: "Hand-drawn & flat-style illustrations in PNG/SVG",
    emoji: "🖼️", color: "#7D2A4A", count: 15,
  },
];

export const products: Product[] = [
  {
    id: "1",
    title: "小满节气插画资源包",
    subtitle: "国风节气系列 · 麦穗丰收 · 壁纸 贴纸 钥匙链全套",
    subtitleEn: "Chinese Solar Term · Grain Buds · Wallpapers, Stickers & Keychains",
    category: "插画素材", categoryEn: "Illustrations",
    categorySlug: "illustration",
    price: 49, originalPrice: 99,
    tag: "热卖", tagEn: "Hot", tagColor: "#A855F7",
    cover: "linear-gradient(135deg,#1c2a10,#0f1c08)",
    image: "/covers/小满.png",
    emoji: "🌾",
    description: "以中国传统节气「小满」为主题创作的精美国风插画资源包。麦粒渐满、萤火飞舞，水彩笔触描绘了田野晨光、溪边丰收与月下萤光三幕诗意场景——嬉戏的孩童、金色麦穗与忠实的小狗，共同演绎初夏最温柔的时光。资源涵盖电脑壁纸、手机壁纸、贴纸及钥匙链设计稿，全套商用授权。",
    descriptionEn: "A stunning Chinese traditional illustration pack themed around 'Xiǎomǎn' (Grain Buds). Watercolor scenes depict the golden fields at dawn, a riverside harvest, and firefly-lit evenings — playful children, plump wheat stalks and faithful dogs capture the poetry of early summer. Includes desktop wallpapers, mobile wallpapers, sticker assets and keychain designs. Full commercial license.",
    images: ["/covers/小满.png"],
    includes: [
      "电脑壁纸 × 3张（1920×1080）",
      "手机壁纸 × 3张（1080×1920）",
      "贴纸素材 × 8款（PNG 透明底）",
      "钥匙链设计稿 × 4款（AI / SVG）",
      "提示词文档（中英双语 Prompt PDF）",
      "商用授权证书",
    ],
    includesEn: [
      "Desktop wallpapers × 3 (1920×1080)",
      "Mobile wallpapers × 3 (1080×1920)",
      "Sticker assets × 8 (PNG transparent)",
      "Keychain designs × 4 (AI / SVG)",
      "Prompt document (bilingual PDF)",
      "Commercial license certificate",
    ],
    format: "PNG / AI / SVG",
  },
  {
    id: "2",
    title: "Dashboard Pro",
    subtitle: "数据可视化后台模板",
    subtitleEn: "Data visualization dashboard template",
    category: "网页模板", categoryEn: "Web Templates",
    categorySlug: "template",
    price: 79,
    tag: "新品", tagEn: "New", tagColor: "#42B8F5",
    cover: "linear-gradient(135deg,#0d1117,#1a2744)", emoji: "🖥️",
    description: "专为 SaaS 产品设计的后台管理模板，包含 20+ 页面、图表组件、表单、数据表格。基于 Next.js + Tailwind CSS 开发，代码整洁可直接上线。",
    descriptionEn: "A backend admin template designed for SaaS products. Includes 20+ pages, chart components, forms, and data tables. Built with Next.js + Tailwind CSS — clean code, ready to ship.",
    includes: ["20+ 完整页面", "Next.js 源码", "Tailwind CSS 样式", "图表组件", "响应式适配"],
    includesEn: ["20+ complete pages", "Next.js source code", "Tailwind CSS styles", "Chart components", "Responsive layouts"],
    format: "Next.js / React",
  },
  {
    id: "3",
    title: "Chinese Font Pack Vol.1",
    subtitle: "8款商用授权中文字体",
    subtitleEn: "8 commercial-licensed Chinese typefaces",
    category: "字体资源", categoryEn: "Font Resources",
    categorySlug: "font",
    price: 39, originalPrice: 120,
    tag: "限时", tagEn: "Sale", tagColor: "#F54242",
    cover: "linear-gradient(135deg,#1a0a0a,#2d1010)", emoji: "✍️",
    description: "精选 8 款适合品牌设计、海报制作的商用授权中文字体，风格涵盖现代黑体、宋体、手写体。可商业使用，无需二次授权。",
    descriptionEn: "8 carefully selected commercial-use Chinese typefaces for brand design and poster creation. Styles include modern sans-serif, serif, and handwritten. Commercial use included — no secondary licensing required.",
    includes: ["8款中文字体 TTF/OTF", "商用授权证书", "字体预览手册 PDF", "使用场景示例"],
    includesEn: ["8 Chinese fonts TTF/OTF", "Commercial license certificate", "Font preview handbook PDF", "Usage scenario examples"],
    format: "TTF / OTF",
  },
  {
    id: "4",
    title: "Flat Illustration Pack",
    subtitle: "100张 PNG/SVG 插画",
    subtitleEn: "100 PNG/SVG illustrations",
    category: "插画素材", categoryEn: "Illustrations",
    categorySlug: "illustration",
    price: 29,
    tag: "热卖", tagEn: "Hot", tagColor: "#A855F7",
    cover: "linear-gradient(135deg,#0a1a0a,#102d10)", emoji: "🖼️",
    description: "100 张现代扁平风格插画，覆盖科技、办公、生活、教育等场景。提供 PNG（透明底）和 SVG（矢量可编辑）两种格式，适合网页、PPT、App 设计。",
    descriptionEn: "100 modern flat-style illustrations covering tech, office, lifestyle, and education scenes. Available in PNG (transparent background) and SVG (vector-editable) formats — ideal for websites, presentations, and apps.",
    includes: ["100张 PNG 透明底", "100张 SVG 矢量源文件", "按场景分类整理", "商用授权"],
    includesEn: ["100 PNG transparent files", "100 SVG vector source files", "Organized by scene", "Commercial license"],
    format: "PNG / SVG",
  },
  {
    id: "5",
    title: "Landing Page Bundle",
    subtitle: "5套高转化落地页模板",
    subtitleEn: "5 high-converting landing page templates",
    category: "网页模板", categoryEn: "Web Templates",
    categorySlug: "template",
    price: 59,
    cover: "linear-gradient(135deg,#1a0d00,#2d1a00)", emoji: "🚀",
    description: "5套面向不同行业（SaaS、电商、教育、医疗、金融）的落地页模板，设计精美、布局合理，已验证高转化率。提供 Figma 设计稿和 HTML/CSS 源码。",
    descriptionEn: "5 landing page templates for different industries (SaaS, e-commerce, education, healthcare, finance). Beautiful design, proven high conversion. Includes both Figma source files and HTML/CSS code.",
    includes: ["5套完整模板", "Figma 设计源文件", "HTML/CSS 源码", "移动端适配", "SEO 优化结构"],
    includesEn: ["5 complete templates", "Figma design source files", "HTML/CSS source code", "Mobile responsive", "SEO-optimized structure"],
    format: "Figma + HTML",
  },
  {
    id: "6",
    title: "App Icon System",
    subtitle: "600+ 线性 & 填充图标",
    subtitleEn: "600+ line & filled icons",
    category: "UI 组件库", categoryEn: "UI Kit",
    categorySlug: "ui-kit",
    price: 35,
    cover: "linear-gradient(135deg,#0a0a1a,#10102d)", emoji: "✨",
    description: "600+ 个精心绘制的图标，线性和填充两种风格，覆盖通用、商业、媒体、设备等类别。所有图标均为 24×24px 基准，支持任意尺寸缩放。",
    descriptionEn: "600+ carefully drawn icons in both line and filled styles, covering general, business, media, and device categories. All icons are based on 24×24px for perfect scaling at any size.",
    includes: ["600+ SVG 图标", "Figma 组件版", "PNG 批量导出（多尺寸）", "图标索引手册"],
    includesEn: ["600+ SVG icons", "Figma component library", "PNG batch export (multi-size)", "Icon index handbook"],
    format: "SVG / Figma",
  },
];

export function getProductsByCategory(slug: string) {
  return products.filter(p => p.categorySlug === slug);
}
export function getProductById(id: string) {
  return products.find(p => p.id === id);
}
export function getCategoryBySlug(slug: string) {
  return categories.find(c => c.slug === slug);
}
