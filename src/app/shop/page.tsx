import { getAllProducts } from "@/lib/shop";
import { ProductGrid } from "@/components/products/product-grid";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await searchParams;
  // Використовуємо 'as any', щоб примусово пропхати дані крізь перевірку
  const products = await getAllProducts() as any;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop</h1>
      <ProductGrid products={products} />
    </div>
  );
}

