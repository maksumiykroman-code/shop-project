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

        // ПЕРЕКЛАДАЧ: підлаштовуємо дані з бази під твій компонент ProductGrid
        const formattedProducts = (data || []).map(p => ({
          ...p,
          id: p.id,
          name: p.title,          // База дає title -> компонент хоче name
          price: Number(p.price), // База дає рядок -> компонент хоче число
          image: p.images && p.images.length > 0 ? p.images[0] : '/placeholder.jpg', // Беремо перше фото
          description: p.description
        }));

        setProducts(formattedProducts);
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
        <p className="text-xl animate-pulse tracking-widest uppercase">Завантаження майстерні...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 border-b border-zinc-800 pb-8">
          <h1 className="text-4xl font-bold tracking-tighter uppercase">МАГАЗИН СКУЛЬПТУР</h1>
          <p className="text-zinc-500 mt-2">Авторські роботи Саші Федоренко</p>
        </header>

        {products.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-zinc-800 rounded-2xl">
            <p className="text-zinc-500 italic uppercase tracking-widest">Наразі нових робіт немає...</p>
          </div>
        ) : (
          <ProductGrid products={products} />
        )}
      </div>
    </div>
  );
}
