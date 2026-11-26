export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: readonly FaqItem[] = [
  {
    question: 'What is Mentora and what does it do?',
    answer:
      'Mentora is a real-time AI copilot for live calls, technical interviews, and meetings. It listens to conversation audio, captures on-screen context, and streams instant talking points, answers, and code solutions directly onto a discreet desktop overlay.',
  },
  {
    question: 'How does Mentora compare to Cluely and other alternatives?',
    answer:
      'While Cluely charges $149.99/mo for its "Undetectability" tier and locks users into recurring plans, Mentora includes full native OS window content protection across all plans starting at just $1 (15 credits). You get sub-second transcription, resume grounding, and screen capture without predatory lock-ins.',
  },
  {
    question: 'Does Mentora stay invisible during screen sharing?',
    answer:
      'Yes. Mentora includes built-in OS window content protection. When you share your desktop, IDE, or browser on Zoom, Google Meet, or Microsoft Teams, the Mentora window remains visible only on your physical screen and does not appear on the broadcast.',
  },
  {
    question: 'Does Mentora work with Zoom, Google Meet, and Microsoft Teams?',
    answer:
      'Yes. Mentora runs as a native desktop app on Windows and macOS, capturing audio from Zoom, Google Meet, Microsoft Teams, Webex, Slack Huddles, and browser-based calls without sending any bots into the call.',
  },
  {
    question: 'Does Mentora require a bot to join the call room?',
    answer:
      'No. Mentora works completely bot-free by capturing system audio on your device, ensuring a private, seamless experience with zero awkward bot notifications or waiting room delays.',
  },
  {
    question: 'Is my call audio sent to Mentora servers?',
    answer:
      'Mentora is built privacy-first. System audio is captured locally, and data requests are processed via encrypted, high-speed API channels solely to generate your live transcription and contextual AI answers.',
  },
  {
    question: 'Do I need my own OpenAI or Gemini API key?',
    answer:
      'No. Mentora provides fully-managed, high-speed access to OpenAI, Google Gemini, and Groq transcription directly through your plan credits. No complex key setup is required.',
  },
  {
    question: 'What is the difference between Starter, Pro, Ultimate, and Magic plans?',
    answer:
      'Starter ($1) includes 15 credits with desktop and browser access. Pro ($20/mo) adds 600 credits for regular calls and interviews. Ultimate ($50/mo) includes 1,500 credits, Magic Keys, and fully automatic mode. Magic ($95/mo) adds 4,000 credits for heavy call schedules.',
  },
  {
    question: 'How does Screenshot Assist help during technical screens and interviews?',
    answer:
      'Screenshot assist lets you capture any screen area—like code problems, architecture diagrams, or technical questions—and instantly receive structured hints, optimal algorithms, and talking points in real time.',
  },
  {
    question: 'How do I contact Mentora support?',
    answer:
      'Email us at himu09854@gmail.com or call/WhatsApp +91 81142 45060. Pro subscribers get WhatsApp and email support; Ultimate and Magic plans also include direct phone support.',
  },
] as const;
