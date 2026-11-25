import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';
import {
  BILLING_PERIODS,
  formatInr,
  periodLabel,
  periodTotal,
  SUBSCRIPTION_PLANS,
  type BillingPeriod,
} from '../content';
import { ApiError, apiFetch } from '../lib/api';
import {
  btnBlock,
  btnPrimary,
  btnSecondary,
  container,
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
        {loading ? 'Opening checkout…' : label}
      </button>
      {error ? <p className="text-xs text-red-400 mt-2">{error}</p> : null}
    </div>
  );
}

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(1);

  return (
    <section id="pricing" className="py-24 max-sm:py-16 border-t border-white/[0.06]">
      <div className={container}>
        <div className={sectionHead}>
          <h2 className={sectionTitle}>Simple, predictable plans</h2>
          <p className={sectionLead}>
            Get started with 15 credits for just $1, then scale up as your meeting and summarisation needs grow.
          </p>
        </div>

        <div
          className="flex justify-center mb-10"
          role="group"
          aria-label="Billing period"
        >
          <div className="inline-flex p-1 bg-white/[0.03] border border-white/[0.08] rounded-lg">
            {BILLING_PERIODS.map((months) => (
              <button
                key={months}
                type="button"
                className={`text-xs font-medium px-4 py-2 rounded-md transition-all duration-150 cursor-pointer ${
                  billingPeriod === months
                    ? 'bg-white text-slate-950 shadow-sm font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
                aria-pressed={billingPeriod === months}
                onClick={() => setBillingPeriod(months)}
              >
                {periodLabel(months)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-5 max-w-full mb-12">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isFree = false;
            const total = plan.monthlyPrice
              ? periodTotal(plan.monthlyPrice, billingPeriod)
              : null;

            return (
              <article
                key={plan.id}
                className={`p-6 rounded-xl relative min-w-0 flex flex-col justify-between transition-all duration-200 ${
                  plan.featured
                    ? 'bg-slate-900/90 border-2 border-white/60 shadow-[0_12px_40px_rgba(255,255,255,0.08)] ring-1 ring-white/20'
                    : 'bg-slate-900/40 border border-white/[0.08] hover:border-white/20'
                }`}
              >
                {plan.badge ? (
                  <p className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-slate-950 shadow-sm">
                    {plan.badge}
                  </p>
                ) : null}
                <div>
                  <p className="text-sm font-semibold text-white mb-2">{plan.name}</p>

                  {isFree ? (
                    <div className="mb-4">
                      <span className="text-3xl font-bold tracking-tight text-white">Free</span>
                      <span className="text-xs text-slate-400 ml-1.5 font-medium">forever</span>
                    </div>
                  ) : (
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold tracking-tight text-white">{formatInr(total!)}</span>
                        <span className="text-xs text-slate-400 font-medium">
                          {billingPeriod === 1 ? '/mo' : ` / ${periodLabel(billingPeriod)}`}
                        </span>
                      </div>
                      {billingPeriod > 1 ? (
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {formatInr(plan.monthlyPrice!)}/mo billed upfront
                        </p>
                      ) : null}
                    </div>
                  )}

                  <div className="h-px w-full bg-white/[0.06] mb-5" />

                  <ul className="list-none mb-6 flex flex-col gap-2.5">
                    {plan.features.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-slate-300 flex items-start gap-2 break-words leading-relaxed"
                      >
                        <i className="fas fa-check text-emerald-400 text-xs mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.upgradeAddOnMonthly ? (
                    <p className="text-[11px] text-slate-200 -mt-2 mb-4 px-2.5 py-2 rounded bg-white/[0.06] border border-white/20 break-words leading-snug">
                      Upgrade add-on: +{formatInr(plan.upgradeAddOnMonthly)}/mo
                    </p>
                  ) : null}
                </div>

                <div className="mt-4 pt-2">
                  <PlanCta
                    planId={plan.id}
                    label={plan.cta}
                    featured={plan.featured}
                    billingPeriod={billingPeriod}
                  />
                </div>
              </article>
            );
          })}
        </div>

        {/* <div className="text-center max-w-xl mx-auto mb-6">
          <h3 className="font-display text-[1.35rem] mb-2">Full Source Code</h3>
          <p className="text-[0.925rem] text-slate-400">
            Own the complete codebase — build, customize, and deploy on your own infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5 max-w-md mx-auto">
          <article className={`${glassCard} p-7 max-sm:p-5 relative min-w-0`}>
            <p className="text-sm font-semibold text-white mb-1.5">Full Source Code</p>
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
        </div> */}
      </div>
    </section>
  );
}
