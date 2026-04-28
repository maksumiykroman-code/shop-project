import Link from 'next/link';
import { Container } from '@/components/ui/container';

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Майстерня</h3>
            <p className="text-zinc-500 text-sm leading-relaxed">
              Авторські вироби з гіпсу. Ручна робота та індивідуальний підхід до кожного замовлення.
            </p>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Контакти</h3>
            <ul className="space-y-2 text-sm text-zinc-500">
              <li>Тел: +380 97 000 00 00</li>
              <li>Instagram: @fedorenko_style</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-4 uppercase tracking-widest text-sm">Меню</h3>
            <div className="flex flex-col space-y-2 text-sm text-zinc-500">
              <Link href="/shop" className="hover:text-white transition-colors">Магазин</Link>
              <Link href="/about" className="hover:text-white transition-colors">Про нас</Link>
              <Link href="/dashboard" className="text-[10px] opacity-20 hover:opacity-100 uppercase mt-4">Управління</Link>
            </div>
          </div>
        </div>
        <div className="text-[10px] text-zinc-600 border-t border-white/5 pt-8 text-center uppercase tracking-[0.2em]">
          © 2026 Федоренко Стиль. Всі права захищені.
        </div>
      </Container>
    </footer>
  );
}
