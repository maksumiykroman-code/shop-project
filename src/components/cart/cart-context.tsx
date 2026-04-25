'use client';

import * as React from 'react';
import type { Product } from '@/lib/products';

export type CartItem = {
  product: Pick<Product, 'id' | 'slug' | 'name' | 'priceCents' | 'images'>;
  quantity: number;
};

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: 'HYDRATE'; state: CartState }
  | { type: 'ADD'; product: CartItem['product']; quantity: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'SET_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR' };

const STORAGE_KEY = 'bronze-atelier-cart-v1';

function clampQuantity(quantity: number) {
  return Math.max(1, Math.min(99, Math.floor(quantity)));
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state;
    case 'ADD': {
      const quantity = clampQuantity(action.quantity);
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: clampQuantity(i.quantity + quantity) }
              : i,
          ),
        };
      }
      return { items: [...state.items, { product: action.product, quantity }] };
    }
    case 'REMOVE':
      return { items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'SET_QTY':
      return {
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: clampQuantity(action.quantity) }
            : i,
        ),
      };
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotalCents: number;
  addItem: (product: CartItem['product'], quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = React.createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(cartReducer, { items: [] });

  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartState;
      if (!parsed?.items || !Array.isArray(parsed.items)) return;
      dispatch({ type: 'HYDRATE', state: parsed });
    } catch {
      // ignore
    }
    // hydrate once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const value = React.useMemo<CartContextValue>(() => {
    const itemCount = state.items.reduce((acc, i) => acc + i.quantity, 0);
    const subtotalCents = state.items.reduce(
      (acc, i) => acc + i.quantity * i.product.priceCents,
      0,
    );

    return {
      items: state.items,
      itemCount,
      subtotalCents,
      addItem: (product, quantity = 1) =>
        dispatch({ type: 'ADD', product, quantity }),
      removeItem: (productId) => dispatch({ type: 'REMOVE', productId }),
      setQuantity: (productId, quantity) =>
        dispatch({ type: 'SET_QTY', productId, quantity }),
      clear: () => dispatch({ type: 'CLEAR' }),
    };
  }, [state.items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

