import Link from 'next/link';
import { Container } from '@/components/ui/container';
import { ContactForm } from '@/components/contact/contact-form';

export const metadata = {
  title: 'Contact',
};

export default function ContactPage() {
  return (
    <Container className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-[var(--font-cormorant)] text-4xl font-semibold">
          Contact
        </h1>
        <p className="max-w-prose text-zinc-300/80">
          Questions about finishes, shipping, or custom commissions? Send a note
          and we’ll reply quickly.
        </p>
        <p className="text-sm text-zinc-300/80">
          Prefer email?{' '}
          <Link
            href="mailto:studio@bronze-atelier.example"
            className="font-medium text-bronze-200 hover:text-bronze-100"
          >
            studio@bronze-atelier.example
          </Link>
        </p>
      </div>

      <ContactForm />
    </Container>
  );
}

