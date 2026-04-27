export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  description: string;
  images: { src: string; alt: string }[];
}

const products: Product[] = [
  {
    id: "1",
    slug: "bronze-warrior",
    name: "Бронзовий воїн",
    price: 5000,
    description: "Неймовірна скульптура ручної роботи.",
    images: [{ src: "/images/warrior.jpg", alt: "Бронзовий воїн" }]
  }
];

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return products.find((p) => p.slug === slug);
}

export async function getAllProducts(): Promise<Product[]> {
  return products;
}
