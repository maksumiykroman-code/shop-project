'use client';

import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui/container';

// Створюємо кнопку прямо тут, щоб не було помилок "Module not found"
function LocalBackButton() {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-6"
    >
      <span className="text-lg">←</span>
      <span>Назад</span>
    </button>
  );
}

export default function AboutPage() {
  return (
    <Container className="py-12 space-y-8">
      {/* Використовуємо нашу локальну кнопку */}
      <LocalBackButton /> 

      <section className="space-y-6">
        <h1 className="font-[var(--font-cormorant)] text-4xl font-semibold text-white">
          Про майстерню
        </h1>
        
        <div className="text-zinc-200 space-y-4">
          <p className="text-lg leading-relaxed">
            Ласкаво просимо до нашої майстерні. Ми створюємо унікальні вироби з гіпсу, поєднуючи традиційні техніки та сучасний дизайн.
          </p>
          <p>
            Кожна робота — це ручна праця, де ми приділяємо увагу кожній деталі, щоб ви отримали не просто предмет декору, а справжній витвір мистецтва.
          </p>
        </div>
      </section>

      <div className="grid gap-12 md:grid-cols-2 text-zinc-200">
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Матеріали та догляд</h2>
          <p>
            Ми використовуємо екологічно чистий високоміцний гіпс. Щоб виріб служив довго, уникайте прямого контакту з водою та чистіть сухою м'якою тканиною.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-white uppercase tracking-wider">Доставка</h2>
          <p>
            Надсилаємо ваші замовлення по всій Україні Новою Поштою. Ми розробили спеціальне пакування, яке гарантує цілісність виробу під час транспортування.
          </p>
        </section>
      </div>
    </Container>
  );
}
