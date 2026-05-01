'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [settings, setSettings] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '' });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const authStatus = sessionStorage.getItem('admin_access');
    if (authStatus === 'true') {
      setIsAuthorized(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data: setts } = await supabase.from('site_settings').select('*');
    const { data: prods } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (setts) setSettings(setts);
    if (prods) setProducts(prods);
    setLoading(false);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('admin_auth')
      .select('password')
      .eq('id', 1)
      .single();

    if (data && data.password === inputPassword) {
      setIsAuthorized(true);
      sessionStorage.setItem('admin_access', 'true');
      fetchData();
    } else {
      alert('НЕВІРНИЙ ПАРОЛЬ!');
    }
  };

  const handleUpdateSetting = async (id: number, newContent: string) => {
    const { error } = await supabase.from('site_settings').update({ content: newContent }).eq('id', id);
    if (error) alert('Помилка оновлення');
    else alert('Текст оновлено!');
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
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}`;

        const { error: uploadError } = await supabase.storage
          .from('sculptures')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: linkData } = supabase.storage.from('sculptures').getPublicUrl(fileName);
        if (linkData?.publicUrl) imageUrls.push(linkData.publicUrl);
      }

      const { error: dbError } = await supabase.from('products').insert([
        { 
          title: newProduct.title, 
          price: parseFloat(newProduct.price), 
          description: newProduct.description,
          images: imageUrls 
        }
      ]);

      if (dbError) throw dbError;
      alert('ДОДАНО!');
      setNewProduct({ title: '', price: '', description: '' });
      if (fileInput) fileInput.value = '';
      fetchData();
    } catch (err: any) {
      alert(`ПОМИЛКА: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm('Видалити?')) return;
    await supabase.from('products').delete().eq('id', id);
    fetchData();
  };

  if (!isAuthorized && !loading) {
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

  if (loading) return <div className="p-10 text-white bg-black min-h-screen">Завантаження...</div>;

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center mb-12 border-b border-zinc-800 pb-6">
        <h1 className="text-2xl font-bold uppercase tracking-widest text-orange-500">Адмін-панель</h1>
        <button 
          onClick={() => { sessionStorage.removeItem('admin_access'); window.location.reload(); }}
          className="text-xs border border-zinc-700 px-5 py-2 rounded hover:bg-red-900 transition font-bold uppercase"
        >
          Вийти
        </button>
      </div>
      
      <div className="max-w-5xl mx-auto space-y-12">
        <section className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
          <h2 className="text-xl font-bold mb-6 uppercase">Нова скульптура</h2>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-4">
               <input type="text" placeholder="Назва" required value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} className="w-full p-3 bg-black border border-zinc-800 rounded outline-none focus:border-orange-500" />
               <input type="number" placeholder="Ціна (ГРН)" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} className="w-full p-3 bg-black border border-zinc-800 rounded outline-none focus:border-orange-500" />
               <textarea placeholder="Опис" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="w-full p-3 bg-black border border-zinc-800 rounded h-32 outline-none focus:border-orange-500" />
             </div>
             <div className="flex flex-col justify-between">
               <div className="border-2 border-dashed border-zinc-800 p-10 text-center rounded-xl hover:border-zinc-600 transition">
                 <input type="file" multiple accept="image/*" className="w-full text-xs text-zinc-500" />
                 <p className="text-[10px] text-zinc-600 mt-2 uppercase">Оберіть фотографії</p>
               </div>
               <button type="submit" disabled={uploading} className="mt-4 w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded uppercase transition">
                 {uploading ? 'ЗАВАНТАЖЕННЯ...' : 'ОПУБЛІКУВАТИ'}
               </button>
             </div>
          </form>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div key={prod.id} className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden group">
              <div className="aspect-square bg-zinc-800">
                {prod.images && prod.images[0] && (
                  <img src={prod.images[0]} alt="" className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition" />
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xs font-bold uppercase truncate">{prod.title}</h3>
                <p className="text-orange-500 text-sm font-bold">{prod.price} ГРН</p>
                <button onClick={() => deleteProduct(prod.id)} className="mt-2 text-[9px] text-zinc-500 hover:text-red-500 uppercase font-bold transition">Видалити</button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
