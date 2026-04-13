'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { getMediaUrl } from '@/lib/mediaUrl';
import type { ProductImage } from '@/types';
import { cn } from '@/lib/utils';

const LENS = 100;
const ZOOM_PANEL = 280;

interface Props {
  images: ProductImage[];
  title: string;
  activeIndex: number;
  onSelectIndex: (i: number) => void;
}

export default function ProductZoomGallery({ images, title, activeIndex, onSelectIndex }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [hover, setHover] = useState(false);
  const [lens, setLens] = useState({ left: 0, top: 0 });
  const [imgBox, setImgBox] = useState({ w: 0, h: 0, left: 0, top: 0 });

  /* ── Touch / swipe state ── */
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    touchStartX.current = null;
    touchStartY.current = null;
    if (Math.abs(dx) < 30 || dy > Math.abs(dx)) return; /* not a horizontal swipe */
    if (dx < 0) {
      onSelectIndex(Math.min(activeIndex + 1, images.length - 1));
    } else {
      onSelectIndex(Math.max(activeIndex - 1, 0));
    }
  };

  const current = images[activeIndex];
  const isVideo = current?.mediaType === 'video';
  const src = current?.url ? getMediaUrl(current.url) : '';

  const measure = useCallback(() => {
    const wrap = wrapRef.current;
    const im = imgRef.current;
    if (!wrap || !im) return;
    const wr = wrap.getBoundingClientRect();
    const ir = im.getBoundingClientRect();
    setImgBox({ w: ir.width, h: ir.height, left: ir.left - wr.left, top: ir.top - wr.top });
  }, []);

  const onImgLoad = useCallback(() => { measure(); }, [measure]);

  /* Desktop hover zoom — only fires on lg+ (pointer: fine) */
  const onMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isVideo) return;
      const wrap = wrapRef.current;
      const im = imgRef.current;
      if (!wrap || !im) return;
      const wr = wrap.getBoundingClientRect();
      const ir = im.getBoundingClientRect();
      const x = e.clientX - ir.left;
      const y = e.clientY - ir.top;
      const half = LENS / 2;
      let left = Math.max(0, Math.min(x - half, ir.width - LENS));
      let top  = Math.max(0, Math.min(y - half, ir.height - LENS));
      setLens({ left: ir.left - wr.left + left, top: ir.top - wr.top + top });
      setImgBox({ w: ir.width, h: ir.height, left: ir.left - wr.left, top: ir.top - wr.top });
    },
    [isVideo]
  );

  const scale = imgBox.w ? ZOOM_PANEL / LENS : 0;
  const lensInImg = { left: lens.left - imgBox.left, top: lens.top - imgBox.top };

  return (
    <div className="space-y-3">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-start">

        {/* ── Main image / carousel ── */}
        <div
          ref={wrapRef}
          className={cn(
            'relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted lg:max-w-xl',
            !isVideo && 'lg:cursor-crosshair'
          )}
          /* Desktop zoom — only on hover (pointer: fine means mouse) */
          onMouseEnter={() => { if (!isVideo) { setHover(true); measure(); } }}
          onMouseLeave={() => setHover(false)}
          onMouseMove={onMove}
          /* Mobile swipe */
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {!src ? (
            <div className="flex h-full w-full items-center justify-center text-6xl text-muted-foreground/30">📦</div>
          ) : isVideo ? (
            <video src={src} controls className="h-full w-full object-cover" playsInline />
          ) : (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src={src}
                alt={title}
                className="h-full w-full object-contain"
                onLoad={onImgLoad}
                draggable={false}
                loading="lazy"
              />
              {/* Zoom lens overlay — desktop only */}
              {hover && imgBox.w > 0 && (
                <div
                  className="pointer-events-none absolute z-10 hidden border-2 border-white shadow-md ring-1 ring-black/20 lg:block"
                  style={{ width: LENS, height: LENS, left: lens.left, top: lens.top }}
                />
              )}
            </>
          )}

          {/* Mobile prev/next arrows — shown only when multiple images */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous image"
                onClick={() => onSelectIndex(Math.max(activeIndex - 1, 0))}
                className={cn(
                  'absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/80 p-1.5 shadow-md backdrop-blur-sm transition-opacity lg:hidden',
                  activeIndex === 0 ? 'opacity-30 pointer-events-none' : 'opacity-80'
                )}
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={() => onSelectIndex(Math.min(activeIndex + 1, images.length - 1))}
                className={cn(
                  'absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-background/80 p-1.5 shadow-md backdrop-blur-sm transition-opacity lg:hidden',
                  activeIndex === images.length - 1 ? 'opacity-30 pointer-events-none' : 'opacity-80'
                )}
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>

              {/* Dot indicators — mobile only */}
              <div className="absolute bottom-2 left-1/2 z-20 flex -translate-x-1/2 gap-1.5 lg:hidden">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`Image ${i + 1}`}
                    onClick={() => onSelectIndex(i)}
                    className={cn(
                      'h-1.5 rounded-full transition-all',
                      i === activeIndex ? 'w-5 bg-primary' : 'w-1.5 bg-foreground/30'
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Desktop zoom panel */}
        {!isVideo && src && hover && imgBox.w > 0 && (
          <div
            className="relative hidden shrink-0 overflow-hidden rounded-xl border border-border bg-background shadow-inner lg:block"
            style={{ width: ZOOM_PANEL, height: ZOOM_PANEL }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              className="max-w-none"
              loading="lazy"
              style={{
                width: imgBox.w * scale,
                height: imgBox.h * scale,
                transform: `translate(${-lensInImg.left * scale}px, ${-lensInImg.top * scale}px)`,
              }}
              draggable={false}
            />
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, i) => {
            const u = getMediaUrl(img.url);
            return (
              <button
                key={img.id ?? i}
                type="button"
                onClick={() => onSelectIndex(i)}
                className={cn(
                  'relative h-[60px] w-[60px] shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:h-[72px] sm:w-[72px]',
                  i === activeIndex ? 'border-primary' : 'border-border hover:border-primary/50'
                )}
              >
                {img.mediaType === 'video' ? (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <Play className="h-5 w-5 text-muted-foreground" />
                  </div>
                ) : (
                  <Image src={u} alt="" width={64} height={64} className="h-full w-full object-cover" unoptimized={u.startsWith('http')} />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
