import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';
import { ProductGrid } from '@/components/products/product-grid';
import { getFeaturedProducts } from '@/lib/products';

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <Container className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-950 to-bronze-950 shadow-soft">
        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-5">
            <p className="text-sm font-medium tracking-wide text-bronze-200/90">
              Limited editions • Hand-finished patinas
            </p>
            <h1 className="font-[var(--font-cormorant)] text-4xl font-semibold leading-tight sm:text-5xl">
              Bronze sculptures with
              <span className="text-bronze-200"> gallery-level</span> presence.
            </h1>
            <p className="max-w-prose text-zinc-200/90">
              Collectible works cast in bronze and finished by hand — designed
              to age beautifully and hold their character for decades.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/shop">Browse the shop</ButtonLink>
              <ButtonLink href="/about" variant="secondary">
                About the atelier
              </ButtonLink>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 text-sm text-zinc-200/80">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="font-medium text-zinc-100">Secure packing</p>
                <p className="text-zinc-200/70">Crate-style protection</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="font-medium text-zinc-100">Certificate</p>
                <p className="text-zinc-200/70">Signed authenticity</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <p className="font-medium text-zinc-100">Studio support</p>
                <p className="text-zinc-200/70">Care + display advice</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-gradient-to-tr from-bronze-500/15 via-transparent to-bronze-200/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30">
              <Image
                src="/images/hero-bronze.svg"
                alt="Bronze sculpture hero"
                width={1200}
                height={800}
                priority
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="font-[var(--font-cormorant)] text-3xl font-semibold">
              Featured pieces
            </h2>
            <p className="text-sm text-zinc-300/80">
              A small selection ready to ship.
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-bronze-200 hover:text-bronze-100"
          >
            View all →
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </Container>
  );
}

