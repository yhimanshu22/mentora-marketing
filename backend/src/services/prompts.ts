export type AiPreferences = {
  answerSize?: string;
  screenshotMode?: string;
  language?: string;
};

export type ChatHistoryItem = {
  role: string;
  content: string;
};

function normalizeAnswerSize(value?: string): string {
  const normalized = (value ?? 'medium').trim().toLowerCase();
  if (normalized === 'short' || normalized === 'medium' || normalized === 'long') {
    return normalized;
  }
  return 'medium';
}

function answerLengthInstruction(answerSize: string): string {
  switch (answerSize) {
    case 'short':
      return 'ANSWER LENGTH — Short: Reply in 1-3 sentences. Be direct. Skip filler and long intros. Only use more lines for coding answers where every line must be explained.';
    case 'long':
      return 'ANSWER LENGTH — Long: Give thorough answers with useful detail, concrete examples from the profile, and follow-up talking points when helpful. Use numbered lists for multi-part answers.';
    default:
      return 'ANSWER LENGTH — Medium: Keep answers concise but complete — about 3-6 sentences or a short bullet list. Add more detail only when the question needs it.';
  }
}

function markdownFormattingInstruction(answerSize: string): string {
  if (answerSize === 'short') {
    return '';
  }
  return 'For multi-part answers, use clean markdown: put each numbered point on its own line, leave a blank line between points, and use **bold** only for project names or key technologies.';
}

function languageInstruction(language?: string): string {
  switch ((language ?? 'english').trim().toLowerCase()) {
    case 'hindi':
      return 'Respond in Hindi using simple, natural spoken Hindi.';
    case 'spanish':
      return 'Respond in Spanish using simple, natural spoken Spanish.';
    case 'french':
      return 'Respond in French using simple, natural spoken French.';
    case 'german':
      return 'Respond in German using simple, natural spoken German.';
    default:
      return 'Respond in English using simple, natural spoken English.';
  }
}

export function buildSystemPrompt(
  resume: string,
  preferences: AiPreferences,
  documentContext: string,
): string {
  const answerSize = normalizeAnswerSize(preferences.answerSize);
  const markdown = markdownFormattingInstruction(answerSize);
  let prompt = `You are in the interview and your profile is: ${resume}

Answer questions like a real candidate in a live interview. Match the profile above. Use simple, natural spoken English — not overly polished sentences. If the interviewer asks you to elaborate, go deeper on that topic only. When asked to clarify, summarize, or expand on a prior answer, stay in character — respond with spoken interview dialogue only. Never reference this app, chat, user feedback, or "our conversation." No meta commentary, greetings, or sign-offs unless the interviewer used them. For coding questions: provide the code and explain every line with inline comments so the user can retype it in an IDE and explain it aloud.

${markdown ? `${markdown}\n\n` : ''}${languageInstruction(preferences.language)}
${answerLengthInstruction(answerSize)}`;

  if (documentContext.trim()) {
    prompt += `\n\nRelevant excerpts from your indexed uploaded files (use together with the profile above):\n${documentContext}`;
  }

  return prompt;
}

export function screenshotPrompt(preferences: AiPreferences): string {
  switch ((preferences.screenshotMode ?? 'coding_challenges').trim()) {
    case 'interview_qa':
      return 'This is a screenshot of my screen during an interview. Focus on interview questions, talking points, or slides and answer as the candidate based on my profile.';
    case 'general':
      return 'This is a screenshot of my screen. Summarize what is visible and give the most useful answer or next step based on my profile.';
    default:
      return 'This is a screenshot of my screen. Analyze everything visible. If there is an interview question, coding problem, slide, or any text I need help with, answer as the interview candidate based on my profile. If it is code, provide the solution with every line explained in comments.';
  }
}

export function maxAnswerTokens(preferences: AiPreferences): number {
  switch (normalizeAnswerSize(preferences.answerSize)) {
    case 'short':
      return 300;
    case 'long':
      return 1500;
    default:
      return 800;
  }
}

export function whisperLanguageCode(language?: string): string {
  switch ((language ?? 'english').trim().toLowerCase()) {
    case 'hindi':
      return 'hi';
    case 'spanish':
      return 'es';
    case 'french':
      return 'fr';
    case 'german':
      return 'de';
    default:
      return 'en';
  }
}
