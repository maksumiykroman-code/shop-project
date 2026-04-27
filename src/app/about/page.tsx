import { Container } from '@/components/ui/container';

export default function AboutPage() {
  return (
    <Container className="py-12 space-y-12 text-zinc-200">
      <section className="max-w-3xl space-y-6">
        <h1 className="font-[var(--font-cormorant)] text-4xl font-semibold text-white">
          Про майстерню
        </h1>
        <p className="text-lg leading-relaxed">
          Тут буде твоя історія про Майстерню гіпсу. Ви можете редагувати цей текст через адмін-панель.
        </p>
      </section>

      <div className="grid gap-12 md:grid-cols-2">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Матеріали та догляд</h2>
          <p>
            Ми використовуємо високоякісний гіпс. Для очищення використовуйте суху м'яку тканину.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Доставка</h2>
          <p>
            Доставка здійснюється по всій Україні Новою Поштою. Кожен виріб надійно пакується в захисний бокс.
          </p>
        </section>
      </div>
    </Container>
  );
}
