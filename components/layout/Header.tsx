'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, User, ChevronRight, LayoutGrid } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import LanguageSelect from '@/components/shared/LanguageSelect';
import ThemeToggle from '@/components/theme/ThemeToggle';
import SearchAutocomplete from '@/components/search/SearchAutocomplete';
import CategoryMegaMenu from '@/components/layout/CategoryMegaMenu';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const { user, isAuthenticated } = useAuthStore();
  const { mobileMenuOpen, setMobileMenuOpen } = useUIStore();
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaMobile, setMegaMobile] = useState(false);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  function closeAll() {
    setMobileMenuOpen(false);
    setMegaMobile(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 glass shadow-soft">
        <div className="container-tight">

          {/* ── Top bar ── */}
          <div className="flex items-center gap-2 py-2.5 md:gap-5 md:py-3.5">

            {/* Logo */}
            <Link href={`/${locale}`} className="group flex shrink-0 items-center gap-0.5">
              <span className="text-xl font-extrabold tracking-tight text-primary transition-colors sm:text-2xl">Ocean</span>
              <span className="text-xl font-extrabold tracking-tight text-foreground transition-colors sm:text-2xl">Bazar</span>
            </Link>

            {/* Desktop: Categories button */}
            <div className="hidden md:block">
              <CategoryMegaMenu
                desktopOpen={megaOpen}
                onDesktopOpenChange={setMegaOpen}
                mobileOpen={megaMobile}
                onMobileOpenChange={setMegaMobile}
              />
            </div>

            {/* Desktop: Search */}
            <div className="hidden min-w-0 flex-1 md:block">
              <SearchAutocomplete />
            </div>

            {/* Right-side icons */}
            <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
              {/* Language — desktop + sm */}
              <div className="hidden sm:block">
                <LanguageSelect />
              </div>

              {/* Theme toggle */}
              <ThemeToggle />

              {/* Account — desktop shows name, mobile shows icon only */}
              {isAuthenticated ? (
                <Link
                  href={`/${locale}/account`}
                  className={cn(
                    'flex items-center gap-1.5 rounded-lg border border-border/60 px-2 py-2 text-foreground',
                    'transition-all hover:border-primary/30 hover:bg-accent md:px-3',
                  )}
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-3.5 w-3.5" />
                  </div>
                  <span className="hidden max-w-[7rem] truncate text-sm font-medium md:inline">
                    {user?.name?.split(' ')[0]}
                  </span>
                </Link>
              ) : (
                <Link
                  href={`/${locale}/auth/login`}
                  className={cn(
                    'hidden rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground md:inline-flex',
                    'shadow-soft transition-all hover:shadow-glow-primary hover:brightness-110 active:scale-[0.98]',
                  )}
                >
                  {t('login')}
                </Link>
              )}

              {/* Hamburger — mobile only */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border/60 text-foreground transition-colors hover:bg-accent md:hidden"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* ── Mobile search bar (full width, below top bar) ── */}
          <div className="pb-2.5 md:hidden">
            <SearchAutocomplete />
          </div>

          {/* ── Desktop secondary nav ── */}
          <nav className="hidden border-t border-border/40 md:block">
            <div className="flex items-center gap-1 py-1.5">
              {[
                { href: `/${locale}`,           label: t('home')         },
                { href: `/${locale}/products`,  label: t('products')     },
                { href: `/${locale}/wholesale`, label: t('wholesaleHub') },
                ...(isAuthenticated
                  ? [
                      { href: `/${locale}/orders`, label: t('orders')  },
                      { href: `/${locale}/chat`,   label: t('tickets') },
                    ]
                  : []),
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

        </div>
      </header>

      {/* ── Mobile drawer overlay ── rendered outside header so it fills full viewport ── */}

      {/* Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm md:hidden"
          aria-hidden
          onClick={closeAll}
        />
      )}

      {/* Drawer panel */}
      <div
        className={cn(
          'fixed inset-y-0 right-0 z-[61] flex w-[min(85vw,340px)] flex-col bg-background shadow-2xl md:hidden',
          'transition-transform duration-300 ease-in-out',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        aria-label="Mobile navigation"
        role="dialog"
        aria-modal="true"
      >
        {/* Drawer header — logo + single X close */}
        <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
          <Link href={`/${locale}`} onClick={closeAll} className="flex items-center gap-0.5">
            <span className="text-lg font-extrabold tracking-tight text-primary">Ocean</span>
            <span className="text-lg font-extrabold tracking-tight text-foreground">Bazar</span>
          </Link>
          <button
            type="button"
            onClick={closeAll}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer body — scrollable */}
        <div className="flex-1 overflow-y-auto">

          {/* Categories (opens full-screen sheet above) */}
          <div className="border-b border-border/40 p-3">
            <button
              type="button"
              onClick={() => setMegaMobile(true)}
              className="flex min-h-[48px] w-full items-center gap-3 rounded-xl bg-primary/[0.08] px-4 py-3 text-left font-semibold text-foreground transition-colors hover:bg-primary/[0.14] active:bg-primary/20"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <LayoutGrid className="h-4 w-4" />
              </span>
              <span className="flex-1">{t('categories')}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          </div>

          {/* Quick nav links */}
          <div className="p-3">
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Navigate
            </p>
            <nav className="space-y-0.5">
              {([
                { href: `/${locale}`,                       label: t('home'),         icon: '🏠' },
                { href: `/${locale}/products/top-trending`, label: 'Top Trending',    icon: '🔥' },
                { href: `/${locale}/products`,              label: 'All Products',    icon: '📦' },
                { href: `/${locale}/products/top-trending`, label: 'Top Brands',      icon: '⭐' },
                { href: `/${locale}/wholesale`,             label: t('wholesaleHub'), icon: '🏪' },
              ] as const).map((link) => (
                <Link
                  key={link.href + link.label}
                  href={link.href}
                  onClick={closeAll}
                  className="flex min-h-[48px] items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent active:bg-accent"
                >
                  <span className="text-base leading-none">{link.icon}</span>
                  <span className="flex-1">{link.label}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              ))}
            </nav>
          </div>

          {/* Account section */}
          <div className="border-t border-border/40 p-3">
            <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Account
            </p>
            {isAuthenticated ? (
              <div className="space-y-0.5">
                <Link
                  href={`/${locale}/account`}
                  onClick={closeAll}
                  className="flex min-h-[48px] items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <span className="text-base leading-none">👤</span>
                  <span className="flex-1">{user?.name?.split(' ')[0] ?? t('account')}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
                <Link
                  href={`/${locale}/orders`}
                  onClick={closeAll}
                  className="flex min-h-[48px] items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
                >
                  <span className="text-base leading-none">📋</span>
                  <span className="flex-1">{t('orders')}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Link>
              </div>
            ) : (
              <Link
                href={`/${locale}/auth/login`}
                onClick={closeAll}
                className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-soft transition-all hover:brightness-110 active:scale-[0.98]"
              >
                <User className="h-4 w-4" />
                {t('login')} / {t('register')}
              </Link>
            )}
          </div>

          {/* Language */}
          <div className="border-t border-border/40 p-3">
            <LanguageSelect className="w-full justify-between" />
          </div>

        </div>
      </div>

      {/* Category full-screen sheet — rendered here so it sits above drawer */}
      {megaMobile && (
        <div className="fixed inset-0 z-[62] md:hidden">
          <CategoryMegaMenu
            desktopOpen={false}
            onDesktopOpenChange={() => {}}
            mobileOpen={megaMobile}
            onMobileOpenChange={(v) => {
              setMegaMobile(v);
            }}
          />
        </div>
      )}
    </>
  );
}
