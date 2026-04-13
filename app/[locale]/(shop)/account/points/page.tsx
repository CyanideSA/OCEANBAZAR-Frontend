'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useQuery } from '@tanstack/react-query';
import { obPointsApi } from '@/lib/api';

export default function AccountPointsPage() {
  const locale = useLocale();
  const t = useTranslations('obPoints');
  const tc = useTranslations('common');

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['ob-points-balance'],
    queryFn: () => obPointsApi.balance().then((r) => r.data as { balance: number; tier: string; lifetimeSpend: number }),
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{t('title')}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Track your OB Points balance and tier.</p>
        </div>
        <Link href={`/${locale}/account`} className="text-sm font-semibold text-primary hover:underline">
          {tc('back')}
        </Link>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">{tc('loading')}</p>
      ) : error ? (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-4">
          <p className="text-sm text-destructive">{tc('error')}</p>
          <button type="button" onClick={() => refetch()} className="mt-2 text-sm font-semibold text-primary hover:underline">
            {tc('retry')}
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t('balance')}</p>
            <p className="mt-2 text-3xl font-extrabold text-primary">{data?.balance?.toLocaleString() ?? 0}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t('tier')}</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{data?.tier ?? '—'}</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{t('lifetimeSpend')}</p>
            <p className="mt-2 text-2xl font-bold text-foreground">{tc('taka')}{(data?.lifetimeSpend ?? 0).toLocaleString()}</p>
          </div>
        </div>
      )}
    </div>
  );
}
