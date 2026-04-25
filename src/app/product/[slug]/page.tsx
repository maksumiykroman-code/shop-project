import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductPageContent from "@/components/products/product-page-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  // Очікуємо (await) параметри, як того вимагає Next.js 15
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageContent product={product} />;
}
