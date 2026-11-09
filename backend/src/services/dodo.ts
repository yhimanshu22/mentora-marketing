import DodoPayments from 'dodopayments';
import { config } from '../config.js';

export const dodo = new DodoPayments({
  bearerToken: config.dodoApiKey,
  webhookKey: config.dodoWebhookKey || undefined,
  environment: config.dodoEnv === 'live_mode' ? 'live_mode' : 'test_mode',
});

export const PLAN_DODO_PRODUCTS: Record<string, string> = {
  pro: config.dodoProductIdPro,
  ultimate: config.dodoProductIdUltimate,
  magic: config.dodoProductIdMagic,
};
