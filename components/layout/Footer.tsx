'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSelect from '@/components/shared/LanguageSelect';
import PaymentLogos from '@/components/layout/PaymentLogos';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const tPolicy = useTranslations('policies');
  const tNav = useTranslations('nav');

  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card text-card-foreground overflow-hidden">
      {/* Wave decoration — top of footer */}
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        aria-hidden
        focusable="false"
        className="absolute inset-x-0 top-0 h-14 w-full pointer-events-none select-none"
      >
        {/* Subtle sheen layer */}
        <path
          d="M0,56 V28 C240,48 480,8 720,28 C960,48 1200,8 1440,28 V56 Z"
          className="fill-primary/[0.04] dark:fill-primary/[0.07]"
        />
        {/* Wave stroke */}
        <path
          d="M0,28 C240,48 480,8 720,28 C960,48 1200,8 1440,28"
          fill="none"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="stroke-primary/20 dark:stroke-primary/25"
        />
        {/* Second softer wave offset for depth */}
        <path
          d="M0,36 C240,56 480,16 720,36 C960,56 1200,16 1440,36"
          fill="none"
          strokeWidth="1"
          strokeLinecap="round"
          className="stroke-primary/10 dark:stroke-primary/15"
        />
      </svg>

      <div className="container-tight">
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 xs:grid-cols-2 sm:gap-x-8 md:grid-cols-4 md:py-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 md:row-span-1">
            <div className="mb-4 flex items-center gap-0.5">
              <span className="text-xl font-extrabold tracking-tight text-primary">Ocean</span>
              <span className="text-xl font-extrabold tracking-tight text-foreground">Bazar</span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t('tagline')}
            </p>
            <div className="mt-5">
              <PaymentLogos />
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">{t('shopSection')}</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><Link href={`/${locale}/products`} className="block py-1 transition-colors hover:text-primary">{t('allProducts')}</Link></li>
              <li><Link href={`/${locale}/products/featured`} className="block py-1 transition-colors hover:text-primary">{t('featured')}</Link></li>
              <li><Link href={`/${locale}/products/top-trending`} className="block py-1 transition-colors hover:text-primary">{t('topTrending')}</Link></li>
              <li><Link href={`/${locale}/products/latest`} className="block py-1 transition-colors hover:text-primary">{t('latest')}</Link></li>
              <li><Link href={`/${locale}/products/best-seller`} className="block py-1 transition-colors hover:text-primary">{t('bestSeller')}</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">{tNav('account')}</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><Link href={`/${locale}/account`} className="block py-1 transition-colors hover:text-primary">{t('myAccount')}</Link></li>
              <li><Link href={`/${locale}/orders`} className="block py-1 transition-colors hover:text-primary">{t('myOrders')}</Link></li>
              <li><Link href={`/${locale}/account/points`} className="block py-1 transition-colors hover:text-primary">{t('obPoints')}</Link></li>
              <li><Link href={`/${locale}/support`} className="block py-1 transition-colors hover:text-primary">{t('supportCenter')}</Link></li>
              <li><Link href={`/${locale}/chat`} className="block py-1 transition-colors hover:text-primary">{tNav('chat')}</Link></li>
              <li><Link href={`/${locale}/returns`} className="block py-1 transition-colors hover:text-primary">{t('returnsRefunds')}</Link></li>
              <li><Link href={`/${locale}/tickets`} className="block py-1 transition-colors hover:text-primary">{t('supportTickets')}</Link></li>
            </ul>
          </div>

          {/* Legal Notices & Blog */}
          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-foreground">{t('business')}</h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              <li><Link href={`/${locale}/marketing`} className="block py-1 transition-colors hover:text-primary">{t('whyOceanBazar')}</Link></li>
              <li><Link href={`/${locale}/business-inquiries`} className="block py-1 transition-colors hover:text-primary">{t('businessInquiries')}</Link></li>
              <li><Link href={`/${locale}/policies/privacy`} className="block py-1 transition-colors hover:text-primary">{tPolicy('privacyPolicy')}</Link></li>
              <li><Link href={`/${locale}/policies/returns`} className="block py-1 transition-colors hover:text-primary">{tPolicy('returnPolicy')}</Link></li>
              <li><Link href={`/${locale}/policies/terms`} className="block py-1 transition-colors hover:text-primary">{tPolicy('termsConditions')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-3 border-t border-border py-5 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {year} Oceanbazar &middot; Made in Bangladesh
          </p>
          <LanguageSelect variant="footer" className="justify-end" />
        </div>
      </div>
    </footer>
  );
}
