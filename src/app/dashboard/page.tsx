'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [settings, setSettings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Завантажуємо налаштування з бази при відкритті
  useEffect(() => {
    async function fetchSettings() {
      const { data } = await supabase.from('site_settings').select('*');
      if (data) setSettings(data);
      setLoading(false);
    }
    fetchSettings();
  }, []);

  // 2. Функція для збереження змін
  const handleUpdate = async (id: number, newContent: string) => {
    const { error } = await supabase
      .from('site_settings')
      .update({ content: newContent })
      .eq('id', id);

    if (error) alert('Помилка оновлення');
    else alert('Дані збережено!');
  };

  if (loading) return <div className="p-10 text-white">Завантаження налаштувань...</div>;

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Керування сайтом (CMS)</h1>
      
      <div className="max-w-4xl mx-auto space-y-6">
        {settings.map((item) => (
          <div key={item.id} className="p-6 border border-zinc-800 rounded-xl bg-zinc-900 flex flex-col gap-3">
            <label className="text-sm text-zinc-400 uppercase tracking-wider">{item.label}</label>
            <div className="flex gap-4">
              <input 
                type="text" 
                defaultValue={item.content}
                className="flex-1 p-3 bg-black border border-zinc-700 rounded text-white focus:border-white outline-none transition"
                onBlur={(e) => (item.tempContent = e.target.value)} // Тимчасово зберігаємо зміну
              />
              <button 
                onClick={() => handleUpdate(item.id, item.tempContent || item.content)}
                className="px-6 py-3 bg-white text-black font-bold rounded hover:bg-zinc-200 transition"
              >
                Оновити
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
