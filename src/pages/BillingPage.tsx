import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Seo } from '../components/Seo';
import { SUBSCRIPTION_PLANS } from '../content';
import { handleBillingPortalError, openBillingPortal } from '../lib/billing';
import { btnGhost, btnPrimary, btnSecondary, container, glassCard } from '../lib/classes';
import {
  creditsUsagePercent,
  formatPlanExpiry,
  formatPlanLabel,
  planCreditsLimit,
  planPillClass,
} from '../lib/plan';
import { PAGE_SEO } from '../seo';

export function BillingPage() {
  const { user, token, entitlements, isAuthenticated, isLoading, signOut, refreshSession } =
    useAuth();
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      void refreshSession();
    }
  }, [isAuthenticated, refreshSession]);

  if (isLoading) {
    return (
      <>
        <Seo page={PAGE_SEO.billing} />
        <Header />
        <main className="w-full overflow-x-hidden py-20 max-sm:py-14">
          <div className={`${container} max-w-lg`}>
            <div className={`${glassCard} p-8 text-center text-slate-400`}>
              Loading your account…
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!isAuthenticated || !user || !token) {
    return <Navigate to="/login" replace />;
  }

  const plan = entitlements?.plan ?? user.plan;
  const credits = entitlements?.credits ?? user.credits;
  const expiresAt = entitlements?.planExpiresAt ?? user.planExpiresAt;
  const canUseAi = entitlements?.canUseAi ?? credits > 0;
  const creditLimit = planCreditsLimit(plan);
  const creditPercent = creditsUsagePercent(credits, plan);
  const expiryLabel = formatPlanExpiry(expiresAt);
  const isLowCredits = credits > 0 && creditPercent <= 20;
  const planDetails = SUBSCRIPTION_PLANS.find((entry) => entry.id === plan);

  const handleManageBilling = async () => {
    setPortalLoading(true);
    setPortalError(null);
    try {
      await openBillingPortal(token);
    } catch (err) {
      if (!handleBillingPortalError(err)) {
        setPortalError('Could not open billing portal. Try again in a moment.');
        setPortalLoading(false);
      }
    }
  };

  return (
    <>
      <Seo page={PAGE_SEO.billing} />
      <Header />
      <main className="w-full overflow-x-hidden py-20 max-sm:py-14">
        <div className={`${container} max-w-lg`}>
          <div className="mb-6">
            <Link to="/" className="text-sm text-slate-500 hover:text-indigo-300">
              ← Back to home
            </Link>
          </div>

          <div className={`${glassCard} p-7 max-sm:p-5`}>
            <div className="flex items-start gap-4 mb-6">
              <img
                src={user.picture}
                alt=""
                className="w-12 h-12 rounded-full border-2 border-indigo-500/40 shrink-0"
                width={48}
                height={48}
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="font-display text-xl font-bold truncate">{user.name}</h1>
                  <span className={planPillClass(plan)}>{formatPlanLabel(plan)}</span>
                </div>
                <p className="text-sm text-slate-400 truncate">{user.email}</p>
              </div>
            </div>

            <div className="grid gap-3 mb-6">
              <div className="rounded-lg border border-white/[0.06] bg-slate-900/50 px-4 py-3">
                <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Current plan
                </p>
                <p className="text-base font-semibold text-slate-100">
                  {planDetails?.name ?? formatPlanLabel(plan)}
                </p>
                {planDetails?.monthlyPrice ? (
                  <p className="text-sm text-slate-400 mt-0.5">
                    ₹{planDetails.monthlyPrice.toLocaleString('en-IN')} / month
                  </p>
                ) : (
                  <p className="text-sm text-slate-400 mt-0.5">Free tier</p>
                )}
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-slate-900/50 px-4 py-3">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500">
                    Credits remaining
                  </p>
                  <p className="text-lg font-bold text-indigo-300">
                    {credits}
                    <span className="text-sm font-medium text-slate-500"> / {creditLimit}</span>
                  </p>
                </div>
                <div
                  className="h-2 rounded-full bg-slate-800 border border-white/[0.06] overflow-hidden"
                  role="progressbar"
                  aria-valuenow={credits}
                  aria-valuemin={0}
                  aria-valuemax={creditLimit}
                  aria-label={`${credits} of ${creditLimit} credits remaining`}
                >
                  <span
                    className={`block h-full rounded-full transition-all duration-300 ${
                      !canUseAi
                        ? 'bg-gradient-to-r from-red-500 to-rose-400'
                        : isLowCredits
                          ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                          : 'bg-gradient-to-r from-indigo-500 to-violet-400'
                    }`}
                    style={{ width: `${creditPercent}%` }}
                  />
                </div>
                {!canUseAi ? (
                  <p className="text-xs text-rose-300 mt-2">No credits left for this period.</p>
                ) : isLowCredits ? (
                  <p className="text-xs text-amber-300 mt-2">Credits are running low.</p>
                ) : null}
              </div>

              {expiryLabel && plan !== 'free' ? (
                <div className="rounded-lg border border-white/[0.06] bg-slate-900/50 px-4 py-3">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                    Renews on
                  </p>
                  <p className="text-sm font-medium text-slate-200">{expiryLabel}</p>
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3">
              {plan !== 'free' ? (
                <button
                  type="button"
                  onClick={() => void handleManageBilling()}
                  disabled={portalLoading}
                  className={`${btnPrimary} w-full disabled:opacity-60`}
                >
                  {portalLoading ? 'Opening billing portal…' : 'Manage billing'}
                </button>
              ) : (
                <Link to="/#pricing" className={`${btnPrimary} w-full text-center`}>
                  Upgrade plan
                </Link>
              )}

              <Link to="/#pricing" className={`${btnSecondary} w-full text-center`}>
                View all plans
              </Link>

              <button type="button" onClick={signOut} className={`${btnGhost} w-full`}>
                Sign out
              </button>
            </div>

            {portalError ? (
              <p className="text-sm text-rose-300 mt-4 text-center">{portalError}</p>
            ) : null}

            <p className="text-xs text-slate-500 mt-6 text-center leading-relaxed">
              Credits refresh each billing cycle. Use the desktop app while signed in with the same
              Google account.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
