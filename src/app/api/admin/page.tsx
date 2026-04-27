'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const router = useRouter();

  // Функція для перевірки пароля
  const handleLogin = () => {
    // Твій пароль за замовчуванням - 1234
    if (password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Невірний пароль! Спробуйте ще раз.');
    }
  };

  // 1. Екран входу (якщо не авторизований)
  if (!isLoggedIn) {
    return (
      <Container className="py-20 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-full max-w-md p-8 bg-zinc-900 rounded-xl border border-white/10 shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-white text-center font-[var(--font-cormorant)]">
            Вхід в адмін-панель
          </h1>
          <div className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Введіть пароль"
              className="w-full bg-black border border-white/10 p-3 rounded-lg text-white focus:outline-none focus:border-bronze-500 transition-colors"
            />
            <button 
              onClick={handleLogin}
              className="w-full bg-white text-black px-6 py-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors"
            >
              Увійти
            </button>
            <button 
              onClick={() => router.push('/')}
              className="w-full text-zinc-500 text-sm hover:text-zinc-300 transition-colors"
            >
              Повернутися на сайт
            </button>
          </div>
        </div>
      </Container>
    );
  }

  // 2. Екран управління (якщо пароль вірний)
  return (
    <Container className="py-12 text-white">
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold font-[var(--font-cormorant)] text-bronze-200">
          Панель керування сайтом
        </h1>
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="text-sm bg-red-900/20 text-red-400 px-4 py-2 rounded border border-red-900/50 hover:bg-red-900/40"
        >
          Вийти
        </button>
      </div>
      
      <div className="grid gap-10">
        {/* Редагування текстів */}
        <section className="p-6 bg-zinc-900 rounded-xl border border-white/5">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white uppercase tracking-wider">
            📝 Загальна інформація
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Текст розділу "Про нас"</label>
              <textarea 
                className="w-full bg-black border border-white/10 p-3 rounded-lg h-32 focus:border-bronze-500 outline-none"
                placeholder="Опишіть вашу майстерню..."
              />
            </div>
            <div>
              <label className="block text-sm text-zinc-400 mb-2">Умови доставки та оплати</label>
              <textarea 
                className="w-full bg-black border border-white/10 p-3 rounded-lg h-24 focus:border-bronze-500 outline-none"
                placeholder="Як ви відправляєте товар..."
              />
            </div>
          </div>
        </section>

        {/* Управління товарами */}
        <section className="p-6 bg-zinc-900 rounded-xl border border-white/5 text-white">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 uppercase tracking-wider">
            🏺 Товари та фото (5 шт на позицію)
          </h2>
          
          <div className="space-y-8">
            {/* Форма одного товару */}
            <div className="p-6 bg-black/40 rounded-lg border border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input placeholder="Назва товару" className="bg-black border border-white/10 p-2 rounded outline-none" />
                <input placeholder="Ціна (грн)" className="bg-black border border-white/10 p-2 rounded outline-none" />
              </div>
              
              <p className="text-sm text-zinc-500 mb-3 uppercase tracking-tighter font-bold">Посилання на 5 фотографій:</p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <div key={num} className="space-y-1">
                    <input 
                      placeholder={`URL фото ${num}`} 
                      className="w-full bg-black border border-white/10 p-2 text-xs rounded outline-none focus:border-bronze-500" 
                    />
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-lg text-zinc-500 hover:border-bronze-500 hover:text-bronze-500 transition-all font-medium">
              + Додати ще один товар
            </button>
          </div>
        </section>

        <div className="flex justify-end pt-6">
          <button 
            className="bg-bronze-500 text-black px-10 py-4 rounded-full font-bold hover:bg-bronze-400 shadow-lg shadow-bronze-500/20 transition-all transform hover:scale-105"
            onClick={() => alert('Наступним кроком ми налаштуємо збереження у файл!')}
          >
            ЗБЕРЕГТИ ВСІ ЗМІНИ
          </button>
        </div>
      </div>
    </Container>
  );
}
