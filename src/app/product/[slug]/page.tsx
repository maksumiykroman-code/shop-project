import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToCartButton } from '@/components/cart/add-to-cart-button';
import { Container } from '@/components/ui/container';
import { Price } from '@/components/ui/price';
import { Badge } from '@/components/ui/badge';
import { getAllProductSlugs, getProductBySlug } from '@/lib/products';

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();

  return (
    <Container className="space-y-8">
      <nav className="text-sm text-zinc-300/80">
        <Link href="/shop" className="hover:text-zinc-100">
          Shop
        </Link>{' '}
        <span className="px-1 text-zinc-500">/</span>
        <span className="text-zinc-200">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={1200}
              height={1200}
              className="h-auto w-full"
              priority
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.slice(0, 3).map((src) => (
              <div
                key={src}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <Image
                  src={src}
                  alt={`${product.name} preview`}
                  width={500}
                  height={500}
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{product.categoryLabel}</Badge>
              {product.isLimitedEdition ? (
                <Badge variant="emphasis">Limited edition</Badge>
              ) : null}
              {product.inStock ? (
                <Badge variant="success">In stock</Badge>
              ) : (
                <Badge variant="muted">Made to order</Badge>
              )}
            </div>
            <h1 className="font-[var(--font-cormorant)] text-4xl font-semibold">
              {product.name}
            </h1>
            <p className="text-zinc-200/90">{product.shortDescription}</p>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-4 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div>
              <p className="text-xs uppercase tracking-wide text-zinc-300/70">
                Price
              </p>
              <Price cents={product.priceCents} className="text-2xl" />
              <p className="text-sm text-zinc-300/70">
                Ships in {product.shippingWindow}
              </p>
            </div>
            <AddToCartButton product={product} />
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Details</h2>
            <div className="grid gap-3 rounded-3xl border border-white/10 bg-black/20 p-5 text-sm text-zinc-200/85 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-300/70">
                  Dimensions
                </p>
                <p>{product.dimensions}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-300/70">
                  Finish
                </p>
                <p>{product.patina}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-300/70">
                  Weight
                </p>
                <p>{product.weight}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-zinc-300/70">
                  Edition
                </p>
                <p>{product.edition}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold">Story</h2>
            <p className="text-zinc-200/85">{product.longDescription}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}

