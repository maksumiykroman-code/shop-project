export type ProductCategory = 'figurative' | 'wildlife' | 'abstract' | 'functional';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  shortDescription: string;
  longDescription: string;
  priceCents: number;
  images: string[];
  dimensions: string;
  weight: string;
  patina: string;
  edition: string;
  isLimitedEdition: boolean;
  inStock: boolean;
  shippingWindow: string;
  featured: boolean;
};

const products: Product[] = [
  {
    id: 'p_athena_bust',
    slug: 'athena-bust',
    name: 'Athena Bust',
    category: 'figurative',
    categoryLabel: 'Figurative',
    shortDescription:
      'Classical profile study with warm umber patina and subtle highlights.',
    longDescription:
      'A quiet tribute to classical portraiture: crisp planes, softened edges, and a restrained patina that catches light without glare. Designed for desks, shelves, and intimate collections.',
    priceCents: 185000,
    images: ['/images/products/athena-bust.svg', '/images/products/quiet-thought.svg', '/images/products/athena-bust.svg'],
    dimensions: '28 cm H × 16 cm W × 14 cm D',
    weight: '3.2 kg',
    patina: 'Warm umber with hand-polished highlights',
    edition: 'Edition of 25',
    isLimitedEdition: true,
    inStock: true,
    shippingWindow: '2–4 days',
    featured: true,
  },
  {
    id: 'p_wild_stag',
    slug: 'wild-stag',
    name: 'Wild Stag',
    category: 'wildlife',
    categoryLabel: 'Wildlife',
    shortDescription:
      'A poised guardian with lifted antlers and deep forest patina.',
    longDescription:
      'Inspired by the stillness of a forest clearing: a compact stag with strong silhouette and a patina that shifts from dark evergreen to bronze spark. Excellent as a focal point in modern interiors.',
    priceCents: 265000,
    images: ['/images/products/wild-stag.svg', '/images/products/lion-guardian.svg', '/images/products/wild-stag.svg'],
    dimensions: '24 cm H × 22 cm W × 10 cm D',
    weight: '4.1 kg',
    patina: 'Deep forest with edge burnish',
    edition: 'Open edition',
    isLimitedEdition: false,
    inStock: true,
    shippingWindow: '3–5 days',
    featured: true,
  },
  {
    id: 'p_moon_dancer',
    slug: 'moon-dancer',
    name: 'Moon Dancer',
    category: 'figurative',
    categoryLabel: 'Figurative',
    shortDescription:
      'Minimalist figure study in a soft gold-brown patina.',
    longDescription:
      'A modern figurative piece focused on balance and line. The finish is built in gentle layers for a luminous surface that reads warm under daylight and candlelight.',
    priceCents: 149000,
    images: ['/images/products/moon-dancer.svg', '/images/products/athena-bust.svg', '/images/products/moon-dancer.svg'],
    dimensions: '32 cm H × 12 cm W × 12 cm D',
    weight: '2.6 kg',
    patina: 'Soft gold-brown, satin sheen',
    edition: 'Edition of 50',
    isLimitedEdition: true,
    inStock: true,
    shippingWindow: '2–4 days',
    featured: false,
  },
  {
    id: 'p_forge_spiral',
    slug: 'forge-spiral',
    name: 'Forge Spiral',
    category: 'abstract',
    categoryLabel: 'Abstract',
    shortDescription:
      'A contemporary spiral that reads like metal in motion.',
    longDescription:
      'A sculptural gesture that feels both engineered and organic. The spiral catches highlights along its curves, making it ideal for side tables and entry consoles.',
    priceCents: 219000,
    images: ['/images/products/forge-spiral.svg', '/images/products/atelier-vase.svg', '/images/products/forge-spiral.svg'],
    dimensions: '30 cm H × 18 cm W × 14 cm D',
    weight: '3.8 kg',
    patina: 'Copper-brown with heat-toned transitions',
    edition: 'Open edition',
    isLimitedEdition: false,
    inStock: true,
    shippingWindow: '3–6 days',
    featured: true,
  },
  {
    id: 'p_sea_horse',
    slug: 'sea-horse',
    name: 'Sea Horse',
    category: 'wildlife',
    categoryLabel: 'Wildlife',
    shortDescription:
      'Small ocean totem with deep bronze patina and glossy accents.',
    longDescription:
      'A compact sculptural form with a playful curve. The surface alternates satin and burnished zones to create depth. Great for collectors who love marine motifs.',
    priceCents: 89000,
    images: ['/images/products/sea-horse.svg', '/images/products/wild-stag.svg', '/images/products/sea-horse.svg'],
    dimensions: '18 cm H × 8 cm W × 8 cm D',
    weight: '1.4 kg',
    patina: 'Deep bronze with polished crest',
    edition: 'Open edition',
    isLimitedEdition: false,
    inStock: true,
    shippingWindow: '2–4 days',
    featured: false,
  },
  {
    id: 'p_lion_guardian',
    slug: 'lion-guardian',
    name: 'Lion Guardian',
    category: 'wildlife',
    categoryLabel: 'Wildlife',
    shortDescription:
      'Bold, protective stance with strong modern geometry.',
    longDescription:
      'A modern guardian figure that blends playful strength with clean silhouette. Finished with a warm patina and selectively polished planes.',
    priceCents: 239000,
    images: ['/images/products/lion-guardian.svg', '/images/products/quiet-thought.svg', '/images/products/lion-guardian.svg'],
    dimensions: '26 cm H × 20 cm W × 14 cm D',
    weight: '4.0 kg',
    patina: 'Warm brown with polished planes',
    edition: 'Edition of 35',
    isLimitedEdition: true,
    inStock: false,
    shippingWindow: '2–3 weeks',
    featured: false,
  },
  {
    id: 'p_atelier_vase',
    slug: 'atelier-vase',
    name: 'Atelier Vase',
    category: 'functional',
    categoryLabel: 'Functional',
    shortDescription:
      'A sculptural vessel form with a studio-inspired profile.',
    longDescription:
      'A functional bronze vessel silhouette intended for dry arrangements and decor styling. The interior is finished for easy care; avoid standing water unless lined.',
    priceCents: 129000,
    images: ['/images/products/atelier-vase.svg', '/images/products/forge-spiral.svg', '/images/products/atelier-vase.svg'],
    dimensions: '24 cm H × 14 cm W × 14 cm D',
    weight: '2.9 kg',
    patina: 'Brushed bronze with dark recesses',
    edition: 'Open edition',
    isLimitedEdition: false,
    inStock: true,
    shippingWindow: '3–5 days',
    featured: true,
  },
  {
    id: 'p_quiet_thought',
    slug: 'quiet-thought',
    name: 'Quiet Thought',
    category: 'figurative',
    categoryLabel: 'Figurative',
    shortDescription:
      'A contemplative head study with subtle charcoal undertones.',
    longDescription:
      'A calm, modern head study — subdued expression, softened geometry, and a darkened patina that emphasizes highlights at the brow and cheek.',
    priceCents: 159000,
    images: ['/images/products/quiet-thought.svg', '/images/products/athena-bust.svg', '/images/products/quiet-thought.svg'],
    dimensions: '26 cm H × 15 cm W × 15 cm D',
    weight: '3.0 kg',
    patina: 'Charcoal brown with gentle highlight rub',
    edition: 'Edition of 40',
    isLimitedEdition: true,
    inStock: true,
    shippingWindow: '2–4 days',
    featured: false,
  },
];

export function getAllProductSlugs() {
  return products.map((p) => p.slug);
}

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export function getProducts(opts?: { category?: ProductCategory; sort?: string }) {
  const filtered = opts?.category
    ? products.filter((p) => p.category === opts.category)
    : [...products];

  switch (opts?.sort) {
    case 'price-asc':
      filtered.sort((a, b) => a.priceCents - b.priceCents);
      break;
    case 'price-desc':
      filtered.sort((a, b) => b.priceCents - a.priceCents);
      break;
    case 'name-asc':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'featured':
    default:
      filtered.sort((a, b) => Number(b.featured) - Number(a.featured));
      break;
  }
  return filtered;
}

