'use client';
import { useState } from 'react';
import { Container } from '@/components/ui/container';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === '1234') {
      setIsLoggedIn(true);
    } else {
      alert('Невірний пароль!');
    }
  };

  if (!isLoggedIn) {
    return (
      <Container className="py-20 text-center text-white">
        <h1 className="text-3xl font-bold mb-8 font-[var(--font-cormorant)]">Вхід в адмін-панель</h1>
        <div className="max-w-sm mx-auto space-y-4">
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            className="w-full bg-zinc-900 border border-white/10 p-3 rounded-lg text-white outline-none focus:border-white/30"
            placeholder="Введіть пароль"
          />
          <button 
            onClick={handleLogin}
            className="w-full bg-white text-black py-3 rounded-lg font-bold hover:bg-zinc-200 transition-colors"
          >
            Увійти
          </button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 text-white text-center">
      <h1 className="text-3xl font-bold mb-4 font-[var(--font-cormorant)] text-bronze-200">
        Вітаємо в системі!
      </h1>
      <p className="text-zinc-400">Ви успішно увійшли. Панель керування готова до налаштування.</p>
    </Container>
  );
}
