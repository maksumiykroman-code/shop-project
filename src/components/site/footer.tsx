import Link from 'next/link';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-zinc-950 py-12 text-zinc-400">
      <Container>
        <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Магазин
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/shop" className="hover:text-bronze-200 transition-colors">Усі роботи</Link></li>
              <li><Link href="/about" className="hover:text-bronze-200 transition-colors">Про нас</Link></li>
              <li><Link href="/contact" className="hover:text-bronze-200 transition-colors">Контакти</Link></li>
            </ul>
          </div>
        </div>

        {/* Секретна кнопка для входу в адмінку */}
        <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-center">
          <p className="text-xs">© 2026 Майстерня гіпсу</p>
          <Link 
            href="/admin" 
            className="text-[10px] text-zinc-800 hover:text-zinc-500 transition-colors uppercase tracking-widest"
          >
            Управління
          </Link>
        </div>
      </Container>
    </footer>
  );
}
