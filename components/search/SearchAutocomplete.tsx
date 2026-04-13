'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { Search, Loader2 } from 'lucide-react';
import { productsApi } from '@/lib/api';
import type { Product } from '@/types';
import { cn } from '@/lib/utils';
import { getMediaUrl } from '@/lib/mediaUrl';

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export default function SearchAutocomplete({ className }: { className?: string }) {
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const debounced = useDebouncedValue(query, 280);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debounced.trim().length < 2) {
      setResults([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    productsApi
      .list({ search: debounced.trim(), limit: 10, lang: locale })
      .then((r) => { if (!cancelled) setResults(r.data?.products ?? []); })
      .catch(() => { if (!cancelled) setResults([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [debounced, locale]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const onPick = useCallback(() => { setOpen(false); setQuery(''); }, []);

  return (
    <div ref={wrapRef} className={cn('relative w-full', className)}>
      <div
        className={cn(
          'flex items-center gap-2.5 rounded-xl border border-border/60 bg-muted/30 px-3.5 py-2.5',
          'transition-all duration-200',
          open && 'border-primary/40 bg-background ring-2 ring-primary/10 shadow-soft',
        )}
      >
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder={locale === 'bn' ? 'পণ্য খুঁজুন...' : 'Search products...'}
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
          autoComplete="off"
          aria-expanded={open}
          aria-controls="search-autocomplete-list"
        />
        {loading && <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />}
      </div>

      {open && (query.trim().length >= 2 || results.length > 0) && (
        <div
          id="search-autocomplete-list"
          role="listbox"
          className={cn(
            'absolute left-0 right-0 top-full z-[60] mt-2',
            'max-h-[min(70vh,420px)] overflow-auto rounded-xl border border-border/60',
            'bg-popover text-popover-foreground shadow-soft-lg',
            'animate-scale-in',
          )}
        >
          {query.trim().length < 2 ? (
            <p className="px-4 py-4 text-sm text-muted-foreground">
              {locale === 'bn' ? 'আরও টাইপ করুন...' : 'Type at least 2 characters...'}
            </p>
          ) : results.length === 0 && !loading ? (
            <p className="px-4 py-4 text-sm text-muted-foreground">
              {locale === 'bn' ? 'কোনো পণ্য পাওয়া যায়নি' : 'No products found'}
            </p>
          ) : (
            <ul className="py-1.5">
              {results.map((p) => (
                <li key={p.id} role="option">
                  <Link
                    href={`/${locale}/product/${p.id}`}
                    onClick={onPick}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-accent"
                  >
                    <span className="relative flex h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-muted">
                      {p.primaryImage ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={getMediaUrl(p.primaryImage)} alt="" className="h-full w-full object-cover" loading="lazy" />
                      ) : (
                        <span className="flex h-full w-full items-center justify-center text-lg text-muted-foreground/40">📦</span>
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-1 font-medium text-foreground">{p.title}</span>
                      {p.retailPrice != null && (
                        <span className="mt-0.5 block text-xs font-semibold text-primary">৳{Number(p.retailPrice).toLocaleString()}</span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
