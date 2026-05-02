'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [bgImage, setBgImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      // Завантажуємо товари
      const { data: prods } = await supabase.from('products').select('*').order('created_at', { ascending: false }).limit(6);
      if (prods) setProducts(prods);

      // ВИПРАВЛЕНО: Шукаємо по key_name, а не по label
      const { data: setts } = await supabase
        .from('site_settings')
        .select('content')
        .eq('key_name', 'background')
        .single();
      
      if (setts?.content && setts.content !== 'none') {
        setBgImage(setts.content);
      }

      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <main 
      className="min-h-screen text-white font-sans transition-all duration-1000 bg-black"
      style={{
        // Додав легке затемнення (0.6), щоб текст "Федоренко Стиль" добре читалися на фоні фото
        backgroundImage: bgImage ? `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.8)), url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <section className="pt-32 pb-12 px-8 max-w-6xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">
          Федоренко Стиль
        </h1>
        <p className="text-zinc-300 max-w-xl text-lg leading-relaxed italic drop-shadow-2xl">
          Авторські вироби з гіпсу з ручною обробкою — створені, щоб з роками набувати особливого шарму.
        </p>
      </section>

      <section className="px-8 pb-32 max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-16 border-b border-zinc-800 pb-4">
          <h2 className="text-3xl font-bold uppercase tracking-tighter">Мої роботи</h2>
          <span className="text-[10px] text-zinc-500 uppercase tracking-[0.4em]">Hand Crafted / 2026</span>
        </div>

        {loading ? (
          <div className="text-zinc-600 animate-pulse uppercase text-[10px] tracking-[0.5em]">Завантаження...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {products.map((prod) => (
              <Link href={`/product/${prod.id}`} key={prod.id} className="group block">
                <div className="aspect-[4/5] bg-zinc-900/30 backdrop-blur-md overflow-hidden mb-6 border border-zinc-800 transition-all duration-500 group-hover:border-zinc-400">
                  {prod.images?.[0] && (
                    <img src={prod.images[0]} alt={prod.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105" />
                  )}
                </div>
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-2">{prod.title}</h3>
                <p className="text-orange-500 font-mono text-sm">{prod.price} ГРН</p>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-20 text-center">
          <Link href="/shop" className="inline-block border border-white px-12 py-5 text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500">
            ПЕРЕЙТИ В МАГАЗИН
          </Link>
        </div>
      </section>
    </main>
  );
}
