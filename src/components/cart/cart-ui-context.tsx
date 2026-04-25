'use client';

import * as React from 'react';

type CartUIContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CartUIContext = React.createContext<CartUIContextValue | null>(null);

export function CartUIProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const value = React.useMemo<CartUIContextValue>(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((v) => !v),
    }),
    [isOpen],
  );

  return <CartUIContext.Provider value={value}>{children}</CartUIContext.Provider>;
}

export function useCartUI() {
  const ctx = React.useContext(CartUIContext);
  if (!ctx) throw new Error('useCartUI must be used within CartUIProvider');
  return ctx;
}

