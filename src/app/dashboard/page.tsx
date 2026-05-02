'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  // --- ТВОЯ ОРИГІНАЛЬНА ЛОГІКА (БЕЗ ЗМІН) ---
  const [settings, setSettings] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '' });
  const [uploading, setUploading] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  // --- ЛОГІКА ПАРОЛЯ ---
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Перевірка, чи ми вже заходили раніше
    const authStatus = sessionStorage.getItem('admin_access');
    if (authStatus === 'true') {
      setIsAuthorized(true);
      fetchData();
    }
    setAuthLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Беремо пароль з твоєї таблиці admin_auth (id: 1)
    const { data } = await supabase.from('admin_auth').select('password').eq('id', 1).single();
    
    if (data && data.password === inputPassword) {
      setIsAuthorized(true);
      sessionStorage.setItem('admin_access', 'true');
      fetchData();
    } else {
      alert('НЕВІРНИЙ ПАРОЛЬ!');
    }
  };

  // --- ТВОЇ ОРИГІНАЛЬНІ ФУНКЦІЇ (БЕЗ ЗМІН) ---
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
        const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
        const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.${fileExt}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('sculptures').upload(fileName, file, { cacheControl: '3600', upsert: false });
        if (uploadError) throw new Error(`Помилка сховища: ${uploadError.message}`);
        const { data: linkData } = supabase.storage.from('sculptures').getPublicUrl(fileName);
        if (linkData?.publicUrl) imageUrls.push(linkData.publicUrl);
      }
      const { error: dbError } = await supabase.from('products').insert([
        { title: newProduct.title, price: parseFloat(newProduct.price), description: newProduct.description, images: imageUrls }
      ]);
      if (dbError) throw new Error(`Помилка бази: ${dbError.message}`);
      alert('ТОВАР ТА ФОТО УСПІШНО ДОДАНО!');
      setNewProduct({ title: '', price: '', description: '' });
      if (fileInput) fileInput.value = '';
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

  // --- ЛОГІКА ВІДОБРАЖЕННЯ ---

  if (authLoading) return <div className="p-10 text-white bg-black min-h-screen">Завантаження...</div>;

  // 1. Якщо не авторизований — показуємо ТІЛЬКИ форму входу
  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white p-6 font-sans">
        <form onSubmit={handleLogin} className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900 w-full max-w-sm text-center">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-zinc-400">Вхід в адмінку</h2>
          <input 
            type="password" 
            placeholder="Введіть пароль"
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            className="w-full p-3 bg-black border border-zinc-700 rounded mb-4 outline-none focus:border-orange-500 text-center text-white"
          />
          <button type="submit" className="w-full py-3 bg-orange-600 text-white font-bold rounded uppercase hover:bg-orange-500 transition">
            Увійти
          </button>
        </form>
      </div>
    );
  }

  // 2. Якщо авторизований і дані вантажаться
  if (loading) return <div className="p-10 text-white bg-black min-h-screen">Вантажимо твої скульптури...</div>;

  // 3. ТВОЯ ОРИГІНАЛЬНА ВЕРСТКА (БЕЗ ЖОДНИХ ЗМІН)
  return (
    <div className="p-8 bg-black min-h-screen text-white font-sans">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-tighter">Панель керування</h1>
        <button 
          onClick={() => { sessionStorage.removeItem('admin_access'); window.location.reload(); }}
          className="text-xs bg-zinc-800 px-3 py-1 rounded hover:bg-zinc-700 transition"
        >
          ВИЙТИ
        </button>
      </div>
      
      <div className="max-w-5xl mx-auto space-y-16">
        <section>
          <h2 className="text-2xl mb-6 font-semibold text-zinc-400 italic">Налаштування контенту</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {settings.map((item) => (
              <div key={item.id} className="p-5 border border-zinc-800 rounded-xl bg-zinc-900/50">
                <label className="text-xs text-zinc-500 uppercase block mb-2">{item.label}</label>
                <div className="flex gap-2">
                  <input type="text" defaultValue={item.content} className="flex-1 p-2 bg-black border border-zinc-700 rounded text-sm outline-none focus:border-white" onBlur={(e) => (item.temp = e.target.value)} />
                  <button onClick={() => handleUpdateSetting(item.id, item.temp || item.content)} className="bg-white text-black px-4 py-2 rounded text-xs font-bold uppercase hover:bg-zinc-300">ОК</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-8 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
          <h2 className="text-2xl mb-6 font-semibold text-white uppercase tracking-tighter">Додати нову скульптуру</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Назва" required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="p-3 bg-black border border-zinc-700 rounded outline-none focus:border-orange-500" />
              <input type="number" placeholder="Ціна" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="p-3 bg-black border border-zinc-700 rounded outline-none focus:border-orange-500" />
            </div>
            <textarea placeholder="Опис..." value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full p-3 bg-black border border-zinc-700 rounded h-24 outline-none focus:border-orange-500" />
            <input type="file" multiple accept="image/*" className="w-full p-3 bg-zinc-900 rounded text-sm" />
            <button type="submit" disabled={uploading} className="w-full py-5 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-xl transition uppercase">
              {uploading ? 'ЗАВАНТАЖЕННЯ...' : 'ОПУБЛІКУВАТИ'}
            </button>
          </form>
        </section>

        <section>
          <h2 className="text-2xl mb-6 font-semibold text-zinc-400 italic">Наявні товари ({products.length})</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((prod) => (
              <div key={prod.id} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800">
                <div className="h-48 bg-zinc-800">
                  {prod.images?.[0] && <img src={prod.images[0]} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="p-4">
                  <h3 className="font-bold uppercase text-sm">{prod.title}</h3>
                  <p className="text-orange-500 font-bold mt-1">{prod.price} ГРН</p>
                  <button onClick={() => deleteProduct(prod.id)} className="mt-4 text-[10px] text-red-500 font-bold uppercase">Видалити</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
