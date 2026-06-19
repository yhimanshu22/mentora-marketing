import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Seo } from '../components/Seo';
import { apiFetch } from '../lib/api';
import { container, glassCard } from '../lib/classes';
import { PAGE_SEO } from '../seo';

export function BillingSuccessPage() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { token, refreshSession, user } = useAuth();
  const [status, setStatus] = useState<'loading' | 'paid' | 'pending' | 'error'>('loading');

  useEffect(() => {
    if (!sessionId || !token) {
      setStatus('error');
      return;
    }

    let cancelled = false;

    async function verify() {
      try {
        const data = await apiFetch<{ status: string }>(`/api/billing/session/${sessionId}`, {
          token,
        });
        if (cancelled) return;
        setStatus(data.status === 'paid' ? 'paid' : 'pending');
        await refreshSession();
      } catch {
        if (!cancelled) setStatus('error');
      }
    }

    void verify();
    return () => {
      cancelled = true;
    };
  }, [sessionId, token, refreshSession]);

  return (
    <>
      <Seo page={PAGE_SEO.billingSuccess} />
      <Header />
      <main className="w-full overflow-x-hidden py-20 max-sm:py-14">
        <div className={`${container} max-w-md`}>
          <div className={`${glassCard} p-8 text-center`}>
            {status === 'loading' ? (
              <p className="text-slate-400">Confirming your subscription…</p>
            ) : null}
            {status === 'paid' ? (
              <>
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-3">
                  Subscription active
                </p>
                <h1 className="font-display text-2xl font-bold mb-2">You are all set</h1>
                <p className="text-sm text-slate-400 mb-6">
                  {user
                    ? `Your ${user.plan} subscription is active with ${user.credits} credits for this billing period.`
                    : 'Your subscription is now active.'}
                </p>
                <Link to="/" className="text-indigo-300 hover:text-indigo-200">
                  Back to home
                </Link>
              </>
            ) : null}
            {status === 'pending' ? (
              <p className="text-sm text-slate-400">
                Payment is processing. Refresh this page in a moment or check your email receipt.
              </p>
            ) : null}
            {status === 'error' ? (
              <p className="text-sm text-slate-400">
                We could not verify this checkout session. If you were charged, contact support with
                your receipt.
              </p>
            ) : null}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
