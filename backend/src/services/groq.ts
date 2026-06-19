import { config } from '../config.js';

const GROQ_TRANSCRIBE_URL = 'https://api.groq.com/openai/v1/audio/transcriptions';
const GROQ_WHISPER_MODEL = 'whisper-large-v3-turbo';

function ensureGroqKey(): string {
  if (!config.groqApiKey) {
    throw new Error('Groq API is not configured on the server');
  }
  return config.groqApiKey;
}

export async function groqTranscribe(
  audioBytes: Buffer,
  fileName: string,
  mimeType: string,
  language: string,
): Promise<string> {
  const apiKey = ensureGroqKey();
  const form = new FormData();
  form.append('file', new Blob([Uint8Array.from(audioBytes)], { type: mimeType }), fileName);
  form.append('model', GROQ_WHISPER_MODEL);
  form.append('language', language);
  form.append('response_format', 'text');
  form.append('temperature', '0');

  const response = await fetch(GROQ_TRANSCRIBE_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: form,
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Groq transcription failed (${response.status}): ${body}`);
  }

  return (await response.text()).trim();
}

export function hasGroqKey(): boolean {
  return Boolean(config.groqApiKey);
}
