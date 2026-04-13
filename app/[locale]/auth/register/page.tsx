'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { validatePassword, getPasswordStrength } from '@/lib/passwordRules';
import type { User } from '@/types';

export default function RegisterPage() {
  const t = useTranslations('auth');
  const tc = useTranslations('common');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const { setUser } = useAuthStore();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pwErrors, setPwErrors] = useState<string[]>([]);

  const strength = getPasswordStrength(form.password);
  const strengthColor = { weak: 'bg-red-400', fair: 'bg-yellow-400', strong: 'bg-green-500' }[strength];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === 'password') {
      const { errors } = validatePassword(value);
      setPwErrors(errors);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { valid, errors } = validatePassword(form.password);
    if (!valid) { setPwErrors(errors); return; }
    setLoading(true); setError('');
    try {
      const { data } = await authApi.register({ ...form, userType: 'retail' });
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
          <div className="text-center mb-8">
            <Link href={`/${locale}`} className="inline-flex items-center gap-1">
              <span className="text-2xl font-bold text-primary">Ocean</span>
              <span className="text-2xl font-bold text-foreground">Bazar</span>
            </Link>
            <p className="text-muted-foreground mt-2">{t('register')}</p>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-lg px-4 py-3 mb-4">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" type="text" placeholder={t('name')} value={form.name} onChange={handleChange} required
              className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground" />
            <input name="email" type="email" placeholder={t('email')} value={form.email} onChange={handleChange}
              className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground" />
            <input name="phone" type="tel" placeholder={t('phone')} value={form.phone} onChange={handleChange}
              className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground" />

            <div>
              <input name="password" type="password" placeholder={t('password')} value={form.password} onChange={handleChange} required
                className="w-full border border-border bg-background text-foreground rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground" />
              {form.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {['weak','fair','strong'].map((s, i) => (
                      <div key={s} className={`h-1.5 flex-1 rounded-full ${i < ['weak','fair','strong'].indexOf(strength) + 1 ? strengthColor : 'bg-muted'}`} />
                    ))}
                  </div>
                  {pwErrors.length > 0 && (
                    <ul className="text-xs text-destructive space-y-0.5 mt-1">
                      {pwErrors.map((e) => <li key={e}>• {e}</li>)}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <button type="submit" disabled={loading || pwErrors.length > 0}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:brightness-110 disabled:opacity-50 transition-all">
              {loading ? tc('loading') : t('register')}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {t('alreadyHaveAccount')}{' '}
            <Link href={`/${locale}/auth/login`} className="text-primary font-medium hover:underline">{t('login')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
