import { getAllProducts } from "@/lib/shop";
import ProductGrid from "@/components/products/product-grid";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await searchParams;
  const products = await getAllProducts();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      <ProductGrid products={products} />
    </div>
  );
}

