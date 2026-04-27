export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  priceCents: number;
  description: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  categoryLabel: string;
  dimensions: string;
  weight: string;
  patina: string;
  images: { src: string; alt: string }[];
  stock: number;
  featured: boolean;
  // Остання порція полів, що випали:
  edition: string;           
  isLimitedEdition: boolean; 
  inStock: boolean;          
  shippingWindow: string;    
}

const products: Product[] = [
  {
    id: "1",
    slug: "bronze-warrior",
    name: "Бронзовий воїн",
    price: 5000,
    priceCents: 500000,
    description: "Скульптура ручної роботи.",
    shortDescription: "Ручна робота",
    longDescription: "Деталізована скульптура з бронзи.",
    category: "sculpture",
    categoryLabel: "Скульптури",
    dimensions: "20x10x10 cm",
    weight: "2kg",
    patina: "Classic Brown",
    images: [{ src: "/images/warrior.jpg", alt: "Бронзовий воїн" }],
    stock: 1,
    featured: true,
    edition: "Original",
    isLimitedEdition: true,
    inStock: true,
    shippingWindow: "2-4 weeks"
  }
];

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getAllProducts(): Promise<Product[]> {
  return products;
}
