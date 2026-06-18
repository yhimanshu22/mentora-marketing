import { useState } from 'react';
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

export function Pricing() {  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(1);

  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Pricing</p>
          <h2 className="section-title">Choose your Mentora plan</h2>
          <p className="section-lead">
            Start free with credits on desktop and browser, then upgrade as you grow.
          </p>
        </div>

        <div className="pricing-billing-toggle" role="group" aria-label="Billing period">
          {BILLING_PERIODS.map((months) => (
            <button
              key={months}
              type="button"
              className={`pricing-billing-btn${billingPeriod === months ? ' pricing-billing-btn-active' : ''}`}
              aria-pressed={billingPeriod === months}
              onClick={() => setBillingPeriod(months)}
            >
              {periodLabel(months)}
            </button>
          ))}
        </div>

        <div className="pricing-grid pricing-grid-plans">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isFree = plan.monthlyPrice === undefined;
            const total = plan.monthlyPrice
              ? periodTotal(plan.monthlyPrice, billingPeriod)
              : null;

            return (
              <article
                key={plan.id}
                className={`glass-card pricing-card${plan.featured ? ' pricing-card-featured' : ''}`}
              >
                {plan.badge ? <p className="pricing-badge">{plan.badge}</p> : null}
                <p className="pricing-label">{plan.name}</p>

                {isFree ? (
                  <p className="pricing-price">
                    Free <span className="pricing-period">forever</span>
                  </p>
                ) : (
                  <>
                    <p className="pricing-price">
                      {formatInr(total!)}
                      <span className="pricing-period">
                        {billingPeriod === 1 ? '/month' : ` / ${periodLabel(billingPeriod)}`}
                      </span>
                    </p>
                    {billingPeriod > 1 ? (
                      <p className="pricing-billing-note">
                        {formatInr(plan.monthlyPrice!)}/mo · {formatInr(total!)} total
                      </p>
                    ) : null}
                  </>
                )}

                <ul className="pricing-list">
                  {plan.features.map((item) => (
                    <li key={item}>
                      <i className="fas fa-check" aria-hidden="true" /> {item}
                    </li>
                  ))}
                </ul>

                {plan.upgradeAddOnMonthly ? (
                  <p className="pricing-upgrade-note">
                    Upgrade from Ultimate to Magic: +{formatInr(plan.upgradeAddOnMonthly)}/mo
                    {billingPeriod > 1
                      ? ` (${formatInr(plan.upgradeAddOnMonthly * billingPeriod)} for ${periodLabel(billingPeriod)})`
                      : null}
                  </p>
                ) : null}

                <a
                  href={plan.href}
                  className={`btn btn-block${plan.featured ? ' btn-primary' : ' btn-secondary'}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {plan.cta}
                </a>
              </article>
            );
          })}
        </div>

        <div className="pricing-source-head">
          <h3 className="pricing-source-title">Full Source Code</h3>
          <p className="pricing-source-lead">
            Own the complete codebase — build, customize, and deploy on your own infrastructure.
          </p>
        </div>

        <div className="pricing-grid pricing-grid-source">
          <article className="glass-card pricing-card">
            <p className="pricing-label">Full Source Code</p>
            <p className="pricing-price">
              $499 <span className="pricing-period">one-time</span>
            </p>
            <p className="pricing-desc">
              Complete Mentora source with desktop and browser editions. No subscription required.
            </p>
            <ul className="pricing-list">
              {SOURCE_CODE_FEATURES.map((item) => (
                <li key={item}>
                  <i className="fas fa-check" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <a
              href={SOURCE_CODE_URL}
              className="btn btn-primary btn-block"
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
