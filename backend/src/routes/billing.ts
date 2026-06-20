import { Router } from 'express';

import type { AuthenticatedRequest } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { User } from '../models/User.js';
import { PayUTransaction } from '../models/PayUTransaction.js';
import { generatePayUHash, verifyPayUHash, getPayUActionUrl } from '../services/payu.js';
import { isPaidPlan, PLANS, addMonths, periodTotalInr } from '../services/plans.js';
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

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const plan = PLANS[planId];
    const amount = periodTotalInr(plan.monthlyPriceInr!, billingMonths);
    const txnid = `txnid_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    await PayUTransaction.create({
      txnid,
      userId: user._id,
      planId,
      billingMonths,
      amount,
      status: 'pending',
    });

    const backendUrl = `${req.protocol}://${req.get('host')}`;
    const url = `${backendUrl}/api/billing/payu-redirect?txnid=${txnid}`;
    res.json({ url });
  } catch (error) {
    console.error('Checkout session failed:', error);
    const message = error instanceof Error ? error.message : 'Could not start checkout';
    res.status(500).json({ error: message });
  }
});

billingRouter.get('/payu-redirect', async (req, res) => {
  const txnid = req.query.txnid as string;
  if (!txnid) {
    res.status(400).send('Missing transaction ID');
    return;
  }

  try {
    const transaction = await PayUTransaction.findOne({ txnid }).populate('userId');
    if (!transaction) {
      res.status(404).send('Transaction not found');
      return;
    }

    const user = transaction.userId as any;
    const firstname = user.name.split(' ')[0] || 'Customer';
    const email = user.email;
    const phone = '9999999999';
    const productinfo = `Mentora ${transaction.planId}`;
    const amount = String(transaction.amount);

    const hash = generatePayUHash({
      txnid: transaction.txnid,
      amount,
      productinfo,
      firstname,
      email,
    });

    const callbackUrl = `${req.protocol}://${req.get('host')}/api/billing/payu-callback`;
    const actionUrl = getPayUActionUrl();

    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Redirecting to PayU...</title>
      </head>
      <body>
        <p>Redirecting to PayU secure payment gateway...</p>
        <form id="payuForm" method="POST" action="${actionUrl}">
          <input type="hidden" name="key" value="${config.payuMerchantKey}" />
          <input type="hidden" name="txnid" value="${transaction.txnid}" />
          <input type="hidden" name="amount" value="${amount}" />
          <input type="hidden" name="productinfo" value="${productinfo}" />
          <input type="hidden" name="firstname" value="${firstname}" />
          <input type="hidden" name="email" value="${email}" />
          <input type="hidden" name="phone" value="${phone}" />
          <input type="hidden" name="surl" value="${callbackUrl}" />
          <input type="hidden" name="furl" value="${callbackUrl}" />
          <input type="hidden" name="hash" value="${hash}" />
        </form>
        <script>
          document.getElementById('payuForm').submit();
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Redirect generation failed:', error);
    res.status(500).send('Internal server error');
  }
});

billingRouter.post('/payu-callback', async (req, res) => {
  const { key, txnid, amount, productinfo, firstname, email, status, hash } = req.body;

  try {
    const transaction = await PayUTransaction.findOne({ txnid });
    if (!transaction) {
      res.status(404).send('Transaction not found');
      return;
    }

    const isValid = verifyPayUHash({
      key,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      status,
      hash,
      udf1: req.body.udf1,
      udf2: req.body.udf2,
      udf3: req.body.udf3,
      udf4: req.body.udf4,
      udf5: req.body.udf5,
    });

    if (!isValid) {
      console.error('Invalid PayU signature hash');
      transaction.status = 'failed';
      await transaction.save();
      res.redirect(`${config.siteUrl}/#pricing`);
      return;
    }

    if (status === 'success') {
      transaction.status = 'success';
      await transaction.save();

      const user = await User.findById(transaction.userId);
      if (user) {
        const plan = PLANS[transaction.planId as PlanId];
        user.plan = transaction.planId as PlanId;
        user.credits = plan.credits;
        user.planExpiresAt = addMonths(new Date(), transaction.billingMonths);
        await user.save();
      }

      res.redirect(`${config.siteUrl}/billing/success?session_id=${txnid}`);
    } else {
      transaction.status = 'failed';
      await transaction.save();
      res.redirect(`${config.siteUrl}/#pricing`);
    }
  } catch (error) {
    console.error('PayU callback handling failed:', error);
    res.redirect(`${config.siteUrl}/#pricing`);
  }
});

billingRouter.post('/portal', requireAuth, async (req, res) => {
  res.status(400).json({ error: 'Billing portal is not supported with PayU payments.' });
});

billingRouter.get('/session/:sessionId', requireAuth, async (req, res) => {
  const { userId } = req as AuthenticatedRequest;
  const sessionId = req.params.sessionId;
  if (!sessionId || Array.isArray(sessionId)) {
    res.status(400).json({ error: 'Invalid session id' });
    return;
  }

  try {
    const transaction = await PayUTransaction.findOne({ txnid: sessionId });
    if (!transaction) {
      res.status(404).json({ error: 'Checkout session not found' });
      return;
    }

    if (transaction.userId.toString() !== userId) {
      res.status(403).json({ error: 'Session does not belong to this user' });
      return;
    }

    res.json({
      status: transaction.status === 'success' ? 'paid' : transaction.status,
      mode: 'payment',
      planId: transaction.planId,
      billingMonths: transaction.billingMonths,
      subscriptionStatus: transaction.status === 'success' ? 'active' : null,
    });
  } catch (error) {
    console.error('Session lookup failed:', error);
    res.status(500).json({ error: 'Session lookup failed' });
  }
});
