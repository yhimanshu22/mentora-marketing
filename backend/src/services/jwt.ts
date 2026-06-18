import jwt from 'jsonwebtoken';

import { config } from '../config.js';
import type { AuthTokenPayload } from '../types.js';

export function signAuthToken(userId: string, googleId: string): string {
  const payload: AuthTokenPayload = { sub: googleId, userId };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: '30d' });
}

export function verifyAuthToken(token: string): AuthTokenPayload {
  return jwt.verify(token, config.jwtSecret) as AuthTokenPayload;
}
