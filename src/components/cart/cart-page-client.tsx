'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/cart/cart-context';
import { ButtonLink } from '@/components/ui/button';
import { Price } from '@/components/ui/price';

export function CartPageClient() {
  const { items, subtotalCents, removeItem, setQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="font-medium">Your cart is empty</p>
        <p className="mt-1 text-sm text-zinc-300/80">
          Explore the shop to find your next piece.
        </p>
        <div className="mt-4">
          <ButtonLink href="/shop">Browse shop</ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.product.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-4">
                  <div className="h-24 w-24 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div className="min-w-0">
                    <Link
                      href={`/product/${item.product.slug}`}
                      className="block truncate font-medium hover:text-bronze-200"
                    >
                      {item.product.name}
                    </Link>
                    <Price cents={item.product.priceCents} className="text-sm" />
                  </div>
                </div>

                <div className="flex flex-1 items-center justify-between gap-3 sm:justify-end">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor={`cart-qty-${item.product.id}`}
                      className="text-xs text-zinc-300/70"
                    >
                      Qty
                    </label>
                    <select
                      id={`cart-qty-${item.product.id}`}
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
                  </div>

                  <button
                    className="text-sm font-medium text-zinc-200/80 hover:text-white"
                    onClick={() => removeItem(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="h-fit rounded-3xl border border-white/10 bg-white/5 p-5">
        <h2 className="text-lg font-semibold">Summary</h2>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-zinc-300/70">Subtotal</span>
          <Price cents={subtotalCents} className="text-base" />
        </div>
        <p className="mt-2 text-xs text-zinc-300/60">
          Taxes and shipping calculated at checkout.
        </p>
        <div className="mt-4">
          <ButtonLink href="/checkout">Proceed to checkout</ButtonLink>
        </div>
      </aside>
    </div>
  );
}

