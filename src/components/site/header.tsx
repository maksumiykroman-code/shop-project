import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ShoppingCart } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-black/60 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex flex-col">
            {/* Напис "Бакалавр мистецтв" видалено повністю */}
            <span className="font-[var(--font-cormorant)] text-xl font-bold tracking-tight text-white transition-colors group-hover:text-bronze-200">
              Майстерня гіпсу
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link href="/shop" className="hover:text-white transition-colors">Магазин</Link>
            <Link href="/about" className="hover:text-white transition-colors">Про нас</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Контакти</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors">
            <ShoppingCart className="h-4 w-4" />
            <span>Кошик</span>
            <span className="ml-1 rounded-full bg-bronze-500 px-1.5 py-0.5 text-[10px] font-bold text-black">
              0
            </span>
          </Link>
        </div>
      </Container>
    </header>
  );
}
