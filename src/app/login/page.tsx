'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Тимчасовий простий захист (пароль можна змінити пізніше)
    if (password === 'admin123') {
      document.cookie = "admin_auth=true; path=/";
      router.push('/dashboard');
    } else {
      alert('Невірний пароль');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <form onSubmit={handleLogin} className="p-8 border border-zinc-800 rounded-lg bg-zinc-900">
        <h1 className="text-2xl mb-4">Вхід в адмін-панель</h1>
        <input 
          type="password" 
          placeholder="Пароль" 
          className="w-full p-2 mb-4 bg-black border border-zinc-700 text-white"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-white text-black py-2 hover:bg-zinc-200">
          Увійти
        </button>
      </form>
    </div>
  );
}
