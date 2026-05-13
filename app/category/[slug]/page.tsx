import { getProductsByCategory, getCategoryBySlug, categories } from "@/lib/products";
import { notFound } from "next/navigation";
import CategoryGrid from "@/app/components/CategoryGrid";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  const items = getProductsByCategory(slug);
  if (!category) notFound();
  return <CategoryGrid category={category} items={items} />;
}
