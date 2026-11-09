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
  dodoApiKey: optional('DODO_PAYMENTS_API_KEY'),
  dodoWebhookKey: optional('DODO_PAYMENTS_WEBHOOK_KEY'),
  dodoEnv: optional('DODO_ENVIRONMENT', 'test_mode'),
  dodoProductIdPro: optional('DODO_PRODUCT_ID_PRO'),
  dodoProductIdUltimate: optional('DODO_PRODUCT_ID_ULTIMATE'),
  dodoProductIdMagic: optional('DODO_PRODUCT_ID_MAGIC'),
  siteUrl: optional('SITE_URL', 'http://localhost:5173').replace(/\/$/, ''),
  geminiApiKey: optional('GEMINI_API_KEY'),
  groqApiKey: optional('GROQ_API_KEY'),
  openaiApiKey: optional('OPENAI_API_KEY'),
  corsOrigins: optional('CORS_ORIGINS', 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};
