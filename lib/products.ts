export type Product = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  categorySlug: string;
  price: number;
  originalPrice?: number;
  tag?: string;
  tagColor?: string;
  cover: string;        // gradient or color
  emoji: string;
  description: string;
  includes: string[];
  format: string;
  pages?: number;
};

export type Category = {
  slug: string;
  name: string;
  desc: string;
  emoji: string;
  color: string;
  count: number;
};

export const categories: Category[] = [
  { slug: "ui-kit",      name: "UI 组件库",   desc: "Figma 可编辑组件，覆盖常用场景",   emoji: "🎨", color: "#6750A4", count: 12 },
  { slug: "template",    name: "网页模板",     desc: "开箱即用的落地页与后台模板",        emoji: "🖥️", color: "#D4822A", count: 8  },
  { slug: "font",        name: "字体资源",     desc: "精选中英文商用字体合集",            emoji: "✍️", color: "#2A7D6B", count: 6  },
  { slug: "illustration",name: "插画素材",     desc: "手绘风 & 扁平风插画 PNG/SVG",      emoji: "🖼️", color: "#7D2A4A", count: 15 },
];

export const products: Product[] = [
  {
    id: "1",
    title: "Material 3 UI Kit",
    subtitle: "完整的 M3 设计系统",
    category: "UI 组件库",
    categorySlug: "ui-kit",
    price: 49,
    originalPrice: 99,
    tag: "热卖",
    tagColor: "#D4F542",
    cover: "linear-gradient(135deg,#1a1a2e,#16213e)",
    emoji: "🎨",
    description: "基于 Google Material Design 3 规范构建的完整 Figma 组件库，包含 200+ 可编辑组件、完整颜色系统、字体规范、图标库。适合 App 设计、Web 设计及设计系统搭建。",
    includes: ["200+ Figma 组件","完整颜色 Token","Light / Dark 双主题","图标库 500+","使用文档 PDF"],
    format: "Figma (.fig)",
    pages: 80,
  },
  {
    id: "2",
    title: "Dashboard Pro 模板",
    subtitle: "数据可视化后台模板",
    category: "网页模板",
    categorySlug: "template",
    price: 79,
    tag: "新品",
    tagColor: "#42B8F5",
    cover: "linear-gradient(135deg,#0d1117,#1a2744)",
    emoji: "🖥️",
    description: "专为 SaaS 产品设计的后台管理模板，包含 20+ 页面、图表组件、表单、数据表格。基于 Next.js + Tailwind CSS 开发，代码整洁可直接上线。",
    includes: ["20+ 完整页面","Next.js 源码","Tailwind CSS 样式","图表组件","响应式适配"],
    format: "Next.js / React",
  },
  {
    id: "3",
    title: "中文字体合集 Vol.1",
    subtitle: "8款商用授权中文字体",
    category: "字体资源",
    categorySlug: "font",
    price: 39,
    originalPrice: 120,
    tag: "限时",
    tagColor: "#F54242",
    cover: "linear-gradient(135deg,#1a0a0a,#2d1010)",
    emoji: "✍️",
    description: "精选 8 款适合品牌设计、海报制作的商用授权中文字体，风格涵盖现代黑体、宋体、手写体。可商业使用，无需二次授权。",
    includes: ["8款中文字体 TTF/OTF","商用授权证书","字体预览手册 PDF","使用场景示例"],
    format: "TTF / OTF",
  },
  {
    id: "4",
    title: "扁平插画素材包",
    subtitle: "100张 PNG/SVG 插画",
    category: "插画素材",
    categorySlug: "illustration",
    price: 29,
    tag: "热卖",
    tagColor: "#D4F542",
    cover: "linear-gradient(135deg,#0a1a0a,#102d10)",
    emoji: "🖼️",
    description: "100 张现代扁平风格插画，覆盖科技、办公、生活、教育等场景。提供 PNG（透明底）和 SVG（矢量可编辑）两种格式，适合网页、PPT、App 设计。",
    includes: ["100张 PNG 透明底","100张 SVG 矢量源文件","按场景分类整理","商用授权"],
    format: "PNG / SVG",
  },
  {
    id: "5",
    title: "Landing Page 模板集",
    subtitle: "5套高转化落地页模板",
    category: "网页模板",
    categorySlug: "template",
    price: 59,
    cover: "linear-gradient(135deg,#1a0d00,#2d1a00)",
    emoji: "🚀",
    description: "5套面向不同行业（SaaS、电商、教育、医疗、金融）的落地页模板，设计精美、布局合理，已验证高转化率。提供 Figma 设计稿和 HTML/CSS 源码。",
    includes: ["5套完整模板","Figma 设计源文件","HTML/CSS 源码","移动端适配","SEO 优化结构"],
    format: "Figma + HTML",
  },
  {
    id: "6",
    title: "App 图标设计系统",
    subtitle: "600+ 线性 & 填充图标",
    category: "UI 组件库",
    categorySlug: "ui-kit",
    price: 35,
    cover: "linear-gradient(135deg,#0a0a1a,#10102d)",
    emoji: "✨",
    description: "600+ 个精心绘制的图标，线性和填充两种风格，覆盖通用、商业、媒体、设备等类别。所有图标均为 24×24px 基准，支持任意尺寸缩放。",
    includes: ["600+ SVG 图标","Figma 组件版","PNG 批量导出（多尺寸）","图标索引手册"],
    format: "SVG / Figma",
  },
];

export function getProductsByCategory(slug: string) {
  return products.filter((p) => p.categorySlug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
