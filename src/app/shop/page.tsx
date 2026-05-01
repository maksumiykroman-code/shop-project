'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) return <div className="bg-black min-h-screen text-white p-10">Завантаження...</div>;

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-10 uppercase tracking-tighter">Магазин скульптур</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border border-zinc-800 p-4 rounded-lg bg-zinc-900/50">
            <div className="aspect-square mb-4 overflow-hidden rounded bg-zinc-800">
              {product.images && product.images[0] ? (
                <img 
                  src={product.images[0]} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-500">Немає фото</div>
              )}
            </div>
            <h2 className="text-xl font-bold uppercase">{product.title}</h2>
            <p className="text-zinc-400 text-sm my-2">{product.description}</p>
            <div className="text-orange-500 font-mono text-lg mt-4">
              {product.price} грн
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
