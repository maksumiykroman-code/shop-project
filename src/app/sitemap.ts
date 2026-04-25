import type { MetadataRoute } from 'next';
import { getAllProductSlugs } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://localhost:3000';
  const productUrls = getAllProductSlugs().map((slug) => ({
    url: `${baseUrl}/product/${slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/shop`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
    { url: `${baseUrl}/cart`, lastModified: new Date() },
    { url: `${baseUrl}/checkout`, lastModified: new Date() },
    ...productUrls,
  ];
}

