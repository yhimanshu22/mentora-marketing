import { Router } from 'express';

import type { AuthenticatedRequest } from '../middleware/auth.js';
import { requireAuth } from '../middleware/auth.js';
import { getEntitlements } from '../models/User.js';
import { CreditError, consumeUserCredit } from '../services/credits.js';
import { hostedTranscribe, streamHostedChat, streamHostedVision } from '../services/hosted-ai.js';
import { whisperLanguageCode } from '../services/prompts.js';
import { config } from '../config.js';

export const aiRouter = Router();

function ensureAiConfigured(res: Parameters<Router['post']>[1] extends (req: any, res: infer R) => any ? R : never) {
  if (!config.geminiApiKey && !config.groqApiKey) {
    res.status(503).json({
      error: 'Mentora AI is not configured. Add GEMINI_API_KEY and/or GROQ_API_KEY on the server.',
    });
    return false;
  }
  return true;
}

function handleCreditError(res: Parameters<Router['post']>[1] extends (req: any, res: infer R) => any ? R : never, error: unknown) {
  if (error instanceof CreditError) {
    res.status(error.status).json({ error: error.message, entitlements: error.entitlements });
    return;
  }

  const message = error instanceof Error ? error.message : 'AI request failed';
  console.error('AI route error:', error);
  res.status(500).json({ error: message });
}

aiRouter.post('/chat', requireAuth, async (req, res) => {
  if (!ensureAiConfigured(res)) {
    return;
  }

  const { user } = req as AuthenticatedRequest;
  const resume = String(req.body?.resume ?? '').trim();
  const userMessage = String(req.body?.userMessage ?? '').trim();
  const history = Array.isArray(req.body?.history) ? req.body.history : [];
  const preferences = req.body?.preferences ?? {};
  const documentContext = String(req.body?.documentContext ?? '');

  if (!resume) {
    res.status(400).json({ error: 'Resume/profile is required' });
    return;
  }
  if (!userMessage) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  try {
    const entitlements = await consumeUserCredit(user, 3);

    const full = await streamHostedChat(res, entitlements, {
      resume,
      history,
      userMessage,
      preferences,
      documentContext,
    });

    res.write(`event: mentora-complete\ndata: ${JSON.stringify({ text: full })}\n\n`);
    res.end();
  } catch (error) {
    if (!res.headersSent) {
      handleCreditError(res, error);
      return;
    }
    res.write(`event: mentora-error\ndata: ${JSON.stringify({ error: error instanceof Error ? error.message : 'AI request failed' })}\n\n`);
    res.end();
  }
});

aiRouter.post('/vision', requireAuth, async (req, res) => {
  if (!ensureAiConfigured(res)) {
    return;
  }

  const { user } = req as AuthenticatedRequest;
  const resume = String(req.body?.resume ?? '').trim();
  const imageBase64 = String(req.body?.imageBase64 ?? '').trim();
  const history = Array.isArray(req.body?.history) ? req.body.history : [];
  const preferences = req.body?.preferences ?? {};
  const documentContext = String(req.body?.documentContext ?? '');

  if (!resume) {
    res.status(400).json({ error: 'Resume/profile is required' });
    return;
  }
  if (!imageBase64) {
    res.status(400).json({ error: 'Screenshot image is required' });
    return;
  }

  try {
    const entitlements = await consumeUserCredit(user, 3);

    const full = await streamHostedVision(res, entitlements, {
      resume,
      history,
      imageBase64,
      preferences,
      documentContext,
    });

    res.write(`event: mentora-complete\ndata: ${JSON.stringify({ text: full })}\n\n`);
    res.end();
  } catch (error) {
    if (!res.headersSent) {
      handleCreditError(res, error);
      return;
    }
    res.write(`event: mentora-error\ndata: ${JSON.stringify({ error: error instanceof Error ? error.message : 'AI request failed' })}\n\n`);
    res.end();
  }
});

aiRouter.post('/transcribe', requireAuth, async (req, res) => {
  if (!ensureAiConfigured(res)) {
    return;
  }

  const { user } = req as AuthenticatedRequest;
  const audioBase64 = String(req.body?.audioBase64 ?? '').trim();
  const language = whisperLanguageCode(req.body?.language);

  if (!audioBase64) {
    res.status(400).json({ error: 'Audio data is required' });
    return;
  }

  try {
    const text = await hostedTranscribe(audioBase64, language);
    res.json({
      text,
      entitlements: getEntitlements(user),
    });
  } catch (error) {
    handleCreditError(res, error);
  }
});
