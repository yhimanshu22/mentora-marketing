import { Router } from 'express';

import type { AuthenticatedRequest } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { getEntitlements } from '../models/User.js';
import { CreditError, consumeUserCredit } from '../services/credits.js';

export const entitlementsRouter = Router();

entitlementsRouter.get('/', requireAuth, async (req, res) => {
  const { user } = req as AuthenticatedRequest;
  res.json(getEntitlements(user));
});

entitlementsRouter.post('/consume', requireAuth, async (req, res) => {
  const amount = Number(req.body?.amount ?? 1);
  const { user } = req as AuthenticatedRequest;

  try {
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
