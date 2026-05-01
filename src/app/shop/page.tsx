'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { ProductGrid } from "@/components/products/product-grid";

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
        console.error('Помилка завантаження товарів:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center text-white bg-black min-h-screen">
        <p className="text-xl animate-pulse">Завантаження вітрини...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 border-b border-zinc-800 pb-8">
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Магазин скульптур</h1>
          <p className="text-zinc-500 mt-2">Авторські роботи Саші Федоренко</p>
        </header>

        {products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 italic">Наразі робіт немає в наявності...</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
