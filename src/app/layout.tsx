import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/cart/providers';
import { Footer } from '@/components/site/footer';
import { Header } from '@/components/site/header';
import { CartDrawer } from '@/components/cart/cart-drawer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'Bronze Atelier — Sculptures in Bronze',
    template: '%s — Bronze Atelier',
  },
  description:
    'A curated collection of hand-finished bronze sculptures: figurative works, wildlife, and modern abstracts.',
  metadataBase: new URL('http://localhost:3000'),
  icons: [{ rel: 'icon', url: '/favicon.svg' }],
  openGraph: {
    title: 'Bronze Atelier',
    description:
      'Discover collectible bronze sculptures with museum-inspired presentation.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="min-h-dvh">
        <Providers>
          <Header />
          <main className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6">
            {children}
          </main>
          <Footer />
          <CartDrawer />
        </Providers>
      </body>
    </html>
  );
}

