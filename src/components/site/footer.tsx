import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950/70">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div className="space-y-2">
          <p className="font-[var(--font-cormorant)] text-2xl font-semibold">
            Bronze Atelier
          </p>
          <p className="text-sm text-zinc-300/70">
            A Next.js + Tailwind storefront template for bronze sculpture
            studios.
          </p>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium">Shop</p>
          <div className="grid gap-1 text-zinc-300/80">
            <Link href="/shop" className="hover:text-white">
              All pieces
            </Link>
            <Link href="/about" className="hover:text-white">
              About
            </Link>
            <Link href="/contact" className="hover:text-white">
              Contact
            </Link>
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <p className="font-medium">Care</p>
          <p className="text-zinc-300/70">
            Dust with a soft cloth. Avoid abrasive cleaners. Wax occasionally
            for high-touch displays.
          </p>
          <p className="text-xs text-zinc-300/60">
            © {new Date().getFullYear()} Bronze Atelier. Demo content only.
          </p>
        </div>
      </div>
    </footer>
  );
}

