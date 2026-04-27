'use client';
import { useRouter } from 'next/navigation';

export function BackButton() {
  const router = useRouter();
  return (
    <button 
      onClick={() => router.back()}
      className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors mb-6"
    >
      {/* Проста стрілочка замість іконки Lucide */}
      <span className="text-lg">←</span>
      <span>Назад</span>
    </button>
  );
}
