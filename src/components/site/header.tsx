import Link from 'next/link';
import { CartSummaryButton } from '@/components/cart/cart-summary-button';

const nav = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group inline-flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-bronze-100">
            BA
          </span>
          <span className="font-[var(--font-cormorant)] text-xl font-semibold text-zinc-100 group-hover:text-bronze-200">
            Bronze Atelier
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-zinc-200/80 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="hidden rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-zinc-100 hover:bg-white/10 sm:inline-flex"
          >
            Browse
          </Link>
          <CartSummaryButton />
        </div>
      </div>
    </header>
  );
}

