import { Router } from 'express';

import type { AuthenticatedRequest } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { getEntitlements, User } from '../models/User.js';

export const entitlementsRouter = Router();

entitlementsRouter.get('/', requireAuth, async (req, res) => {
  const { userId } = req as AuthenticatedRequest;
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json(getEntitlements(user));
});

entitlementsRouter.post('/consume', requireAuth, async (req, res) => {
  const amount = Number(req.body?.amount ?? 1);
  const { userId } = req as AuthenticatedRequest;

  if (!Number.isFinite(amount) || amount < 1) {
    res.status(400).json({ error: 'Invalid credit amount' });
    return;
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const entitlements = getEntitlements(user);
  if (!entitlements.canUseAi) {
    res.status(402).json({
      error: 'No active plan or credits remaining',
      entitlements,
    });
    return;
  }

  if (user.credits < amount) {
    res.status(402).json({
      error: 'Insufficient credits',
      entitlements,
    });
    return;
  }

  user.credits -= amount;
  await user.save();

  res.json({
    consumed: amount,
    entitlements: getEntitlements(user),
  });
});
