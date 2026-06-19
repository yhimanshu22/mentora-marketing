import cors from 'cors';
import express from 'express';

import { config } from './config.js';
import { connectDatabase } from './db.js';
import { authRouter } from './routes/auth.js';
import { billingRouter, handleStripeWebhook } from './routes/billing.js';
import { entitlementsRouter } from './routes/entitlements.js';
import { aiRouter } from './routes/ai.js';

export async function createApp() {
  await connectDatabase();

  const app = express();

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.post(
    '/api/billing/webhook',
    express.raw({ type: 'application/json' }),
    handleStripeWebhook,
  );

  app.use(
    cors({
      origin: config.corsOrigins,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '25mb' }));

  app.use('/api/auth', authRouter);
  app.use('/api/billing', billingRouter);
  app.use('/api/entitlements', entitlementsRouter);
  app.use('/api/ai', aiRouter);

  app.use((error: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
  });

  return app;
}

async function main() {
  const app = await createApp();
  app.listen(config.port, '0.0.0.0', () => {
    console.log(`Mentora API listening on port ${config.port}`);
  });
}

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
