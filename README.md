# Bronze Sculpture Shop (Next.js + Tailwind)

Modern, fast e-commerce storefront for bronze sculptures: product catalog, product detail pages, cart (persisted to `localStorage`), and a lightweight checkout flow.

## Getting started

1. Install dependencies:
   - `npm install`
2. Run the dev server:
   - `npm run dev`
3. Open:
   - http://localhost:3000

## Project structure

- `src/app` — Next.js App Router pages, API routes, and metadata
- `src/components` — UI components + cart state providers
- `src/lib` — product data and utilities
- `public/images` — placeholder images (SVG) for hero + products

## Notes

- This project uses static product data in `src/lib/products.ts`. Replace it with your own CMS/database when ready.
- Checkout is a UI-only flow (no payment provider attached).

