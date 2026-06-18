import { Router } from 'express';

import type { AuthenticatedRequest } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { createCheckoutSession, stripe } from '../services/stripe.js';
import { isPaidPlan } from '../services/plans.js';

export const billingRouter = Router();

billingRouter.post('/checkout', requireAuth, async (req, res) => {
  const planId = req.body?.planId;
  const billingMonths = Number(req.body?.billingMonths ?? 1);
  const { userId } = req as AuthenticatedRequest;

  if (!isPaidPlan(planId)) {
    res.status(400).json({ error: 'Invalid plan' });
    return;
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const url = await createCheckoutSession(user, planId, billingMonths);
    res.json({ url });
  } catch (error) {
    console.error('Checkout session failed:', error);
    res.status(500).json({ error: 'Could not start checkout' });
  }
});

billingRouter.get('/session/:sessionId', requireAuth, async (req, res) => {
  const { userId } = req as AuthenticatedRequest;
  const sessionId = req.params.sessionId;
  if (!sessionId || Array.isArray(sessionId)) {
    res.status(400).json({ error: 'Invalid session id' });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.client_reference_id !== userId) {
      res.status(403).json({ error: 'Session does not belong to this user' });
      return;
    }

    res.json({
      status: session.payment_status,
      planId: session.metadata?.planId ?? null,
      billingMonths: session.metadata?.billingMonths ?? null,
    });
  } catch (error) {
    console.error('Session lookup failed:', error);
    res.status(404).json({ error: 'Checkout session not found' });
  }
});

export async function handleStripeWebhook(req: import('express').Request, res: import('express').Response) {
  const signature = req.headers['stripe-signature'];
  if (!signature || Array.isArray(signature)) {
    res.status(400).send('Missing Stripe signature');
    return;
  }

  try {
    const { constructWebhookEvent, applyCheckoutSession } = await import('../services/stripe.js');
    const event = constructWebhookEvent(req.body as Buffer, signature);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      if (session.payment_status === 'paid') {
        await applyCheckoutSession(session);
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Stripe webhook failed:', error);
    res.status(400).send('Webhook error');
  }
}
