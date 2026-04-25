import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/lib/products';
import { Price } from '@/components/ui/price';
import { Badge } from '@/components/ui/badge';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:bg-white/10"
    >
      <div className="relative">
        <Image
          src={product.images[0]}
          alt={product.name}
          width={1000}
          height={1000}
          className="h-auto w-full"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge>{product.categoryLabel}</Badge>
          {product.isLimitedEdition ? (
            <Badge variant="emphasis">Limited</Badge>
          ) : null}
        </div>
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 font-medium text-zinc-100 group-hover:text-bronze-200">
            {product.name}
          </h3>
          <Price cents={product.priceCents} className="shrink-0 text-sm" />
        </div>
        <p className="line-clamp-2 text-sm text-zinc-300/80">
          {product.shortDescription}
        </p>
        <p className="text-xs text-zinc-300/60">Ships in {product.shippingWindow}</p>
      </div>
    </Link>
  );
}

