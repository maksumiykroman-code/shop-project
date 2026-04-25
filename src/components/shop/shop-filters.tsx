'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const categories = [
  { key: '', label: 'All' },
  { key: 'figurative', label: 'Figurative' },
  { key: 'wildlife', label: 'Wildlife' },
  { key: 'abstract', label: 'Abstract' },
  { key: 'functional', label: 'Functional' },
] as const;

const sorts = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: Low → High' },
  { key: 'price-desc', label: 'Price: High → Low' },
  { key: 'name-asc', label: 'Name: A → Z' },
] as const;

export function ShopFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get('category') ?? '';
  const currentSort = searchParams.get('sort') ?? 'featured';

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    router.push(`${pathname}?${next.toString()}`);
  }

  function clearAll() {
    router.push(pathname);
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = currentCategory === c.key;
            return (
              <button
                key={c.key}
                onClick={() => setParam('category', c.key)}
                className={[
                  'rounded-full border px-3 py-1 text-sm transition',
                  active
                    ? 'border-bronze-200/40 bg-bronze-200/10 text-bronze-100'
                    : 'border-white/10 bg-black/20 text-zinc-200 hover:bg-white/10',
                ].join(' ')}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="muted">Sort</Badge>
            <select
              value={currentSort}
              onChange={(e) => setParam('sort', e.target.value)}
              className="rounded-2xl border border-white/10 bg-black/30 px-3 py-2 text-sm"
            >
              {sorts.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>

          <Button variant="ghost" onClick={clearAll}>
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
}

