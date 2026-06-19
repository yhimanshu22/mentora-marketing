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
  if (!payload?.sub || !payload.email) {
    throw new Error('Invalid Google token payload');
  }

  return {
    sub: payload.sub,
    email: payload.email,
    name: payload.name || payload.email.split('@')[0] || 'User',
    picture: payload.picture ?? '',
  };
}

export async function exchangeGoogleAuthCode(
  code: string,
  redirectUri: string,
  clientId: string = config.googleClientId,
): Promise<string> {
  if (!config.googleClientSecret) {
    throw new Error('GOOGLE_CLIENT_SECRET is not configured on the server');
  }

  if (clientId !== config.googleClientId) {
    throw new Error(
      'Google Client ID mismatch between desktop app and backend. Use the same GOOGLE_CLIENT_ID in backend/.env and mentora/frontend/.env',
    );
  }

  const oauthClient = new OAuth2Client(
    clientId,
    config.googleClientSecret,
    redirectUri,
  );

  try {
    const { tokens } = await oauthClient.getToken({
      code,
      redirect_uri: redirectUri,
    });
    if (!tokens.id_token) {
      throw new Error('Google did not return an ID token');
    }
    return tokens.id_token;
  } catch (error) {
    const message = formatGoogleAuthError(error);
    if (message.includes('redirect_uri_mismatch')) {
      throw new Error(
        'redirect_uri_mismatch: add http://127.0.0.1:38473/oauth/callback to Google Cloud Console → OAuth client → Authorized redirect URIs',
      );
    }
    throw new Error(message);
  }
}

function formatGoogleAuthError(error: unknown): string {
  if (error && typeof error === 'object' && 'response' in error) {
    const data = (error as { response?: { data?: { error?: string; error_description?: string } } })
      .response?.data;
    if (data?.error_description) return data.error_description;
    if (data?.error) return `Google OAuth error: ${data.error}`;
  }
  if (error instanceof Error) return error.message;
  return 'Google token exchange failed';
}
