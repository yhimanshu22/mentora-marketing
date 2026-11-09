import { Router } from 'express';
import type { Request, Response } from 'express';

import type { AuthenticatedRequest } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { Order } from '../models/Order.js';
import { dodo, PLAN_DODO_PRODUCTS } from '../services/dodo.js';
import { isPaidPlan, PLANS, addMonths } from '../services/plans.js';
import type { PlanId } from '../types.js';
import { config } from '../config.js';

export const billingRouter = Router();

billingRouter.post('/checkout', requireAuth, async (req, res) => {
  const planId = req.body?.planId;
  const billingMonths = Number(req.body?.billingMonths ?? 1);
  const { userId } = req as AuthenticatedRequest;

  if (!isPaidPlan(planId)) {
    res.status(400).json({ error: 'Invalid plan' });
    return;
  }

  const productId = PLAN_DODO_PRODUCTS[planId];
  if (!productId) {
    res.status(500).json({ error: `Product ID not configured for plan ${planId}` });
    return;
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const session = await dodo.checkoutSessions.create({
      product_cart: [
        {
          product_id: productId,
          quantity: billingMonths,
        },
      ],
      customer: {
        email: user.email,
        name: user.name,
      },
      metadata: {
        userId: user._id.toString(),
        planId,
        billingMonths: String(billingMonths),
      },
      return_url: `${config.siteUrl}/billing/success?session_id={CHECKOUT_SESSION_ID}`,
    });

    if (!session?.checkout_url || !session?.session_id) {
      res.status(500).json({ error: 'Failed to create Dodo checkout session' });
      return;
    }

    await Order.create({
      sessionId: session.session_id,
      userId: user._id,
      planId,
      billingMonths,
      status: 'pending',
    });

    res.json({ url: session.checkout_url });
  } catch (error) {
    console.error('Checkout session failed:', error);
    const message = error instanceof Error ? error.message : 'Could not start checkout';
    res.status(500).json({ error: message });
  }
});

export async function handleDodoWebhook(req: Request, res: Response) {
  const webhookKey = config.dodoWebhookKey;
  const webhookId = req.headers['webhook-id'] as string;
  const webhookSignature = req.headers['webhook-signature'] as string;
  const webhookTimestamp = req.headers['webhook-timestamp'] as string;

  let event: any;

  try {
    const rawBody = typeof req.body === 'string' ? req.body : (req as any).rawBody?.toString?.() || JSON.stringify(req.body);

    if (webhookKey && webhookSignature) {
      event = dodo.webhooks.unwrap(rawBody, {
        headers: {
          'webhook-id': webhookId,
          'webhook-signature': webhookSignature,
          'webhook-timestamp': webhookTimestamp,
        },
      });
    } else {
      event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    }
  } catch (err) {
    console.error('Dodo webhook signature verification failed:', err);
    res.status(401).json({ error: 'Invalid webhook signature' });
    return;
  }

  const type = event?.type;
  const data = event?.data;

  try {
    if (
      type === 'payment.succeeded' ||
      type === 'checkout_session.completed' ||
      type === 'subscription.active' ||
      type === 'subscription.renewed'
    ) {
      const sessionId = data?.session_id || data?.checkout_session_id;
      const metadata = data?.metadata || {};
      const userId = metadata.userId;
      const planId = metadata.planId as PlanId;
      const billingMonths = Number(metadata.billingMonths || 1);

      if (sessionId) {
        const order = await Order.findOne({ sessionId });
        if (order) {
          order.status = 'succeeded';
          if (data?.payment_id) {
            order.paymentId = data.payment_id;
          }
          await order.save();
        }
      }

      if (userId && isPaidPlan(planId)) {
        const user = await User.findById(userId);
        if (user) {
          const plan = PLANS[planId];
          user.plan = planId;
          user.credits = plan.credits;
          user.planExpiresAt = addMonths(new Date(), billingMonths);
          await user.save();
        }
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error handling Dodo webhook:', error);
    res.status(500).json({ error: 'Webhook processing error' });
  }
}

billingRouter.get('/session/:sessionId', requireAuth, async (req, res) => {
  const { userId } = req as AuthenticatedRequest;
  const sessionId = req.params.sessionId;
  if (!sessionId || Array.isArray(sessionId)) {
    res.status(400).json({ error: 'Invalid session id' });
    return;
  }

  try {
    const order = await Order.findOne({ sessionId });
    if (!order) {
      res.status(404).json({ error: 'Checkout session not found' });
      return;
    }

    if (order.userId.toString() !== userId) {
      res.status(403).json({ error: 'Session does not belong to this user' });
      return;
    }

    res.json({
      status: order.status === 'succeeded' ? 'paid' : order.status,
      mode: 'payment',
      planId: order.planId,
      billingMonths: order.billingMonths,
      subscriptionStatus: order.status === 'succeeded' ? 'active' : null,
    });
  } catch (error) {
    console.error('Session lookup failed:', error);
    res.status(500).json({ error: 'Session lookup failed' });
  }
});
