import type { Response } from 'express';

import type { Entitlements } from '../types.js';
import {
  buildSystemPrompt,
  maxAnswerTokens,
  screenshotPrompt,
  type AiPreferences,
  type ChatHistoryItem,
} from './prompts.js';
import { geminiStream, geminiTranscribe } from './gemini.js';
import { groqTranscribe, hasGroqKey } from './groq.js';
import { config } from '../config.js';

function writeEntitlements(res: Response, entitlements: Entitlements) {
  res.write(`event: mentora-entitlements\ndata: ${JSON.stringify(entitlements)}\n\n`);
}

export async function streamHostedChat(
  res: Response,
  entitlements: Entitlements,
  input: {
    resume: string;
    history: ChatHistoryItem[];
    userMessage: string;
    preferences: AiPreferences;
    documentContext: string;
  },
): Promise<string> {
  const contents = input.history.map((entry) => ({
    role: entry.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: entry.content }],
  }));

  contents.push({
    role: 'user',
    parts: [{ text: input.userMessage }],
  });

  const body = {
    system_instruction: {
      parts: [{ text: buildSystemPrompt(input.resume, input.preferences, input.documentContext) }],
    },
    contents,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: maxAnswerTokens(input.preferences),
    },
  };

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  writeEntitlements(res, entitlements);

  return geminiStream(body, 'Hosted chat', (chunk) => {
    res.write(`data: ${JSON.stringify({ candidates: [{ content: { parts: [{ text: chunk }] } }] })}\n\n`);
  });
}

export async function streamHostedVision(
  res: Response,
  entitlements: Entitlements,
  input: {
    resume: string;
    history: ChatHistoryItem[];
    imageBase64: string;
    preferences: AiPreferences;
    documentContext: string;
  },
): Promise<string> {
  const prompt = screenshotPrompt(input.preferences);
  const contents: Array<Record<string, unknown>> = input.history.map((entry) => ({
    role: entry.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: entry.content }],
  }));

  contents.push({
    role: 'user',
    parts: [
      {
        inline_data: {
          mime_type: 'image/png',
          data: input.imageBase64,
        },
      },
      { text: prompt },
    ],
  });

  const body = {
    system_instruction: {
      parts: [{ text: buildSystemPrompt(input.resume, input.preferences, input.documentContext) }],
    },
    contents,
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: maxAnswerTokens(input.preferences),
    },
  };

  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  writeEntitlements(res, entitlements);

  return geminiStream(body, 'Hosted vision', (chunk) => {
    res.write(`data: ${JSON.stringify({ candidates: [{ content: { parts: [{ text: chunk }] } }] })}\n\n`);
  });
}

export async function hostedTranscribe(
  audioBase64: string,
  language: string,
): Promise<string> {
  const audioBytes = Buffer.from(audioBase64, 'base64');
  if (audioBytes.length < 100) {
    return '';
  }

  const isWav = audioBytes.length >= 4 && audioBytes.subarray(0, 4).toString('ascii') === 'RIFF';
  const fileName = isWav ? 'audio.wav' : 'audio.webm';
  const mimeType = isWav ? 'audio/wav' : 'audio/webm';

  if (hasGroqKey()) {
    return groqTranscribe(audioBytes, fileName, mimeType, language);
  }

  if (!config.geminiApiKey) {
    throw new Error('No speech-to-text provider is configured on the server');
  }

  return geminiTranscribe(audioBase64, mimeType);
}
