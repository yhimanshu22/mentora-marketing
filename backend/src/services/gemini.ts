import type { Response } from 'express';

import { config } from '../config.js';

const GEMINI_CHAT_MODELS = ['gemini-3.1-flash-lite'];
const GEMINI_AUDIO_MODELS = ['gemini-3.1-flash-lite'];

function geminiEndpoint(model: string, stream: boolean): string {
  const action = stream ? 'streamGenerateContent' : 'generateContent';
  return `https://generativelanguage.googleapis.com/v1beta/models/${model}:${action}`;
}

function ensureGeminiKey(): string {
  if (!config.geminiApiKey) {
    throw new Error('Gemini API is not configured on the server');
  }
  return config.geminiApiKey;
}

export function geminiTextFromResponse(payload: unknown): string {
  const data = payload as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
}

export async function geminiGenerate(body: Record<string, unknown>, operation: string) {
  const apiKey = ensureGeminiKey();
  let lastError = 'No Gemini models available.';

  for (const model of GEMINI_AUDIO_MODELS) {
    const response = await fetch(`${geminiEndpoint(model, false)}?key=${encodeURIComponent(apiKey)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return response.json();
    }

    const errorBody = await response.text();
    lastError = `${operation} failed on ${model} (${response.status}): ${errorBody}`;
    if (response.status !== 429) {
      throw new Error(lastError);
    }
  }

  throw new Error(lastError);
}

export async function geminiStreamPassthrough(
  res: Response,
  body: Record<string, unknown>,
  operation: string,
): Promise<string> {
  const apiKey = ensureGeminiKey();
  const model = GEMINI_CHAT_MODELS[0];
  const response = await fetch(
    `${geminiEndpoint(model, true)}?key=${encodeURIComponent(apiKey)}&alt=sse`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok || !response.body) {
    const errorBody = await response.text();
    throw new Error(`${operation} failed on ${model} (${response.status}): ${errorBody}`);
  }

  const reader = response.body.getReader();
  let full = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }

    res.write(value);

    buffer += new TextDecoder().decode(value, { stream: true });
    let newlineIndex = buffer.indexOf('\n');
    while (newlineIndex >= 0) {
      const line = buffer.slice(0, newlineIndex).trim();
      buffer = buffer.slice(newlineIndex + 1);
      const delta = parseGeminiSseLine(line);
      if (delta) {
        full += delta;
      }
      newlineIndex = buffer.indexOf('\n');
    }
  }

  const tail = parseGeminiSseLine(buffer.trim());
  if (tail) {
    full += tail;
  }

  return full;
}

export async function geminiStream(
  body: Record<string, unknown>,
  operation: string,
  onChunk: (chunk: string) => void,
): Promise<string> {
  const apiKey = ensureGeminiKey();
  let lastError = 'No Gemini models available.';

  for (const model of GEMINI_CHAT_MODELS) {
    const response = await fetch(
      `${geminiEndpoint(model, true)}?key=${encodeURIComponent(apiKey)}&alt=sse`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      },
    );

    if (!response.ok || !response.body) {
      const errorBody = await response.text();
      lastError = `${operation} failed on ${model} (${response.status}): ${errorBody}`;
      if (response.status !== 429) {
        throw new Error(lastError);
      }
      continue;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let full = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });
      let newlineIndex = buffer.indexOf('\n');
      while (newlineIndex >= 0) {
        const line = buffer.slice(0, newlineIndex).trim();
        buffer = buffer.slice(newlineIndex + 1);
        const delta = parseGeminiSseLine(line);
        if (delta) {
          full += delta;
          onChunk(delta);
        }
        newlineIndex = buffer.indexOf('\n');
      }
    }

    const tail = parseGeminiSseLine(buffer.trim());
    if (tail) {
      full += tail;
      onChunk(tail);
    }

    return full;
  }

  throw new Error(lastError);
}

function parseGeminiSseLine(line: string): string | null {
  const data = line.startsWith('data: ') ? line.slice(6).trim() : line.trim();
  if (!data) {
    return null;
  }

  try {
    const payload = JSON.parse(data) as {
      candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
    };
    return payload.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  } catch {
    return null;
  }
}

export async function geminiTranscribe(audioBase64: string, mimeType: string): Promise<string> {
  const body = {
    contents: [
      {
        parts: [
          {
            inline_data: {
              mime_type: mimeType,
              data: audioBase64,
            },
          },
          {
            text: 'Transcribe only clear human speech from a live meeting or interview in this audio. Return only the spoken words in English. If the audio is silent, unclear, or contains no human speech, return an empty string with no commentary.',
          },
        ],
      },
    ],
  };

  const payload = await geminiGenerate(body, 'Gemini transcription');
  return geminiTextFromResponse(payload);
}
