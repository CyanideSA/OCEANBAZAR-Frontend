'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  variant?: 'default' | 'footer';
};

export default function LanguageSelect({ className, variant = 'default' }: Props) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onChange = (next: string) => {
    if (next === locale) return;
    const segments = pathname.split('/');
    segments[1] = next;
    router.push(segments.join('/'));
    try {
      localStorage.setItem('ob_locale', next);
    } catch {
      /* ignore */
    }
  };

  return (
    <label
      className={cn(
        'inline-flex items-center gap-2',
        variant === 'footer' && 'text-sm text-muted-foreground',
        className
      )}
    >
      <Globe className="h-4 w-4 shrink-0 opacity-80" aria-hidden />
      <select
        value={locale}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          'cursor-pointer rounded-md border border-border bg-background py-1.5 pl-2 pr-8 text-sm font-medium text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-ring',
          variant === 'footer' && 'border-border/60 bg-card'
        )}
        aria-label="Language"
      >
        <option value="bn">বাংলা</option>
        <option value="en">English</option>
      </select>
    </label>
  );
}
