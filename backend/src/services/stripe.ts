import Stripe from 'stripe';

import { config } from '../config.js';
import { User, type UserDocument } from '../models/User.js';
import {
  isBillingPeriod,
  isPaidPlan,
  periodTotalInPaise,
  PLANS,
} from './plans.js';

export const stripe = new Stripe(config.stripeSecretKey);

async function ensureStripeCustomer(user: UserDocument): Promise<string> {
  if (user.stripeCustomerId) {
    await stripe.customers.update(user.stripeCustomerId, {
      email: user.email,
      name: user.name,
    });
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name,
    metadata: {
      userId: user._id.toString(),
      googleId: user.googleId,
    },
  });

  user.stripeCustomerId = customer.id;
  await user.save();

  return customer.id;
}

function getSubscriptionId(
  subscription: string | Stripe.Subscription | null | undefined,
): string | null {
  if (!subscription) return null;
  return typeof subscription === 'string' ? subscription : subscription.id;
}

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
  const amountPerCyclePaise = periodTotalInPaise(plan.monthlyPriceInr!, billingMonths);
  const customerId = await ensureStripeCustomer(user);

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    customer: customerId,
    client_reference_id: user._id.toString(),
    // Required for Indian export / INR regulations
    billing_address_collection: 'required',
    customer_update: {
      name: 'auto',
      address: 'auto',
    },
    phone_number_collection: {
      enabled: true,
    },
    line_items: [
      {
        price_data: {
          currency: 'inr',
          unit_amount: amountPerCyclePaise,
          recurring: {
            interval: 'month',
            interval_count: billingMonths,
          },
          product_data: {
            name: `Mentora ${plan.name}`,
            description: `${plan.credits} credits per billing cycle · renews every ${billingMonths} month${billingMonths === 1 ? '' : 's'}`,
          },
        },
        quantity: 1,
      },
    ],
    subscription_data: {
      metadata: {
        userId: user._id.toString(),
        planId,
        billingMonths: String(billingMonths),
      },
    },
    metadata: {
      userId: user._id.toString(),
      planId,
      billingMonths: String(billingMonths),
    },
    success_url: `${config.siteUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${config.siteUrl}/#pricing`,
    allow_promotion_codes: true,
  };

  const session = await stripe.checkout.sessions.create(sessionParams);

  if (!session.url) {
    throw new Error('Stripe did not return a checkout URL');
  }

  return session.url;
}

export async function createBillingPortalSession(user: UserDocument): Promise<string> {
  if (!user.stripeCustomerId) {
    throw new Error('No Stripe customer on file');
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: `${config.siteUrl}/billing`,
  });

  if (!session.url) {
    throw new Error('Stripe did not return a portal URL');
  }

  return session.url;
}

async function findUserForSubscription(
  subscription: Stripe.Subscription,
): Promise<UserDocument | null> {
  const userId = subscription.metadata.userId;
  if (userId) {
    const byId = await User.findById(userId);
    if (byId) return byId;
  }

  const customerId =
    typeof subscription.customer === 'string'
      ? subscription.customer
      : subscription.customer?.id;

  if (customerId) {
    return User.findOne({ stripeCustomerId: customerId });
  }

  return null;
}

export async function applySubscriptionEntitlements(
  subscription: Stripe.Subscription,
): Promise<void> {
  const planId = subscription.metadata.planId;
  if (!planId || !isPaidPlan(planId)) {
    throw new Error('Subscription metadata is incomplete');
  }

  const user = await findUserForSubscription(subscription);
  if (!user) {
    throw new Error('User not found for subscription');
  }

  const plan = PLANS[planId];
  const customerId =
    typeof subscription.customer === 'string'
      ? subscription.customer
      : subscription.customer?.id;

  user.plan = planId;
  user.credits = plan.credits;
  user.planExpiresAt = new Date(subscription.current_period_end * 1000);
  user.stripeSubscriptionId = subscription.id;
  if (customerId) {
    user.stripeCustomerId = customerId;
  }

  await user.save();
}

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
): Promise<void> {
  const userId = session.metadata?.userId;
  if (!userId) {
    throw new Error('Checkout session metadata is incomplete');
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found for checkout session');
  }

  if (typeof session.customer === 'string') {
    user.stripeCustomerId = session.customer;
  }

  const subscriptionId = getSubscriptionId(session.subscription);
  if (subscriptionId) {
    user.stripeSubscriptionId = subscriptionId;
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    if (subscription.status === 'active' || subscription.status === 'trialing') {
      await applySubscriptionEntitlements(subscription);
    }
  }

  await user.save();
}

export async function handleInvoicePaid(invoice: Stripe.Invoice): Promise<void> {
  const subscriptionId = getSubscriptionId(invoice.subscription);
  if (!subscriptionId) return;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  if (subscription.status !== 'active' && subscription.status !== 'trialing') {
    return;
  }

  await applySubscriptionEntitlements(subscription);
}

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
): Promise<void> {
  const user = await findUserForSubscription(subscription);
  if (!user) return;

  user.stripeSubscriptionId = null;

  const periodEnded = subscription.current_period_end * 1000 <= Date.now();
  if (periodEnded) {
    user.plan = PLANS.free.id;
    user.credits = PLANS.free.credits;
    user.planExpiresAt = null;
  }

  await user.save();
}

export function constructWebhookEvent(payload: Buffer, signature: string): Stripe.Event {
  return stripe.webhooks.constructEvent(payload, signature, config.stripeWebhookSecret);
}

export async function dispatchStripeWebhookEvent(event: Stripe.Event): Promise<void> {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      if (session.mode === 'subscription') {
        await handleCheckoutSessionCompleted(session);
      }
      break;
    }
    case 'invoice.paid': {
      await handleInvoicePaid(event.data.object);
      break;
    }
    case 'customer.subscription.deleted': {
      await handleSubscriptionDeleted(event.data.object);
      break;
    }
    default:
      break;
  }
}
