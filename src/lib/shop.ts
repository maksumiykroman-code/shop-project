export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  categoryLabel: string;
  images: { src: string; alt: string }[];
  specs?: Record<string, string>;
  stock?: number;
  featured?: boolean;
}

const products: Product[] = [
  {
    id: "1",
    slug: "bronze-warrior",
    name: "Бронзовий воїн",
    price: 5000,
    description: "Скульптура ручної роботи.",
    shortDescription: "Ручна робота",
    longDescription: "Деталізована скульптура з бронзи.",
    category: "sculpture",
    categoryLabel: "Скульптури",
    images: [{ src: "/images/warrior.jpg", alt: "Бронзовий воїн" }],
    stock: 1,
    featured: true
  }
];

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getAllProducts(): Promise<Product[]> {
  return products;
}
