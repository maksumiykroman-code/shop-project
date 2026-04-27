import { getProductBySlug } from "@/lib/shop";
import { notFound } from "next/navigation";
import ProductPageContent from "@/components/products/product-page-content";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <ProductPageContent product={product} />;
}
