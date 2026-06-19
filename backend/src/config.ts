import 'dotenv/config';

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name: string, fallback = ''): string {
  return process.env[name] ?? fallback;
}

export const config = {
  port: Number(process.env.PORT ?? 3001),
  nodeEnv: optional('NODE_ENV', 'development'),
  mongodbUri: required('MONGODB_URI'),
  jwtSecret: required('JWT_SECRET'),
  googleClientId: required('GOOGLE_CLIENT_ID'),
  googleClientSecret: optional('GOOGLE_CLIENT_SECRET'),
  stripeSecretKey: required('STRIPE_SECRET_KEY'),
  stripeWebhookSecret: required('STRIPE_WEBHOOK_SECRET'),
  siteUrl: optional('SITE_URL', 'http://localhost:5173').replace(/\/$/, ''),
  corsOrigins: optional('CORS_ORIGINS', 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
