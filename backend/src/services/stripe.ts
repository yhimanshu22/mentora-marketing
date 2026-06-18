import Stripe from 'stripe';

import { config } from '../config.js';
import { User, type UserDocument } from '../models/User.js';
import {
  addMonths,
  isBillingPeriod,
  isPaidPlan,
  periodTotalInPaise,
  PLANS,
} from './plans.js';

export const stripe = new Stripe(config.stripeSecretKey);

export async function createCheckoutSession(
  user: UserDocument,
  planId: string,
  billingMonths: number,
): Promise<string> {
  if (!isPaidPlan(planId)) {
    throw new Error('Invalid paid plan');
  }
  if (!isBillingPeriod(billingMonths)) {
    throw new Error('Invalid billing period');
  }

  const plan = PLANS[planId];
  const amountInPaise = periodTotalInPaise(plan.monthlyPriceInr!, billingMonths);

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: user.email,
    client_reference_id: user._id.toString(),
    metadata: {
      userId: user._id.toString(),
      planId,
      billingMonths: String(billingMonths),
    },
    line_items: [
      {
        price_data: {
          currency: 'inr',
          unit_amount: amountInPaise,
          product_data: {
            name: `Mentora ${plan.name}`,
            description: `${billingMonths} month${billingMonths === 1 ? '' : 's'} · ${plan.credits} credits`,
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${config.siteUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.siteUrl}/#pricing`,
  });

  if (!session.url) {
    throw new Error('Stripe did not return a checkout URL');
  }

  return session.url;
}

export async function applyCheckoutSession(session: Stripe.Checkout.Session): Promise<void> {
  const userId = session.metadata?.userId;
  const planId = session.metadata?.planId;
  const billingMonthsRaw = session.metadata?.billingMonths;

  if (!userId || !planId || !billingMonthsRaw || !isPaidPlan(planId)) {
    throw new Error('Checkout session metadata is incomplete');
  }

  const billingMonths = Number(billingMonthsRaw);
  if (!isBillingPeriod(billingMonths)) {
    throw new Error('Invalid billing months in metadata');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found for checkout session');
  }

  const plan = PLANS[planId];
  const now = new Date();
  const baseDate =
    user.planExpiresAt && user.planExpiresAt.getTime() > now.getTime()
      ? user.planExpiresAt
      : now;

  user.plan = planId;
  user.credits = plan.credits;
  user.planExpiresAt = addMonths(baseDate, billingMonths);

  if (typeof session.customer === 'string') {
    user.stripeCustomerId = session.customer;
  }

  await user.save();
}

export function constructWebhookEvent(payload: Buffer, signature: string): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, config.stripeWebhookSecret);
}
