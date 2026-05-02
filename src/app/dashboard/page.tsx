'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [settings, setSettings] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '' });
  const [uploading, setUploading] = useState(false);
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_access');
    if (authStatus === 'true') {
      setIsAuthorized(true);
      fetchData();
    }
    setAuthLoading(false);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await supabase.from('admin_auth').select('password').eq('id', 1).single();
    if (data && data.password === inputPassword) {
      setIsAuthorized(true);
      sessionStorage.setItem('admin_access', 'true');
      fetchData();
    } else {
      alert('НЕВІРНИЙ ПАРОЛЬ!');
    }
  };

  async function fetchData() {
    setLoading(true);
    const { data: setts, error: err } = await supabase.from('site_settings').select('*');
    const { data: prods } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (setts) setSettings(setts);
    if (prods) setProducts(prods);
    setLoading(false);
  }

  const handleUploadBackground = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileName = `bg-${Date.now()}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('sculptures')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: linkData } = supabase.storage.from('sculptures').getPublicUrl(fileName);
      const publicUrl = linkData.publicUrl;

      const { error: dbError } = await supabase
        .from('site_settings')
        .update({ content: publicUrl })
        .eq('key_name', 'background');

      if (dbError) throw dbError;
      
      alert('ФОН ОНОВЛЕНО!');
      fetchData();
    } catch (err: any) {
      alert(`ПОМИЛКА: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteBackground = async () => {
    if (!confirm('Видалити фонове зображення?')) return;
    const { error } = await supabase
      .from('site_settings')
      .update({ content: 'none' })
      .eq('key_name', 'background');
    
    if (error) alert('Помилка видалення');
    else {
      alert('Фон скинуто');
      fetchData();
    }
  };

  const handleUpdateSetting = async (id: number, newContent: string) => {
    const { error } = await supabase.from('site_settings').update({ content: newContent }).eq('id', id);
    if (!error) alert('Текст оновлено!');
    fetchData();
  };

  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    const fileInput = e.target.querySelector('input[type="file"]');
    const files = fileInput?.files;
    if (!files || files.length === 0) return alert('Виберіть фото');
    setUploading(true);
    const imageUrls = [];
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileName = `${Date.now()}-${Math.floor(Math.random() * 1000)}.jpg`;
        await supabase.storage.from('sculptures').upload(fileName, file);
        const { data: linkData } = supabase.storage.from('sculptures').getPublicUrl(fileName);
        if (linkData?.publicUrl) imageUrls.push(linkData.publicUrl);
      }
      await supabase.from('products').insert([{ 
        title: newProduct.title, price: parseFloat(newProduct.price), 
        description: newProduct.description, images: imageUrls 
      }]);
      alert('ТОВАР ДОДАНО!');
      setNewProduct({ title: '', price: '', description: '' });
      fetchData();
    } catch (err: any) { alert(err.message); } finally { setUploading(false); }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Видалити?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchData();
  };

  if (authLoading) return <div className="p-10 text-white bg-black min-h-screen font-sans uppercase text-center">Завантаження...</div>;

  if (!isAuthorized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white p-6 font-sans">
        <form onSubmit={handleLogin} className="p-8 border border-zinc-800 rounded-2xl bg-zinc-900 w-full max-w-sm text-center">
          <h2 className="text-xl font-bold mb-6 uppercase tracking-widest text-zinc-400">Вхід в адмінку</h2>
          <input type="password" value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} className="w-full p-3 bg-black border border-zinc-700 rounded mb-4 text-center outline-none focus:border-orange-500" placeholder="Пароль" />
          <button type="submit" className="w-full py-3 bg-orange-600 text-white font-bold rounded uppercase">Увійти</button>
        </form>
      </div>
    );
  }

  return (
    <div className="p-8 bg-black min-h-screen text-white font-sans">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-8 border-b border-zinc-800 pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-tighter">Майстерня / Адмін</h1>
        <button onClick={() => { sessionStorage.removeItem('admin_access'); window.location.reload(); }} className="text-[10px] bg-zinc-800 px-3 py-1 rounded hover:bg-zinc-700 transition">ВИЙТИ</button>
      </div>
      
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* КЕРУВАННЯ ФОНОМ */}
        <section className="p-6 border border-zinc-800 rounded-xl bg-zinc-900/40">
          <h2 className="text-xs font-bold text-zinc-400 uppercase mb-6 tracking-[0.2em]">Фон головної сторінки</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <input type="file" accept="image/*" onChange={handleUploadBackground} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" disabled={uploading} />
              <button className="bg-white text-black px-8 py-3 rounded text-[10px] font-black uppercase hover:bg-zinc-200 transition">
                {uploading ? 'ЗАВАНТАЖЕННЯ...' : 'ЗАВАНТАЖИТИ НОВИЙ ФОН'}
              </button>
            </div>
            <button onClick={handleDeleteBackground} className="border border-red-900/50 text-red-500 px-8 py-3 rounded text-[10px] font-black uppercase hover:bg-red-950/30 transition">
              Скинути фон
            </button>
          </div>
        </section>

        {/* ТЕКСТОВІ НАЛАШТУВАННЯ */}
        <section>
          <h2 className="text-lg mb-6 font-semibold text-zinc-500 italic">Налаштування тексту</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {settings.filter(s => s.key_name !== 'background').map((item) => (
              <div key={item.id} className="p-4 border border-zinc-800 rounded-lg bg-zinc-900/50">
                <label className="text-[10px] text-zinc-600 uppercase block mb-2">{item.label}</label>
                <div className="flex gap-2">
                  <input type="text" defaultValue={item.content} className="flex-1 p-2 bg-black border border-zinc-700 rounded text-xs outline-none focus:border-zinc-400" onBlur={(e) => (item.temp = e.target.value)} />
                  <button onClick={() => handleUpdateSetting(item.id, item.temp || item.content)} className="bg-zinc-100 text-black px-4 py-2 rounded text-[10px] font-bold uppercase">ОК</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ДОДАВАННЯ ТОВАРУ */}
        <section className="p-8 border-2 border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
          <h2 className="text-xl mb-8 font-bold uppercase tracking-tighter">Додати нову скульптуру</h2>
          <form onSubmit={handleAddProduct} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Назва" required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="p-4 bg-black border border-zinc-700 rounded outline-none focus:border-orange-500" />
              <input type="number" placeholder="Ціна" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="p-4 bg-black border border-zinc-700 rounded outline-none focus:border-orange-500" />
            </div>
            <textarea placeholder="Опис..." value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full p-4 bg-black border border-zinc-700 rounded h-32 outline-none focus:border-orange-500" />
            <input type="file" multiple accept="image/*" className="w-full p-4 bg-zinc-900 rounded text-[10px] uppercase font-bold text-zinc-500" />
            <button type="submit" disabled={uploading} className="w-full py-5 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-xl transition uppercase tracking-widest">
              {uploading ? 'ЗАВАНТАЖЕННЯ...' : 'ОПУБЛІКУВАТИ'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
