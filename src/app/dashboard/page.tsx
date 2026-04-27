'use client';

import { useState } from 'react';
import { Container } from '@/components/ui/container';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  // ТУТ МІНЯЄТЬСЯ ПАРОЛЬ (зараз 7788)
  const handleLogin = () => {
    if (password === '7788') {
      setIsLoggedIn(true);
    } else {
      alert('Невірний пароль! Спробуйте ще раз.');
    }
  };

  if (!isLoggedIn) {
    return (
      <Container className="py-20 flex flex-col items-center justify-center min-h-[60vh] text-white">
        <div className="w-full max-w-md p-8 bg-zinc-900 rounded-xl border border-white/10 shadow-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center font-[var(--font-cormorant)]">
            Адмін-доступ
          </h1>
          <div className="space-y-4">
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              placeholder="Введіть новий пароль"
              className="w-full bg-black border border-white/10 p-3 rounded-lg text-white outline-none focus:border-bronze-500"
            />
            <button 
              onClick={handleLogin}
              className="w-full bg-bronze-500 text-black px-6 py-3 rounded-lg font-bold hover:bg-bronze-400 transition-colors"
            >
              Увійти
            </button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 text-white">
      <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-6">
        <h1 className="text-3xl font-bold font-[var(--font-cormorant)] text-bronze-200">
          Панель керування сайтом
        </h1>
        <button onClick={() => setIsLoggedIn(false)} className="text-xs text-zinc-500 hover:text-white">Вийти</button>
      </div>
      
      <div className="grid gap-10">
        {/* РЕДАГУВАННЯ ТЕКСТІВ */}
        <section className="p-6 bg-zinc-900 rounded-xl border border-white/5">
          <h2 className="text-xl font-semibold mb-6 text-bronze-100 uppercase tracking-wider">
            📝 Тексти сайту
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-500 mb-2 uppercase">Про нас</label>
              <textarea className="w-full bg-black border border-white/10 p-3 rounded-lg h-32 focus:border-bronze-500 outline-none text-sm" />
            </div>
          </div>
        </section>

        {/* УПРАВЛІННЯ ТОВАРАМИ */}
        <section className="p-6 bg-zinc-900 rounded-xl border border-white/5">
          <h2 className="text-xl font-semibold mb-6 text-bronze-100 uppercase tracking-wider">
            🏺 Товари (Посилання на фото)
          </h2>
          <div className="space-y-6">
            <div className="p-4 bg-black/40 rounded-lg border border-white/5">
              <input placeholder="Назва товару" className="w-full bg-transparent border-b border-white/10 mb-4 p-2 outline-none focus:border-bronze-500" />
              <div className="grid grid-cols-1 gap-2">
                <input placeholder="URL головного фото" className="bg-black/50 p-2 text-xs rounded border border-white/5" />
                <input placeholder="URL фото 2" className="bg-black/50 p-2 text-xs rounded border border-white/5" />
                <input placeholder="URL фото 3" className="bg-black/50 p-2 text-xs rounded border border-white/5" />
              </div>
            </div>
            
            <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-lg text-zinc-500 hover:text-bronze-500 transition-all font-medium text-sm">
              + Додати ще один товар
            </button>
          </div>
        </section>

        <button 
          className="bg-bronze-500 text-black px-10 py-4 rounded-full font-bold hover:bg-bronze-400 shadow-lg transition-all uppercase tracking-widest text-sm mx-auto block"
          onClick={() => alert('Збереження налаштуємо в наступному кроці!')}
        >
          Зберегти зміни
        </button>
      </div>
    </Container>
  );
}
