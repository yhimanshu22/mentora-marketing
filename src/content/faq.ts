export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'What is Mentora and how does it assist in meetings?',
    answer:
      'Mentora is an AI meeting assistant and real-time summarisation tool. It transcribes audio live, surfaces context-aware talking points, and generates structured executive summaries and action items without requiring a bot to join your call.',
  },
  {
    question: 'How does Mentora summarize meetings in real time?',
    answer:
      'Mentora captures live system audio, generates sub-second speech-to-text transcripts, and extracts key discussions, decisions, and action items in real time. When your call finishes, you get a clean, comprehensive summary with a single click.',
  },
  {
    question: 'Does Mentora work with Zoom, Google Meet, and Microsoft Teams?',
    answer:
      'Yes. Mentora runs as a native desktop app on Windows and macOS, capturing audio from Zoom, Google Meet, Microsoft Teams, Webex, Slack Huddles, and browser-based calls.',
  },
  {
    question: 'Does Mentora require a bot to join the call room?',
    answer:
      'No. Mentora works completely bot-free by capturing system audio on your device, ensuring a private, seamless experience with zero awkward bot notifications or waiting room delays.',
  },
  {
    question: 'How does window protection work during screen shares?',
    answer:
      'Mentora includes native OS window content protection designed to keep the assistant HUD and summary notes visible only on your local display, keeping your live notes private while presenting.',
  },
  {
    question: 'Is my meeting audio sent to Mentora servers?',
    answer:
      'Mentora is built privacy-first. System audio is captured locally, and data requests are processed via encrypted, high-speed API channels solely to generate your live transcription and meeting summaries.',
  },
  {
    question: 'Do I need my own OpenAI or Gemini API key?',
    answer:
      'No. Mentora provides fully-managed, high-speed access to OpenAI, Google Gemini, and Groq transcription directly through your plan credits. No complex key setup is required.',
  },
  {
    question: 'What is the difference between Starter, Pro, Ultimate, and Magic plans?',
    answer:
      'Starter ($1) includes 15 credits with desktop and browser access. Pro adds 600 credits for regular team syncs and client calls. Ultimate includes 1,500 credits, Magic Keys, and fully automatic mode. Magic adds 4,000 credits and dedicated onboarding for heavy meeting schedules.',
  },
  {
    question: 'How does Screenshot Assist help during presentations and technical reviews?',
    answer:
      'Screenshot assist lets you capture any screen area—like slides, architecture diagrams, spreadsheets, or code—and instantly summarize the visual content or formulate precise talking points.',
  },
  {
    question: 'How fast are AI summaries and live responses?',
    answer:
      'Mentora streams transcription and contextual talking points in sub-second latency. Automated summaries generate instantly at any point during or immediately following your meeting.',
  },
  {
    question: 'How do I contact Mentora support?',
    answer:
      'Email us at himu09854@gmail.com or call/WhatsApp +91 81142 45060. Pro subscribers get WhatsApp and email support; Ultimate and Magic plans also include direct phone support.',
  },
] as const;
