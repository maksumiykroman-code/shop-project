'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [settings, setSettings] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '' });
  const [uploading, setUploading] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data: setts } = await supabase.from('site_settings').select('*');
    const { data: prods } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (setts) setSettings(setts);
    if (prods) setProducts(prods);
    setLoading(false);
  }

  const handleUpdateSetting = async (id: number, newContent: string) => {
    const { error } = await supabase.from('site_settings').update({ content: newContent }).eq('id', id);
    if (error) alert('Помилка оновлення тексту');
    else alert('Текст оновлено!');
  };

  const handleChangePassword = async () => {
    if (!newPassword) return;
    const { error } = await supabase.from('admin_auth').update({ password: newPassword }).eq('id', 1);
    if (error) alert('Помилка зміни пароля');
    else {
      alert('Пароль змінено!');
      setNewPassword('');
    }
  };

  // --- ВИПРАВЛЕНА ЛОГІКА ЗАВАНТАЖЕННЯ ---
  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    const fileInput = e.target.querySelector('input[type="file"]');
    const files = fileInput?.files;

    if (!files || files.length === 0) return alert('Виберіть хоча б одне фото');
    
    setUploading(true);
    const imageUrls = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Створюємо унікальне ім'я без дивних символів
        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;

        // Завантаження в Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('sculptures')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) throw new Error(`Помилка сховища: ${uploadError.message}`);

        // Отримання прямого публічного посилання
        const { data: linkData } = supabase.storage
          .from('sculptures')
          .getPublicUrl(fileName);

        if (linkData?.publicUrl) {
          imageUrls.push(linkData.publicUrl);
        }
      }

      // Запис у таблицю products
      const { error: dbError } = await supabase.from('products').insert([
        { 
          title: newProduct.title, 
          price: parseFloat(newProduct.price), 
          description: newProduct.description,
          images: imageUrls 
        }
      ]);

      if (dbError) throw new Error(`Помилка бази: ${dbError.message}`);

      alert('ТОВАР ТА ФОТО УСПІШНО ДОДАНО!');
      setNewProduct({ title: '', price: '', description: '' });
      if (fileInput) fileInput.value = ''; // Очищуємо поле вибору файлу
      fetchData();

    } catch (err: any) {
      alert(`КРИТИЧНА ПОМИЛКА: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Видалити цей товар?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchData();
  };

  if (loading) return <div className="p-10 text-white bg-black min-h-screen">Завантаження даних...</div>;

  return (
    <div className="p-8 bg-black min-h-screen text-white font-sans">
      <h1 className="text-4xl font-bold mb-12 text-center border-b border-zinc-800 pb-6 uppercase">Панель керування</h1>
      
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* НАЛАШТУВАННЯ ТЕКСТУ */}
        <section>
          <h2 className="text-2xl mb-6 font-semibold text-zinc-400 italic">Налаштування контенту</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settings.map((item) => (
              <div key={item.id} className="p-5 border border-zinc-800 rounded-xl bg-zinc-900/50">
                <label className="text-xs text-zinc-500 uppercase block mb-2">{item.label}</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    defaultValue={item.content}
                    className="flex-1 p-2 bg-black border border-zinc-700 rounded text-sm outline-none focus:border-white"
                    onBlur={(e) => (item.temp = e.target.value)}
                  />
                  <button onClick={() => handleUpdateSetting(item.id, item.temp || item.content)} className="bg-white text-black px-4 py-2 rounded text-xs font-bold uppercase hover:bg-zinc-300">ОК</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ДОДАВАННЯ ТОВАРУ */}
        <section className="p-8 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
          <h2 className="text-2xl mb-6 font-semibold text-white uppercase tracking-tighter">Додати нову скульптуру</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Назва скульптури" required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="p-3 bg-black border border-zinc-700 rounded outline-none focus:border-orange-500" />
              <input type="number" placeholder="Ціна (грн)" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="p-3 bg-black border border-zinc-700 rounded outline-none focus:border-orange-500" />
            </div>
            <textarea placeholder="Опис роботи..." value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full p-3 bg-black border border-zinc-700 rounded h-24 outline-none focus:border-orange-500" />
            
            <div className="p-6 border border-zinc-700 rounded bg-black text-center">
              <label className="block text-sm text-zinc-400 mb-4 uppercase font-bold">Завантажити фотографії</label>
              <input type="file" multiple accept="image/*" className="text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-800 file:text-zinc-300 hover:file:bg-zinc-700" />
            </div>

            <button type="submit" disabled={uploading} className="w-full py-5 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-xl transition uppercase tracking-[0.2em] shadow-lg shadow-orange-900/20">
              {uploading ? 'ПРОЦЕС ЗАВАНТАЖЕННЯ...' : 'ОПУБЛІКУВАТИ ТОВАР'}
            </button>
          </form>
        </section>

        {/* СПИСОК ТОВАРІВ */}
        <section>
          <h2 className="text-2xl mb-6 font-semibold text-zinc-400 italic">Наявні товари ({products.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div key={prod.id} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 group transition-all hover:border-zinc-500">
                <div className="h-48 bg-zinc-800 relative">
                  {prod.images?.[0] ? (
                    <img src={prod.images[0]} alt="" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-600 uppercase text-[10px]">Немає фото</div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/80 px-2 py-1 rounded text-[10px] font-bold">{prod.images?.length || 0} ФОТО</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold truncate uppercase text-sm tracking-tight">{prod.title}</h3>
                  <p className="text-orange-500 font-mono font-bold mt-1">{prod.price} ГРН</p>
                  <button onClick={() => deleteProduct(prod.id)} className="mt-4 text-[10px] text-red-500 hover:text-red-400 font-bold uppercase tracking-widest transition">Видалити</button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
