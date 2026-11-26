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
    <section id="pricing" className="py-28 max-sm:py-20 border-t border-[#262626] bg-[#0a0a0a]">
      <div className={container}>
        <div className={sectionHead}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#171717] border border-[#2e2e2e] text-[#fafafa] mb-4">
            Transparent Pricing
          </div>
          <h2 className={sectionTitle}>Simple, predictable plans</h2>
          <p className={sectionLead}>
            Get started with 15 credits for just $1, then scale up as your call and interview needs grow.
          </p>
        </div>

        <div
          className="flex justify-center mb-12"
          role="group"
          aria-label="Billing period"
        >
          <div className="inline-flex p-1.5 bg-[#141414] border border-[#262626] rounded-xl">
            {BILLING_PERIODS.map((months) => (
              <button
                key={months}
                type="button"
                className={`text-xs font-semibold px-4 py-2 rounded-lg transition-all duration-150 cursor-pointer ${
                  billingPeriod === months
                    ? 'bg-[#fafafa] text-[#0a0a0a] shadow-sm'
                    : 'text-[#a1a1aa] hover:text-[#fafafa]'
                }`}
                aria-pressed={billingPeriod === months}
                onClick={() => setBillingPeriod(months)}
              >
                {periodLabel(months)}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-6 max-w-full mb-12">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isFree = false;
            const total = plan.monthlyPrice
              ? periodTotal(plan.monthlyPrice, billingPeriod)
              : null;

            return (
              <article
                key={plan.id}
                className={`p-7 rounded-2xl relative min-w-0 flex flex-col justify-between transition-all duration-200 ${
                  plan.featured
                    ? 'bg-[#171717] border-2 border-white shadow-[0_16px_48px_rgba(255,255,255,0.06)]'
                    : 'bg-[#141414] border border-[#262626] hover:border-[#383838]'
                }`}
              >
                {plan.badge ? (
                  <p className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full bg-white text-black shadow-sm">
                    {plan.badge}
                  </p>
                ) : null}
                <div>
                  <p className="text-sm font-bold text-[#fafafa] mb-2">{plan.name}</p>

                  {isFree ? (
                    <div className="mb-5">
                      <span className="text-3xl font-extrabold tracking-tight text-white">Free</span>
                      <span className="text-xs text-[#a1a1aa] ml-1.5 font-medium">forever</span>
                    </div>
                  ) : (
                    <div className="mb-5">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-extrabold tracking-tight text-white">{formatInr(total!)}</span>
                        <span className="text-xs text-[#a1a1aa] font-medium">
                          {billingPeriod === 1 ? '/mo' : ` / ${periodLabel(billingPeriod)}`}
                        </span>
                      </div>
                      {billingPeriod > 1 ? (
                        <p className="text-[11px] text-[#71717a] mt-0.5">
                          {formatInr(plan.monthlyPrice!)}/mo billed upfront
                        </p>
                      ) : null}
                    </div>
                  )}

                  <div className="h-px w-full bg-[#262626] mb-5" />

                  <ul className="list-none mb-6 flex flex-col gap-3">
                    {plan.features.map((item) => (
                      <li
                        key={item}
                        className="text-xs text-[#d4d4d8] flex items-start gap-2.5 break-words leading-relaxed"
                      >
                        <i className="fas fa-check text-emerald-400 text-xs mt-0.5 shrink-0" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.upgradeAddOnMonthly ? (
                    <p className="text-[11px] text-[#fafafa] -mt-2 mb-4 px-3 py-2 rounded-lg bg-[#1f1f1f] border border-[#2e2e2e] break-words leading-snug">
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
      </div>
    </section>
  );
}
