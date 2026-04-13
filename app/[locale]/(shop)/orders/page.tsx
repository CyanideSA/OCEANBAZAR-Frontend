'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Package, AlertCircle } from 'lucide-react';
import { ordersApi } from '@/lib/api';
import { OrderRowSkeleton } from '@/components/shared/Skeleton';
import type { Order } from '@/types';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-warning/10 text-warning-foreground dark:text-warning',
  confirmed: 'bg-primary/10 text-primary',
  processing: 'bg-violet-500/10 text-violet-700 dark:text-violet-400',
  shipped: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-400',
  delivered: 'bg-success/10 text-success',
  cancelled: 'bg-destructive/10 text-destructive',
  returned: 'bg-muted text-muted-foreground',
};

export default function OrdersPage() {
  const t = useTranslations('orders');
  const tc = useTranslations('common');
  const locale = useLocale();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.list().then((r) => r.data),
  });

  const orders: Order[] = data?.orders ?? [];

  return (
    <div className="container-tight py-4 max-w-4xl sm:py-8">
      <h1 className="text-lg font-bold text-foreground mb-4 sm:text-2xl sm:mb-6">{t('title')}</h1>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => <OrderRowSkeleton key={i} />)}
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-destructive/30 bg-destructive/5 py-14 text-center">
          <AlertCircle className="h-10 w-10 text-destructive/50" />
          <p className="font-semibold text-foreground">{tc('error')}</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="mt-1 text-sm font-semibold text-primary hover:underline"
          >
            {tc('retry')}
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-muted-foreground">{t('noOrders')}</p>
          <Link href={`/${locale}/products`} className="mt-4 inline-block text-primary hover:underline">
            {t('startShopping')}
          </Link>
        </div>
      ) : (
        <div className="space-y-3 sm:space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-border bg-card p-3 shadow-soft transition-shadow hover:shadow-soft-md sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-foreground sm:text-base">{order.orderNumber}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 sm:text-sm">
                    {new Date(order.createdAt).toLocaleDateString(locale === 'bn' ? 'bn-BD' : 'en-US')}
                  </p>
                </div>
                <span className={`shrink-0 text-2xs font-semibold px-2 py-0.5 rounded-full sm:text-xs sm:px-2.5 sm:py-1 ${STATUS_COLORS[order.status]}`}>
                  {t(order.status as keyof typeof t)}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2.5 sm:mt-4">
                <span className="text-sm font-bold text-primary sm:text-lg">৳{Number(order.total).toLocaleString()}</span>
                <div className="flex gap-1">
                  <Link
                    href={`/${locale}/orders/${order.id}?tab=tracking`}
                    className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/10 min-h-[40px]"
                  >
                    {t('track')}
                  </Link>
                  <Link
                    href={`/${locale}/orders/${order.id}`}
                    className="inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent min-h-[40px]"
                  >
                    {t('details')}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
