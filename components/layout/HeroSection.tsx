'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { ShoppingBag, Package, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const t = useTranslations('home.hero');
  const locale = useLocale();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white dark:from-blue-900 dark:via-blue-950 dark:to-indigo-950">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-[0.07]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

      <div className="container-tight relative py-12 sm:py-20 md:py-28 lg:py-32">
        <div className="max-w-2xl">
          <h1 className="text-2xl font-extrabold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-blue-100/90 sm:mt-6 sm:text-lg md:text-xl">
            {t('subtitle')}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link
              href={`/${locale}/products`}
              className={cn(
                'inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700',
                'shadow-soft-lg transition-all hover:bg-blue-50 hover:shadow-glow-primary active:scale-[0.98]',
                'sm:px-8 sm:py-4 sm:text-lg',
              )}
            >
              <ShoppingBag className="h-5 w-5" />
              {t('shopNow')}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${locale}/wholesale`}
              className={cn(
                'inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl border-2 border-white/30 px-6 py-3.5 font-bold text-white',
                'backdrop-blur-sm transition-all hover:border-white/60 hover:bg-white/10 active:scale-[0.98]',
                'sm:px-8 sm:py-4 sm:text-lg',
              )}
            >
              <Package className="h-5 w-5" />
              {t('wholesaleHub')}
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative blurs */}
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-indigo-400/15 blur-3xl" />
    </section>
  );
}
