'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { categoriesApi } from '@/lib/api';
import type { Category } from '@/types';

export default function CategoryGrid() {
  const t = useTranslations('home');
  const locale = useLocale();

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => categoriesApi.list().then((r) => r.data),
  });

  const categories: Category[] = data?.categories ?? [];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-foreground mb-6">{t('categories')}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/${locale}/products?category=${cat.id}`}
            className="flex flex-col items-center p-4 bg-card border border-border rounded-xl hover:border-primary/40 hover:shadow-md transition-all group"
          >
            <div className="text-3xl mb-2">{cat.icon || '📦'}</div>
            <span className="text-sm font-medium text-foreground text-center group-hover:text-primary transition-colors">
              {locale === 'bn' ? cat.nameBn : cat.nameEn}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
