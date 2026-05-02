'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6); // Показуємо останні 6 робіт на головній
      if (data) setProducts(data);
      setLoading(false);
    }
    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* HERO СЕКЦІЯ (Твоя шапка зі скріншоту) */}
      <section className="pt-20 pb-12 px-8 max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter">
          Федоренко Стиль
        </h1>
        <p className="text-zinc-400 max-w-xl text-lg leading-relaxed italic">
          Авторські вироби з гіпсу з ручною обробкою — створені, щоб з роками набувати особливого шарму та незмінно зберігати свій характер десятиліттями.
        </p>
      </section>

      {/* СЕКЦІЯ МОЇ РОБОТИ */}
      <section className="px-8 pb-20 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-4">
          <h2 className="text-3xl font-bold uppercase tracking-tighter">Мої роботи</h2>
          <span className="text-[10px] text-zinc-500 uppercase tracking-[0.3em]">Гіпс / Ручна робота</span>
        </div>

        {loading ? (
          <div className="text-zinc-600 animate-pulse uppercase text-xs tracking-widest">Завантаження колекції...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((prod) => (
              <Link href={`/product/${prod.id}`} key={prod.id} className="group block">
                <div className="aspect-[4/5] bg-zinc-900 overflow-hidden mb-4 border border-zinc-800 transition-colors group-hover:border-zinc-500">
                  {prod.images?.[0] ? (
                    <img 
                      src={prod.images[0]} 
                      alt={prod.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-zinc-700 text-[10px] uppercase">Фото відсутнє</div>
                  )}
                </div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-1">{prod.title}</h3>
                <p className="text-orange-500 font-mono text-sm">{prod.price} ГРН</p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link 
            href="/shop" 
            className="inline-block border border-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
          >
            Переглянути весь каталог
          </Link>
        </div>
      </section>
    </main>
  );
}
