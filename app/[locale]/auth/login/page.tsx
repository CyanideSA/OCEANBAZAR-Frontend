'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { validatePassword } from '@/lib/passwordRules';
import type { User } from '@/types';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

type Step = 'method' | 'otp' | 'password';
type Method = 'email' | 'phone' | 'password';

export default function LoginPage() {
  const t = useTranslations('auth');
  const tc = useTranslations('common');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { setUser } = useAuthStore();

  const [method, setMethod] = useState<Method>('email');
  const [step, setStep] = useState<Step>('method');
  const [target, setTarget] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSendOtp() {
    setLoading(true); setError('');
    try {
      await authApi.sendOtp(target, 'login');
      setStep('otp');
    } catch (e: unknown) {
      setError((e as { response?: { data?: { error?: string } } }).response?.data?.error ?? tc('error'));
    } finally { setLoading(false); }
  }

  async function handleVerifyOtp() {
    setLoading(true); setError('');
    try {
      const { data } = await authApi.verifyOtp(target, otp);
      setUser(data.user as User, data.access);
      router.push(`/${locale}`);
    } catch (e: unknown) {
      setError((e as { response?: { data?: { error?: string } } }).response?.data?.error ?? tc('error'));
    } finally { setLoading(false); }
  }

  async function handlePasswordLogin() {
    setLoading(true); setError('');
    try {
      const { data } = await authApi.login(target, password);
      setUser(data.user as User, data.access);
      router.push(`/${locale}`);
    } catch (e: unknown) {
      setError((e as { response?: { data?: { error?: string } } }).response?.data?.error ?? tc('error'));
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href={`/${locale}`} className="inline-flex items-center gap-1">
              <span className="text-2xl font-bold text-primary">Ocean</span>
              <span className="text-2xl font-bold text-foreground">Bazar</span>
            </Link>
            <p className="text-muted-foreground mt-2">{t('login')}</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-lg px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {step === 'method' && (
            <div className="space-y-4">
              {/* Method tabs */}
              <div className="flex rounded-lg border border-border overflow-hidden">
                {(['email', 'phone', 'password'] as Method[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMethod(m)}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      method === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-accent'
                    }`}
                  >
                    {m === 'email' ? t('email').split(' ')[0] : m === 'phone' ? t('phone').split(' ')[0] : t('password')}
                  </button>
                ))}
              </div>

              <input
                type={method === 'email' ? 'email' : method === 'phone' ? 'tel' : 'text'}
                placeholder={method === 'password' ? `${t('email')} / ${t('phone')}` : method === 'email' ? t('email') : t('phone')}
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
              />

              {method === 'password' && (
                <input
                  type="password"
                  placeholder={t('password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground"
                />
              )}

              <button
                onClick={method === 'password' ? handlePasswordLogin : handleSendOtp}
                disabled={loading || !target}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:brightness-110 disabled:opacity-50 transition-all"
              >
                {loading ? tc('loading') : method === 'password' ? t('login') : t('sendOtp')}
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
                <div className="relative text-center text-xs text-muted-foreground bg-card px-3 w-fit mx-auto">{t('orContinueWith')}</div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <a href={`${BACKEND_URL}/api/auth/social/google`} className="flex items-center justify-center gap-1.5 border border-border rounded-xl py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
                  <span>G</span> Google
                </a>
                <a href={`${BACKEND_URL}/api/auth/social/facebook`} className="flex items-center justify-center gap-1.5 border border-border rounded-xl py-2.5 text-sm font-medium text-foreground hover:bg-accent transition-colors">
                  <span>f</span> Facebook
                </a>
              </div>

              <p className="text-center text-sm text-muted-foreground mt-4">
                {t('dontHaveAccount')}{' '}
                <Link href={`/${locale}/auth/register`} className="text-primary font-medium hover:underline">{t('register')}</Link>
              </p>
            </div>
          )}

          {step === 'otp' && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground text-center">{t('otpSent')}</p>
              <input
                type="text"
                placeholder={t('otpPlaceholder')}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 text-center text-2xl font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                onClick={handleVerifyOtp}
                disabled={loading || otp.length !== 6}
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:brightness-110 disabled:opacity-50 transition-all"
              >
                {loading ? tc('loading') : t('verifyOtp')}
              </button>
              <button onClick={() => setStep('method')} className="w-full text-muted-foreground text-sm hover:underline">
                {tc('back')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
