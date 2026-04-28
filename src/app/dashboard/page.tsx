'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function DashboardPage() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase
      .from('products')
      .insert([
        { 
          name, 
          price: parseFloat(price), 
          description, 
          image_url: imageUrl 
        }
      ])

    setLoading(false)
    if (error) {
      setMessage('Помилка: ' + error.message)
    } else {
      setMessage('Товар успішно додано!')
      setName(''); setPrice(''); setDescription(''); setImageUrl('')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 font-[var(--font-cormorant)]">Управління каталогом</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/50 p-8 rounded-2xl border border-white/10">
          <div>
            <label className="block text-sm text-zinc-400 mb-2">Назва виробу</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white/30"
              placeholder="Наприклад: Крилатий Дракон"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Ціна (грн)</label>
            <input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white/30"
              placeholder="1500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Опис</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-3 h-32 focus:outline-none focus:border-white/30"
              placeholder="Короткий опис скульптури..."
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-2">Посилання на фото (URL)</label>
            <input 
              type="text" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg p-3 focus:outline-none focus:border-white/30"
              placeholder="https://example.com/photo.jpg"
              required
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'Збереження...' : 'Додати виріб у каталог'}
          </button>

          {message && (
            <p className={`mt-4 text-center ${message.includes('Помилка') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
