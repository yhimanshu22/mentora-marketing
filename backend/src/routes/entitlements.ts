import { Router } from 'express';

import type { AuthenticatedRequest } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { getEntitlements, User } from '../models/User.js';
import { CreditError, consumeUserCredit, loadUserOrThrow } from '../services/credits.js';

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

  try {
    const user = await loadUserOrThrow(userId);
    const entitlements = await consumeUserCredit(user, amount);
    res.json({ consumed: amount, entitlements });
  } catch (error) {
    if (error instanceof CreditError) {
      res.status(error.status).json({ error: error.message, entitlements: error.entitlements });
      return;
    }
    if (error instanceof Error && error.message === 'User not found') {
      res.status(404).json({ error: error.message });
      return;
    }
    if (error instanceof Error && error.message === 'Invalid credit amount') {
      res.status(400).json({ error: error.message });
      return;
    }
    res.status(500).json({ error: 'Failed to consume credits' });
  }
});
