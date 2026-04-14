'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSelect from '@/components/shared/LanguageSelect';
import PaymentLogos from '@/components/layout/PaymentLogos';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Waves,
} from 'lucide-react';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('footer');
  const tPolicy = useTranslations('policies');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.75;
    }
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative overflow-hidden text-white">
      {/* ── Realistic Ocean Video Background ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        poster="https://images.pexels.com/videos/1409899/free-video-1409899.jpg?auto=compress&cs=tinysrgb&w=1920"
      >
        {/* Pexels free ocean stock — dark aerial ocean waves */}
        <source
          src="https://videos.pexels.com/video-files/1409899/1409899-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark overlay — ensures text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-blue-950/85 to-slate-950/95" />

      {/* Animated shimmer across the footer */}
      <div className="footer-shimmer absolute inset-0 pointer-events-none" />

      {/* Top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

      {/* ── Content ── */}
      <div className="relative z-10">
        <motion.div
          className="container-tight"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="grid grid-cols-2 gap-x-6 gap-y-8 py-10 xs:grid-cols-2 sm:gap-x-8 md:grid-cols-4 md:py-16">
            {/* Brand */}
            <motion.div variants={itemVariants} className="col-span-2 md:col-span-1 md:row-span-1">
              <div className="mb-4 flex items-center gap-2">
                <motion.div
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-blue-500/25"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Waves className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <span className="text-xl font-extrabold tracking-tight text-white">Ocean</span>
                  <span className="text-xl font-extrabold tracking-tight text-cyan-300">Bazar</span>
                </div>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-blue-100/80">
                {t('tagline')}
              </p>
              <div className="mt-5">
                <PaymentLogos />
              </div>
              <div className="mt-5 flex gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-blue-200 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
                    aria-label={social.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Shop */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-cyan-300">{t('shopSection')}</h4>
              <ul className="space-y-1.5 text-sm text-blue-100/80">
                <li><Link href={`/${locale}/products`} className="block py-1 transition-colors hover:text-white">{t('allProducts')}</Link></li>
                <li><Link href={`/${locale}/products/featured`} className="block py-1 transition-colors hover:text-white">{t('featured')}</Link></li>
                <li><Link href={`/${locale}/products/top-trending`} className="block py-1 transition-colors hover:text-white">{t('topTrending')}</Link></li>
                <li><Link href={`/${locale}/products/latest`} className="block py-1 transition-colors hover:text-white">{t('latest')}</Link></li>
                <li><Link href={`/${locale}/products/best-seller`} className="block py-1 transition-colors hover:text-white">{t('bestSeller')}</Link></li>
              </ul>
            </motion.div>

            {/* Account */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-cyan-300">{tNav('account')}</h4>
              <ul className="space-y-1.5 text-sm text-blue-100/80">
                <li><Link href={`/${locale}/account`} className="block py-1 transition-colors hover:text-white">{t('myAccount')}</Link></li>
                <li><Link href={`/${locale}/orders`} className="block py-1 transition-colors hover:text-white">{t('myOrders')}</Link></li>
                <li><Link href={`/${locale}/account/points`} className="block py-1 transition-colors hover:text-white">{t('obPoints')}</Link></li>
                <li><Link href={`/${locale}/support`} className="block py-1 transition-colors hover:text-white">{t('supportCenter')}</Link></li>
                <li><Link href={`/${locale}/chat`} className="block py-1 transition-colors hover:text-white">{tNav('chat')}</Link></li>
                <li><Link href={`/${locale}/returns`} className="block py-1 transition-colors hover:text-white">{t('returnsRefunds')}</Link></li>
                <li><Link href={`/${locale}/tickets`} className="block py-1 transition-colors hover:text-white">{t('supportTickets')}</Link></li>
              </ul>
            </motion.div>

            {/* Business & Legal */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-cyan-300">{t('business')}</h4>
              <ul className="space-y-1.5 text-sm text-blue-100/80">
                <li><Link href={`/${locale}/marketing`} className="block py-1 transition-colors hover:text-white">{t('whyOceanBazar')}</Link></li>
                <li><Link href={`/${locale}/business-inquiries`} className="block py-1 transition-colors hover:text-white">{t('businessInquiries')}</Link></li>
                <li><Link href={`/${locale}/policies/privacy`} className="block py-1 transition-colors hover:text-white">{tPolicy('privacyPolicy')}</Link></li>
                <li><Link href={`/${locale}/policies/returns`} className="block py-1 transition-colors hover:text-white">{tPolicy('returnPolicy')}</Link></li>
                <li><Link href={`/${locale}/policies/terms`} className="block py-1 transition-colors hover:text-white">{tPolicy('termsConditions')}</Link></li>
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div
            className="border-t border-white/10"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          {/* Bottom bar */}
          <motion.div
            className="flex flex-col items-center gap-3 py-5 text-center sm:flex-row sm:justify-between sm:text-left"
            variants={itemVariants}
          >
            <p className="text-xs text-blue-200/70">
              &copy; {year} Oceanbazar &middot; Made in Bangladesh
            </p>
            <LanguageSelect variant="footer" className="justify-end" />
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .footer-shimmer {
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255, 255, 255, 0.03) 45%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0.03) 55%,
            transparent 60%
          );
          background-size: 200% 100%;
          animation: footer-shimmer-move 6s ease-in-out infinite;
        }

        @keyframes footer-shimmer-move {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>
    </footer>
  );
}
