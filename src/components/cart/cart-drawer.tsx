'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useCart } from '@/components/cart/cart-context';
import { useCartUI } from '@/components/cart/cart-ui-context';
import { Price } from '@/components/ui/price';
import { Button, ButtonLink } from '@/components/ui/button';

export function CartDrawer() {
  const { isOpen, close } = useCartUI();
  const { items, itemCount, subtotalCents, removeItem, setQuantity } = useCart();

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    if (!isOpen) return;
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [close, isOpen]);

  return (
    <div
      aria-hidden={!isOpen}
      className={[
        'fixed inset-0 z-50',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
      ].join(' ')}
    >
      <button
        aria-label="Close cart"
        className={[
          'absolute inset-0 bg-black/60 transition-opacity',
          isOpen ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        onClick={close}
      />
      <aside
        role="dialog"
        aria-label="Cart drawer"
        className={[
          'absolute right-0 top-0 h-full w-full max-w-md border-l border-white/10 bg-zinc-950/95 backdrop-blur',
          'transition-transform duration-200',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4">
            <div>
              <p className="text-sm font-medium">Cart</p>
              <p className="text-xs text-zinc-300/70">{itemCount} item(s)</p>
            </div>
            <Button variant="ghost" onClick={close}>
              Close
            </Button>
          </div>

          <div className="flex-1 overflow-auto p-4">
            {items.length === 0 ? (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
                <p className="font-medium">Your cart is empty</p>
                <p className="mt-1 text-sm text-zinc-300/80">
                  Add a sculpture to get started.
                </p>
                <div className="mt-4">
                  <ButtonLink href="/shop" onClick={close}>
                    Browse shop
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.product.id}
                    className="rounded-3xl border border-white/10 bg-white/5 p-3"
                  >
                    <div className="flex gap-3">
                      <div className="h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          width={160}
                          height={160}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/product/${item.product.slug}`}
                          onClick={close}
                          className="block truncate text-sm font-medium hover:text-bronze-200"
                        >
                          {item.product.name}
                        </Link>
                        <Price
                          cents={item.product.priceCents}
                          className="text-sm text-zinc-200/90"
                        />
                        <div className="mt-2 flex items-center gap-2">
                          <label className="text-xs text-zinc-300/70" htmlFor={`qty-${item.product.id}`}>
                            Qty
                          </label>
                          <select
                            id={`qty-${item.product.id}`}
                            value={item.quantity}
                            onChange={(e) =>
                              setQuantity(item.product.id, Number(e.target.value))
                            }
                            className="rounded-xl border border-white/10 bg-black/30 px-2 py-1 text-sm"
                          >
                            {Array.from({ length: 10 }).map((_, idx) => (
                              <option key={idx + 1} value={idx + 1}>
                                {idx + 1}
                              </option>
                            ))}
                          </select>
                          <button
                            className="ml-auto text-xs font-medium text-zinc-200/80 hover:text-white"
                            onClick={() => removeItem(item.product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="border-t border-white/10 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-300/70">Subtotal</span>
              <Price cents={subtotalCents} className="text-base" />
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <ButtonLink href="/cart" variant="secondary" onClick={close}>
                View cart
              </ButtonLink>
              <ButtonLink href="/checkout" onClick={close} disabled={items.length === 0}>
                Checkout
              </ButtonLink>
            </div>
            <p className="mt-3 text-xs text-zinc-300/60">
              Taxes and shipping calculated at checkout.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

