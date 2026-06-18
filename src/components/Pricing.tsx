import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';
import {
  BILLING_PERIODS,
  formatInr,
  periodLabel,
  periodTotal,
  SOURCE_CODE_FEATURES,
  SOURCE_CODE_URL,
  SUBSCRIPTION_PLANS,
  type BillingPeriod,
} from '../content';
import { ApiError, apiFetch } from '../lib/api';
import {
  btnBlock,
  btnPrimary,
  btnSecondary,
  container,
  eyebrow,
  glassCard,
  sectionHead,
  sectionLead,
  sectionTitle,
} from '../lib/classes';

function PlanCta({
  planId,
  label,
  featured,
  billingPeriod,
}: {
  planId: string;
  label: string;
  featured?: boolean;
  billingPeriod: BillingPeriod;
}) {
  const { isAuthenticated, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (planId === 'free') {
    return (
      <a href={SUBSCRIPTION_PLANS[0].href} className={`${btnBlock} ${btnSecondary}`}>
        {label}
      </a>
    );
  }

  if (!isAuthenticated || !token) {
    return (
      <Link
        to="/login"
        className={`${btnBlock} ${featured ? btnPrimary : btnSecondary}`}
      >
        Sign in to subscribe
      </Link>
    );
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch<{ url: string }>('/api/billing/checkout', {
        method: 'POST',
        token,
        body: JSON.stringify({ planId, billingMonths: billingPeriod }),
      });
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Checkout failed');
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        className={`${btnBlock} ${featured ? btnPrimary : btnSecondary} disabled:opacity-60`}
        onClick={() => void handleCheckout()}
        disabled={loading}
      >
        {loading ? 'Redirecting to Stripe…' : label}
      </button>
      {error ? <p className="text-xs text-red-400 mt-2">{error}</p> : null}
    </div>
  );
}

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(1);

  return (
    <section id="pricing" className="py-20 max-sm:py-14">
      <div className={container}>
        <div className={sectionHead}>
          <p className={eyebrow}>Pricing</p>
          <h2 className={sectionTitle}>Choose your Mentora plan</h2>
          <p className={sectionLead}>
            Start free with credits on desktop and browser, then upgrade as you grow.
          </p>
        </div>

        <div
          className="flex flex-wrap justify-center gap-2 mb-7"
          role="group"
          aria-label="Billing period"
        >
          {BILLING_PERIODS.map((months) => (
            <button
              key={months}
              type="button"
              className={`text-sm font-semibold px-4 py-2.5 rounded-full border cursor-pointer transition-[background,border-color,color] duration-150 max-sm:text-xs max-sm:px-3 max-sm:py-2 ${
                billingPeriod === months
                  ? 'bg-indigo-500/20 border-indigo-500/45 text-indigo-300'
                  : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-slate-200 hover:border-indigo-500/35'
              }`}
              aria-pressed={billingPeriod === months}
              onClick={() => setBillingPeriod(months)}
            >
              {periodLabel(months)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5 max-w-full mb-12">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isFree = plan.monthlyPrice === undefined;
            const total = plan.monthlyPrice
              ? periodTotal(plan.monthlyPrice, billingPeriod)
              : null;

            return (
              <article
                key={plan.id}
                className={`${glassCard} p-7 max-sm:p-5 relative min-w-0 ${
                  plan.featured
                    ? 'border-indigo-500/35 shadow-[0_12px_32px_rgba(99,102,241,0.15),0_8px_24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)]'
                    : ''
                }`}
              >
                {plan.badge ? (
                  <p className="absolute top-4 right-4 text-[0.65rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/25 text-indigo-300">
                    {plan.badge}
                  </p>
                ) : null}
                <p className="text-sm font-semibold text-indigo-300 mb-1.5">{plan.name}</p>

                {isFree ? (
                  <p className="text-[clamp(1.5rem,5vw,2.25rem)] font-bold mb-2 leading-snug break-words">
                    Free <span className="text-[0.925rem] font-medium text-slate-400">forever</span>
                  </p>
                ) : (
                  <>
                    <p className="text-[clamp(1.5rem,5vw,2.25rem)] font-bold mb-2 leading-snug break-words">
                      {formatInr(total!)}
                      <span className="text-[0.925rem] font-medium text-slate-400">
                        {billingPeriod === 1 ? '/month' : ` / ${periodLabel(billingPeriod)}`}
                      </span>
                    </p>
                    {billingPeriod > 1 ? (
                      <p className="text-xs text-slate-400 -mt-1 mb-3">
                        {formatInr(plan.monthlyPrice!)}/mo · {formatInr(total!)} total
                      </p>
                    ) : null}
                  </>
                )}

                <ul className="list-none mb-6 flex flex-col gap-2.5">
                  {plan.features.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-slate-400 flex items-start gap-2 break-words"
                    >
                      <i className="fas fa-check text-emerald-500 text-xs mt-0.5" aria-hidden="true" />{' '}
                      {item}
                    </li>
                  ))}
                </ul>

                {plan.upgradeAddOnMonthly ? (
                  <p className="text-xs text-indigo-300 -mt-2 mb-4 px-2.5 py-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 break-words">
                    Upgrade from Ultimate to Magic: +{formatInr(plan.upgradeAddOnMonthly)}/mo
                    {billingPeriod > 1
                      ? ` (${formatInr(plan.upgradeAddOnMonthly * billingPeriod)} for ${periodLabel(billingPeriod)})`
                      : null}
                  </p>
                ) : null}

                <PlanCta
                  planId={plan.id}
                  label={plan.cta}
                  featured={plan.featured}
                  billingPeriod={billingPeriod}
                />
              </article>
            );
          })}
        </div>

        <div className="text-center max-w-xl mx-auto mb-6">
          <h3 className="font-display text-[1.35rem] mb-2">Full Source Code</h3>
          <p className="text-[0.925rem] text-slate-400">
            Own the complete codebase — build, customize, and deploy on your own infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5 max-w-md mx-auto">
          <article className={`${glassCard} p-7 max-sm:p-5 relative min-w-0`}>
            <p className="text-sm font-semibold text-indigo-300 mb-1.5">Full Source Code</p>
            <p className="text-[clamp(1.5rem,5vw,2.25rem)] font-bold mb-2 leading-snug break-words">
              $499 <span className="text-[0.925rem] font-medium text-slate-400">one-time</span>
            </p>
            <p className="text-sm text-slate-400 mb-5">
              Complete Mentora source with desktop and browser editions. No subscription required.
            </p>
            <ul className="list-none mb-6 flex flex-col gap-2.5">
              {SOURCE_CODE_FEATURES.map((item) => (
                <li
                  key={item}
                  className="text-sm text-slate-400 flex items-start gap-2 break-words"
                >
                  <i className="fas fa-check text-emerald-500 text-xs mt-0.5" aria-hidden="true" />{' '}
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={SOURCE_CODE_URL}
              className={`${btnPrimary} ${btnBlock}`}
              target="_blank"
              rel="noreferrer"
            >
              Get Full Source Code
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
