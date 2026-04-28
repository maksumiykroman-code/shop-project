import { Container } from '@/components/ui/container';

export default function HomePage() {
  return (
    <main className="bg-black min-h-screen pt-24 text-white">
      <Container>
        {/* Головний блок */}
        <div className="mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-[var(--font-cormorant)] text-white">
            Федоренко Стиль
          </h1>
          <p className="text-zinc-400 text-lg max-w-2xl leading-relaxed">
            Авторські вироби з гіпсу з ручною обробкою — створені, щоб з роками набувати особливого шарму та незмінно зберігати свій характер десятиліттями.
          </p>
        </div>

        {/* Блок товарів */}
        <section>
          <div className="flex justify-between items-end mb-12 border-b border-white/10 pb-6">
            <h2 className="text-3xl font-bold font-[var(--font-cormorant)] text-white">
              Мої роботи
            </h2>
            <span className="text-zinc-500 text-sm uppercase tracking-widest">Гіпс / Ручна робота</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Тимчасова заглушка, поки ми не підключили базу даних */}
            <div className="bg-zinc-900/50 p-8 rounded-2xl border border-white/5 text-center">
              <p className="text-zinc-500 italic">Каталог оновлюється...</p>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
