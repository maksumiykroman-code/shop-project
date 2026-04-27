import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/shop";

export default function ProductPageContent({ product }: { product: Product }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/shop" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Назад до магазину
      </Link>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">Фото скульптури</span>
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-6">{product.price} грн</p>
          <p className="text-gray-600 mb-8">{product.description}</p>
          
          <Button className="w-full md:w-auto px-8 py-6 text-lg">
            Додати в кошик
          </Button>
        </div>
      </div>
    </div>
  );
}
