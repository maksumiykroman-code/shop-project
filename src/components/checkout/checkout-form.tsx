'use client';

import * as React from 'react';
import { useCart } from '@/components/cart/cart-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Price } from '@/components/ui/price';

function makeOrderId() {
  const now = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `BA-${now}-${rand}`;
}

export function CheckoutForm() {
  const { items, subtotalCents, clear } = useCart();
  const [orderId, setOrderId] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  if (orderId) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-zinc-300/80">Order confirmed</p>
        <h2 className="mt-1 text-2xl font-semibold">Thank you.</h2>
        <p className="mt-2 text-zinc-200/85">
          Your confirmation number is{' '}
          <span className="font-mono text-bronze-200">{orderId}</span>.
        </p>
        <p className="mt-2 text-sm text-zinc-300/80">
          This is a demo checkout. Connect Stripe/Shopify/etc. to turn this into
          a real store.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <form
        className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 lg:col-span-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (items.length === 0) return;
          setIsSubmitting(true);
          window.setTimeout(() => {
            clear();
            setOrderId(makeOrderId());
            setIsSubmitting(false);
          }, 500);
        }}
      >
        <h2 className="text-lg font-semibold">Shipping details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="First name" name="firstName" required />
          <Input label="Last name" name="lastName" required />
        </div>
        <Input label="Email" name="email" type="email" required />
        <Input label="Address" name="address" required />
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="City" name="city" required />
          <Input label="Postal code" name="postal" required />
        </div>
        <Input label="Country" name="country" required defaultValue="Ukraine" />
        <div className="pt-2">
          <Button type="submit" disabled={items.length === 0 || isSubmitting}>
            {items.length === 0
              ? 'Cart is empty'
              : isSubmitting
                ? 'Placing order…'
                : 'Place order'}
          </Button>
        </div>
      </form>

      <aside className="h-fit rounded-3xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-lg font-semibold">Order summary</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-zinc-300/70">Subtotal</span>
            <Price cents={subtotalCents} className="text-base" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300/70">Shipping</span>
            <span className="text-zinc-200/90">Calculated</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-300/70">Tax</span>
            <span className="text-zinc-200/90">Calculated</span>
          </div>
          <div className="border-t border-white/10 pt-3">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <Price cents={subtotalCents} className="text-lg" />
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

