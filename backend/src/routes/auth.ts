import { Router } from 'express';

import { config } from '../config.js';
import type { AuthenticatedRequest } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { getEntitlements, toPublicUser, User, type UserDocument } from '../models/User.js';
import { exchangeGoogleAuthCode, verifyGoogleCredential } from '../services/google.js';
import { signAuthToken } from '../services/jwt.js';
import { PLANS } from '../services/plans.js';

export const authRouter = Router();

async function createSessionFromProfile(profile: Awaited<ReturnType<typeof verifyGoogleCredential>>) {
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

  return buildAuthResponse(user);
}

function buildAuthResponse(user: UserDocument) {
  const token = signAuthToken(user._id.toString(), user.googleId);
  return {
    token,
    user: toPublicUser(user),
    entitlements: getEntitlements(user),
  };
}

authRouter.post('/google', async (req, res) => {
  const credential = req.body?.credential;
  if (typeof credential !== 'string' || !credential) {
    res.status(400).json({ error: 'Google credential is required' });
    return;
  }

  try {
    const profile = await verifyGoogleCredential(credential);
    res.json(await createSessionFromProfile(profile));
  } catch (error) {
    console.error('Google auth failed:', error);
    res.status(401).json({ error: 'Google sign-in failed' });
  }
});

function authErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : 'Google sign-in failed';
  if (config.nodeEnv === 'production') {
    return message.includes('GOOGLE_CLIENT_SECRET') ||
      message.includes('Client ID mismatch')
      ? message
      : 'Google sign-in failed';
  }
  return message;
}

authRouter.post('/google/code', async (req, res) => {
  const code = req.body?.code;
  const redirectUri = req.body?.redirectUri;
  const googleClientId =
    typeof req.body?.googleClientId === 'string' ? req.body.googleClientId : config.googleClientId;

  if (typeof code !== 'string' || !code) {
    res.status(400).json({ error: 'Authorization code is required' });
    return;
  }
  if (typeof redirectUri !== 'string' || !redirectUri) {
    res.status(400).json({ error: 'Redirect URI is required' });
    return;
  }

  try {
    const idToken = await exchangeGoogleAuthCode(code, redirectUri, googleClientId);
    const profile = await verifyGoogleCredential(idToken);
    res.json(await createSessionFromProfile(profile));
  } catch (error) {
    console.error('Google code exchange failed:', error);
    res.status(401).json({ error: authErrorMessage(error) });
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
