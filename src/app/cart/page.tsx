import { Container } from '@/components/ui/container';
import { CartPageClient } from '@/components/cart/cart-page-client';

export const metadata = {
  title: 'Cart',
};

export default function CartPage() {
  return (
    <Container className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-[var(--font-cormorant)] text-4xl font-semibold">
          Your cart
        </h1>
        <p className="text-zinc-300/80">
          Review your pieces and proceed to checkout.
        </p>
      </div>
      <CartPageClient />
    </Container>
  );
}

