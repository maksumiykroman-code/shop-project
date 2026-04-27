import Link from 'next/link';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 py-12 text-zinc-400">
      <Container>
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Ліва частина з назвою "Бронзова майстерня" видалена */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Магазин
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-bronze-200">Усі роботи</Link></li>
              <li><Link href="/about" className="hover:text-bronze-200">Про нас</Link></li>
              <li><Link href="/contact" className="hover:text-bronze-200">Контакти</Link></li>
            </ul>
          </div>
          {/* Права частина з "Доглядом" та копірайтом видалена */}
        </div>
      </Container>
    </footer>
  );
}
