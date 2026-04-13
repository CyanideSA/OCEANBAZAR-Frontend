'use client';

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/stores/cartStore';
import { cn } from '@/lib/utils';

export default function FloatingCartButton() {
  const { cart, setOpen } = useCartStore();
  const count = cart?.itemCount ?? 0;

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
      className={cn(
        'fixed right-6 z-[45] md:right-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:![bottom:auto]',
        'flex h-14 w-14 items-center justify-center md:rounded-l-2xl md:rounded-r-none',
        'rounded-2xl border border-border/30',
        'bg-primary text-primary-foreground shadow-soft-lg',
        'transition-all hover:scale-105 hover:shadow-glow-primary active:scale-95',
        'focus-ring',
      )}
      aria-label="Open cart"
    >
      <span className="relative inline-flex">
        <ShoppingCart className="h-5 w-5" />
        {count > 0 && (
          <span
            className={cn(
              'absolute -right-2.5 -top-2.5 flex h-5 min-w-[1.25rem] items-center justify-center',
              'rounded-full bg-destructive px-1 text-2xs font-bold text-destructive-foreground',
              'shadow-sm ring-2 ring-background',
            )}
          >
            {count > 99 ? '99+' : count}
          </span>
        )}
      </span>
    </button>
  );
}
