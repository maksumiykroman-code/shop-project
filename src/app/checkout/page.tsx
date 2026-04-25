import { Container } from '@/components/ui/container';
import { CheckoutForm } from '@/components/checkout/checkout-form';

export const metadata = {
  title: 'Checkout',
};

export default function CheckoutPage() {
  return (
    <Container className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-[var(--font-cormorant)] text-4xl font-semibold">
          Checkout
        </h1>
        <p className="max-w-prose text-zinc-300/80">
          This demo checkout collects shipping details and generates a local
          order confirmation (no payment integration).
        </p>
      </div>
      <CheckoutForm />
    </Container>
  );
}

