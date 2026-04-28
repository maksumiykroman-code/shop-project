import { Container } from '@/components/ui/container';
import { ProductCard } from '@/components/site/product-card';

export default function HomePage() {
  return (
    <main className="bg-black min-h-screen pt-24">
      <Container>
        {/* Головний блок */}
        <div className="mb-24">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-[var(--font-cormorant)]">
            Федоренко Стиль
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Авторські вироби з гіпсу з ручною обробкою — створені, щоб з роками набувати особливого шарму та незмінно зберігати свій характер десятиліттями.
          </p>
        </div>

        {/* Блок товарів */}
        <section>
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-bold text-white font-[var(--font-cormorant)] text-bronze-200">
              Мої роботи
            </h2>
            <span className="text-zinc-500 text-sm uppercase tracking-widest">Гіпс / Ручна робота</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Сюди автоматично підтягнуться товари з файлу site-data.json */}
            <p className="text-zinc-600 italic">Завантаження каталогу...</p>
          </div>
        </section>
      </Container>
    </main>
  );
}
