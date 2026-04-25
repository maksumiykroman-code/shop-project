'use client';

import * as React from 'react';
import { useCart } from '@/components/cart/cart-context';
import { useCartUI } from '@/components/cart/cart-ui-context';

export function CartSummaryButton() {
  const { itemCount } = useCart();
  const { toggle } = useCartUI();

  return (
    <button
      onClick={toggle}
      className="relative inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-medium text-zinc-100 hover:bg-white/10"
      aria-label="Open cart"
    >
      <span>Cart</span>
      <span className="rounded-full bg-bronze-200/20 px-2 py-0.5 text-xs text-bronze-100">
        {itemCount}
      </span>
    </button>
  );
}

