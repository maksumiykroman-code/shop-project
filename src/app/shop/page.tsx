import { Container } from '@/components/ui/container';
import { ShopFilters } from '@/components/shop/shop-filters';
import { ProductGrid } from '@/components/products/product-grid';
import { getProducts, type ProductCategory } from '@/lib/products';

export default function ShopPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const categoryParam = searchParams?.category;
  const category = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
  const sortParam = searchParams?.sort;
  const sort = Array.isArray(sortParam) ? sortParam[0] : sortParam;

  const products = getProducts({
    category: (category as ProductCategory | undefined) ?? undefined,
    sort: typeof sort === 'string' ? sort : undefined,
  });

  return (
    <Container className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-[var(--font-cormorant)] text-4xl font-semibold">
          Shop
        </h1>
        <p className="max-w-prose text-zinc-300/80">
          Browse figurative studies, wildlife guardians, and contemporary bronze
          forms — each with hand-finished patina.
        </p>
      </div>

      <ShopFilters />
      <ProductGrid products={products} />
    </Container>
  );
}

