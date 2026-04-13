'use client';

import { useTranslations } from 'next-intl';
import { Tag } from 'lucide-react';

const DEMO_COUPONS = [
  { code: 'WELCOME10', descKey: 'couponWelcome' },
  { code: 'SAVE500', descKey: 'couponSave' },
  { code: 'FREESHIP', descKey: 'couponShip' },
] as const;

interface Props {
  onPickCode?: (code: string) => void;
}

export default function CheckoutCouponSlider({ onPickCode }: Props) {
  const t = useTranslations('checkout');

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-muted/30 p-4">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
        <Tag className="h-4 w-4 text-primary" />
        {t('couponSliderTitle')}
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin">
        {DEMO_COUPONS.map((c) => (
          <button
            key={c.code}
            type="button"
            onClick={() => onPickCode?.(c.code)}
            className="min-w-[200px] shrink-0 rounded-xl border border-dashed border-primary/40 bg-gradient-to-br from-primary/10 to-transparent px-4 py-3 text-left transition-colors hover:border-primary"
          >
            <p className="font-mono text-sm font-bold text-primary">{c.code}</p>
            <p className="text-xs text-muted-foreground">{t(c.descKey)}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
