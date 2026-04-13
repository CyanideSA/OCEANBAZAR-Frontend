'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api';
import ProductCard from './ProductCard';
import { ProductGridSkeleton } from '@/components/shared/Skeleton';
import type { Product } from '@/types';

export default function FeaturedProducts() {
  const t = useTranslations('home');
  const locale = useLocale();

  const { data, isLoading } = useQuery({
    queryKey: ['products-featured', locale],
    queryFn: () => productsApi.list({ limit: 8, lang: locale }).then((r) => r.data),
  });

  const products: Product[] = data?.products ?? [];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-muted/30 rounded-2xl">
      <h2 className="text-2xl font-bold text-foreground mb-6">{t('featuredProducts')}</h2>
      {isLoading ? (
        <ProductGridSkeleton count={8} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
