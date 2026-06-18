import { OAuth2Client } from 'google-auth-library';

import { config } from '../config.js';

const client = new OAuth2Client(config.googleClientId);

export type GoogleProfile = {
  sub: string;
  email: string;
  name: string;
  picture: string;
};

export async function verifyGoogleCredential(credential: string): Promise<GoogleProfile> {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: config.googleClientId,
  });

  const payload = ticket.getPayload();
  if (!payload?.sub || !payload.email || !payload.name) {
    throw new Error('Invalid Google token payload');
  }

  return {
    sub: payload.sub,
    email: payload.email,
    name: payload.name,
    picture: payload.picture ?? '',
  };
}
