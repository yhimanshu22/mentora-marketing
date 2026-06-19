import type { NextFunction, Request, Response } from 'express';

import { User, type UserDocument } from '../models/User.js';
import { verifyAuthToken } from '../services/jwt.js';

export type AuthenticatedRequest = Request & {
  userId: string;
  user: UserDocument;
};

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing authorization token' });
    return;
  }

  const token = header.slice('Bearer '.length);
  try {
    const payload = verifyAuthToken(token);
    const user = await User.findById(payload.userId);
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    const authReq = req as AuthenticatedRequest;
    authReq.userId = user._id.toString();
    authReq.user = user;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
