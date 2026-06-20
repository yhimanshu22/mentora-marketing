export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'What is Mentora and how does it help in interviews?',
    answer:
      'Mentora is an AI meeting assistant for interviews and live online calls. It transcribes interviewer questions in real time and generates profile-aware answers based on your resume, so you can respond confidently without switching tabs.',
  },
  {
    question: 'Does Mentora work with Zoom, Google Meet, and Microsoft Teams?',
    answer:
      'Yes. Mentora runs as a desktop app on Windows and macOS and listens to system audio from Zoom, Google Meet, Microsoft Teams, and most other meeting platforms.',
  },
  {
    question: 'Can Mentora stay hidden during screen sharing?',
    answer:
      'Mentora includes Hide mode and content protection designed to keep the coaching window off most screen shares. You can read answers in a floating overlay while presenting or sharing your IDE.',
  },
  {
    question: 'Is my meeting audio sent to Mentora servers?',
    answer:
      'Mentora is built with privacy in mind. Meeting audio is processed locally for transcription, and profile data is stored securely. AI requests are forwarded via safe API tunnels to power your live coaching answers.',
  },
  {
    question: 'Do I need my own OpenAI or Gemini API key?',
    answer:
      'No. Mentora provides fully-managed, high-speed access to OpenAI, Google Gemini, and Groq transcription directly through your plan credits. No complex key setup is required.',
  },
  {
    question: 'What is the difference between Free, Pro, Ultimate, and Magic plans?',
    answer:
      'Free includes 15 credits with desktop and browser access. Pro adds 600 credits and faster support. Ultimate includes 1,500 credits, Magic Keys, and fully automatic mode. Magic adds 4,000 credits and optional 1-on-1 onboarding.',
  },
  {
    question: 'Can I buy the full Mentora source code?',
    answer:
      'Yes. The full source code is available as a one-time $499 purchase with desktop and browser editions, so you can self-host and customize Mentora on your own infrastructure.',
  },
  {
    question: 'Does Mentora work for technical coding interviews?',
    answer:
      'Yes. Screenshot assist captures coding problems, whiteboard slides, or IDE prompts and returns step-by-step solutions grounded in your profile and experience.',
  },
  {
    question: 'How fast are AI answers during a live interview?',
    answer:
      'Mentora streams answers in real time. Ultimate and Magic plans are tuned for speed with higher credit limits and automatic mode for hands-free coaching during fast-paced interviews.',
  },
  {
    question: 'How do I contact Mentora support?',
    answer:
      'Email us at himu09854@gmail.com or call/WhatsApp +91 81142 45060. Pro subscribers get WhatsApp and email support; Ultimate and Magic plans also include phone support.',
  },
] as const;
