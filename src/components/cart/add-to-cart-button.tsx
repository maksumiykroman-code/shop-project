'use client';

import * as React from 'react';
import type { Product } from '@/lib/products';
import { useCart } from '@/components/cart/cart-context';
import { useCartUI } from '@/components/cart/cart-ui-context';
import { Button } from '@/components/ui/button';

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const { open } = useCartUI();
  const [isAdding, setIsAdding] = React.useState(false);

  return (
    <Button
      onClick={() => {
        setIsAdding(true);
        addItem(
          {
            id: product.id,
            slug: product.slug,
            name: product.name,
            priceCents: product.priceCents,
            images: product.images,
          },
          1,
        );
        open();
        window.setTimeout(() => setIsAdding(false), 250);
      }}
      disabled={isAdding}
    >
      {isAdding ? 'Added' : 'Add to cart'}
    </Button>
  );
}

