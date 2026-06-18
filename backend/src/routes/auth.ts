import { Router } from 'express';

import type { AuthenticatedRequest } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { getEntitlements, toPublicUser, User } from '../models/User.js';
import { verifyGoogleCredential } from '../services/google.js';
import { signAuthToken } from '../services/jwt.js';
import { PLANS } from '../services/plans.js';

export const authRouter = Router();

authRouter.post('/google', async (req, res) => {
  const credential = req.body?.credential;
  if (typeof credential !== 'string' || !credential) {
    res.status(400).json({ error: 'Google credential is required' });
    return;
  }

  try {
    const profile = await verifyGoogleCredential(credential);
    let user = await User.findOne({ googleId: profile.sub });

    if (!user) {
      user = await User.create({
        googleId: profile.sub,
        email: profile.email,
        name: profile.name,
        picture: profile.picture,
        plan: PLANS.free.id,
        credits: PLANS.free.credits,
      });
    } else {
      user.email = profile.email;
      user.name = profile.name;
      user.picture = profile.picture;
      await user.save();
    }

    const token = signAuthToken(user._id.toString(), user.googleId);
    res.json({
      token,
      user: toPublicUser(user),
      entitlements: getEntitlements(user),
    });
  } catch (error) {
    console.error('Google auth failed:', error);
    res.status(401).json({ error: 'Google sign-in failed' });
  }
});

authRouter.get('/me', requireAuth, async (req, res) => {
  const { userId } = req as AuthenticatedRequest;
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({
    user: toPublicUser(user),
    entitlements: getEntitlements(user),
  });
});
