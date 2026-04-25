'use client';

import * as React from 'react';
import { CartProvider } from '@/components/cart/cart-context';
import { CartUIProvider } from '@/components/cart/cart-ui-context';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CartUIProvider>{children}</CartUIProvider>
    </CartProvider>
  );
}

