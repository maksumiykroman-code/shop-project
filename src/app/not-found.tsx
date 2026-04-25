import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ButtonLink } from '@/components/ui/button';

export default function NotFound() {
  return (
    <Container className="space-y-6 py-10">
      <div className="space-y-2">
        <p className="text-sm font-medium text-zinc-300/80">404</p>
        <h1 className="font-[var(--font-cormorant)] text-4xl font-semibold">
          Page not found
        </h1>
        <p className="text-zinc-300/80">
          The page you’re looking for doesn’t exist or has moved.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/shop">Go to shop</ButtonLink>
        <Link href="/" className="text-sm text-zinc-200 hover:text-white">
          Return home →
        </Link>
      </div>
    </Container>
  );
}

