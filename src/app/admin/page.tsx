'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  // Перевірка входу
  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_access');
    if (authStatus === 'true') {
      setIsAuthorized(true);
      fetchProducts();
    }
    setLoading(false);
  }, []);

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await supabase.from('admin_auth').select('password').eq('id', 1).single();
    if (data && data.password === inputPassword) {
      setIsAuthorized(true);
      sessionStorage.setItem('admin_access', 'true');
      fetchProducts();
    } else {
      alert('НЕВІРНИЙ ПАРОЛЬ!');
    }
  };

  if (loading) return <div className="bg-black min-h-screen text-white p-10">Завантаження...</div>;

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white p-6">
        <form onSubmit={handleLogin} className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900 w-full max-w-sm text-center">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-zinc-400">Вхід в систему</h2>
          <input 
            type="password" 
            placeholder="Введіть пароль"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="w-full p-3 bg-black border border-zinc-700 rounded mb-4 outline-none focus:border-orange-500 text-center"
          />
          <button type="submit" className="w-full py-3 bg-white text-black font-bold rounded uppercase hover:bg-zinc-200 transition">
            Увійти
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
          <h1 className="text-2xl font-bold uppercase tracking-widest text-orange-500">Керування товарами</h1>
          <button 
            onClick={() => { sessionStorage.removeItem('admin_access'); window.location.reload(); }}
            className="text-xs border border-zinc-700 px-5 py-2 rounded hover:bg-red-900 transition font-bold uppercase"
          >
            Вийти
          </button>
        </div>

        {/* ТУТ ТВОЯ КНОПКА ДОДАВАННЯ */}
        <div className="mb-10">
           <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-bold transition uppercase text-sm">
             + Додати нову скульптуру
           </button>
        </div>

        <div className="grid gap-4">
          {products.map((product) => (
            <div key={product.id} className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{product.title}</h3>
                <p className="text-zinc-500">{product.price} грн</p>
              </div>
              <div className="flex gap-3">
                <button className="text-zinc-400 hover:text-white px-3 py-1 border border-zinc-700 rounded text-sm">Змінити</button>
                <button className="text-red-500 hover:text-red-400 px-3 py-1 border border-zinc-700 rounded text-sm">Видалити</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
