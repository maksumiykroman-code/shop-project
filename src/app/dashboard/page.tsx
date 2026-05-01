'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [settings, setSettings] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Поля для нового товару
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

  // --- ЛОГІКА НАЛАШТУВАНЬ ТЕКСТУ ---
  const handleUpdateSetting = async (id: number, newContent: string) => {
    const { error } = await supabase.from('site_settings').update({ content: newContent }).eq('id', id);
    if (error) alert('Помилка оновлення тексту');
    else alert('Текст оновлено!');
  };

  // --- ЛОГІКА ПАРОЛЯ ---
  const handleChangePassword = async () => {
    if (!newPassword) return;
    const { error } = await supabase.from('admin_auth').update({ password: newPassword }).eq('id', 1);
    if (error) alert('Помилка зміни пароля');
    else {
      alert('Пароль змінено!');
      setNewPassword('');
    }
  };

  // --- ЛОГІКА ТОВАРІВ ТА ФОТО ---
  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    const files = e.target.files.files;
    if (!files || files.length === 0) return alert('Виберіть хоча б одне фото');
    if (files.length > 5) return alert('Максимум 5 фото');

    setUploading(true);
    const imageUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('sculptures')
        .upload(filePath, file);

      if (!uploadError) {
        const { data } = supabase.storage.from('sculptures').getPublicUrl(filePath);
        imageUrls.push(data.publicUrl);
      }
    }

    const { error } = await supabase.from('products').insert([
      { 
        title: newProduct.title, 
        price: parseFloat(newProduct.price), 
        description: newProduct.description,
        images: imageUrls 
      }
    ]);

    setUploading(false);
    if (error) alert('Помилка додавання товару');
    else {
      alert('Товар додано успішно!');
      setNewProduct({ title: '', price: '', description: '' });
      fetchData();
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
      <h1 className="text-4xl font-bold mb-12 text-center border-b border-zinc-800 pb-6">ПАНЕЛЬ КЕРУВАННЯ САШІ ФЕДОРЕНКО</h1>
      
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* РОЗДІЛ 1: ТЕКСТИ САЙТУ */}
        <section>
          <h2 className="text-2xl mb-6 font-semibold text-zinc-400">Налаштування контенту</h2>
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

        {/* РОЗДІЛ 2: ДОДАВАННЯ ТОВАРУ */}
        <section className="p-8 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
          <h2 className="text-2xl mb-6 font-semibold text-white">Додати нову скульптуру</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Назва скульптури" required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="p-3 bg-black border border-zinc-700 rounded outline-none" />
              <input type="number" placeholder="Ціна (грн)" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="p-3 bg-black border border-zinc-700 rounded outline-none" />
            </div>
            <textarea placeholder="Опис роботи..." value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full p-3 bg-black border border-zinc-700 rounded h-24 outline-none" />
            
            <div className="p-4 border border-zinc-700 rounded bg-black">
              <label className="block text-sm text-zinc-400 mb-2">Фотографії (виберіть від 1 до 5 штук):</label>
              <input type="file" name="files" multiple accept="image/*" className="text-sm text-zinc-400" />
            </div>

            <button type="submit" disabled={uploading} className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl transition uppercase tracking-widest">
              {uploading ? 'Завантаження...' : 'Опублікувати товар'}
            </button>
          </form>
        </section>

        {/* РОЗДІЛ 3: СПИСОК ТОВАРІВ */}
        <section>
          <h2 className="text-2xl mb-6 font-semibold text-zinc-400">Наявні товари ({products.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div key={prod.id} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 group">
                <div className="h-48 bg-zinc-800 relative">
                  {prod.images?.[0] ? (
                    <img src={prod.images[0]} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-zinc-600">Немає фото</div>
                  )}
                  <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs">{prod.images?.length || 0} фото</div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold truncate">{prod.title}</h3>
                  <p className="text-orange-500 font-mono">{prod.price} грн</p>
                  <button onClick={() => deleteProduct(prod.id)} className="mt-4 text-xs text-red-500 hover:underline uppercase">Видалити товар</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* РОЗДІЛ 4: БЕЗПЕКА */}
        <section className="pt-10 border-t border-zinc-800">
          <div className="max-w-md bg-zinc-900 p-6 rounded-xl border border-red-900/30">
            <h2 className="text-xl mb-4 font-semibold text-red-500">Зміна пароля адмінки</h2>
            <div className="flex gap-2">
              <input 
                type="password" 
                placeholder="Новий пароль" 
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className="flex-1 p-2 bg-black border border-zinc-700 rounded outline-none focus:border-red-500"
              />
              <button onClick={handleChangePassword} className="bg-red-600 text-white px-4 py-2 rounded font-bold hover:bg-red-500 transition">ЗМІНИТИ</button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
