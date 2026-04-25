import Image from 'next/image';
import { Container } from '@/components/ui/container';

export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <Container className="space-y-10">
      <div className="space-y-2">
        <h1 className="font-[var(--font-cormorant)] text-4xl font-semibold">
          About the atelier
        </h1>
        <p className="max-w-prose text-zinc-300/80">
          Bronze Atelier is a boutique storefront template designed for
          sculpture studios. Replace the product catalog with your own work and
          connect a payment provider when you’re ready.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Materials & care</h2>
          <p className="text-zinc-200/85">
            Each piece is conceived for bronze casting and finished with
            carefully layered patinas. We recommend gentle dusting and an
            occasional microcrystalline wax coat if you display in high-touch
            environments.
          </p>
          <h2 className="text-lg font-semibold">Shipping</h2>
          <p className="text-zinc-200/85">
            Works are secured with foam supports and double packaging. Larger
            pieces can be crated on request.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <Image
            src="/images/hero-bronze.svg"
            alt="Bronze studio atmosphere"
            width={1200}
            height={800}
            className="h-auto w-full opacity-90"
          />
        </div>
      </div>
    </Container>
  );
}

