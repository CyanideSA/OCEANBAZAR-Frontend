'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';
import type { ProductDetail, ProductReviewItem } from '@/types';
import ProductStarRating from './ProductStarRating';
import { cn } from '@/lib/utils';

type Tab = 'description' | 'specs' | 'reviews';

interface Props {
  product: ProductDetail;
  tab: Tab;
  onTab: (t: Tab) => void;
  reviews: ProductReviewItem[];
}

export default function ProductDetailTabs({ product, tab, onTab, reviews }: Props) {
  const t = useTranslations('productDetail');
  /* Mobile accordion: track which panels are open independently */
  const [openPanels, setOpenPanels] = useState<Set<Tab>>(new Set(['description']));

  const togglePanel = (id: Tab) => {
    setOpenPanels((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    onTab(id); /* keep parent in sync */
  };

  const specEntries: [string, string][] = [];
  if (product.weight != null) {
    specEntries.push([t('weight'), `${product.weight}${product.weightUnit ? ` ${product.weightUnit}` : ''}`]);
  }
  if (product.sku) specEntries.push([t('sku'), product.sku]);
  if (product.attributesExtra) {
    for (const [k, v] of Object.entries(product.attributesExtra)) specEntries.push([k, v]);
  }
  if (product.specifications) {
    for (const [k, v] of Object.entries(product.specifications)) specEntries.push([k, v]);
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'description', label: t('tabDescription') },
    { id: 'specs',       label: t('tabSpecs')        },
    { id: 'reviews',     label: t('tabReviews')      },
  ];

  function TabContent({ id }: { id: Tab }) {
    if (id === 'description') {
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground">
          {product.description ? (
            <p className="whitespace-pre-wrap leading-relaxed">{product.description}</p>
          ) : (
            <p className="text-muted-foreground">{t('noDescription')}</p>
          )}
        </div>
      );
    }
    if (id === 'specs') {
      return (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <tbody>
              {specEntries.map(([k, v]) => (
                <tr key={k} className="border-b border-border last:border-0">
                  <th className="w-1/3 bg-muted/50 px-4 py-3 text-left font-medium text-foreground">{k}</th>
                  <td className="px-4 py-3 text-muted-foreground">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {specEntries.length === 0 && <p className="p-4 text-muted-foreground">{t('noSpecs')}</p>}
        </div>
      );
    }
    return (
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 rounded-xl border border-border bg-muted/30 p-4">
          <ProductStarRating value={product.ratingAvg ?? 0} size="md" />
          <span className="text-lg font-semibold text-foreground">
            {(product.ratingAvg ?? 0).toFixed(1)} / 5
          </span>
          <span className="text-sm text-muted-foreground">
            {product.reviewCount ?? 0} {t('reviewCountLabel')}
          </span>
        </div>
        {reviews.length === 0 ? (
          <p className="text-muted-foreground">{t('noReviews')}</p>
        ) : (
          <ul className="space-y-4">
            {reviews.map((r, i) => (
              <li key={i} className="rounded-xl border border-border p-4">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="font-medium text-foreground">{r.authorName}</span>
                  <ProductStarRating value={r.rating} size="sm" />
                </div>
                {r.body && <p className="text-sm text-muted-foreground">{r.body}</p>}
                <p className="mt-2 text-xs text-muted-foreground">
                  {new Date(r.createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="mt-8 border-t border-border pt-6 sm:mt-12 sm:pt-8">

      {/* ── Desktop: tab bar ── */}
      <div className="hidden sm:block">
        <div className="flex flex-wrap gap-2 border-b border-border">
          {tabs.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => onTab(id)}
              className={cn(
                '-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors',
                tab === id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="py-6">
          <TabContent id={tab} />
        </div>
      </div>

      {/* ── Mobile: accordion ── */}
      <div className="divide-y divide-border rounded-xl border border-border sm:hidden">
        {tabs.map(({ id, label }) => {
          const isOpen = openPanels.has(id);
          return (
            <div key={id}>
              <button
                type="button"
                onClick={() => togglePanel(id)}
                className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
              >
                <span className={cn('text-sm font-semibold', isOpen ? 'text-primary' : 'text-foreground')}>
                  {label}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
                    isOpen && 'rotate-180'
                  )}
                />
              </button>
              {isOpen && (
                <div className="border-t border-border/60 px-4 pb-5 pt-4">
                  <TabContent id={id} />
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
}
