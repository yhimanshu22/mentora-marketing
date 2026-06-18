export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readMinutes: number;
  keywords: string;
  sections: readonly { heading?: string; paragraphs: readonly string[] }[];
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: 'ai-interview-assistant-guide',
    title: 'AI Interview Assistant Guide: How to Prepare for Live Technical Screens',
    excerpt:
      'Learn how an AI interview assistant helps with real-time transcription, resume-aware answers, and discreet coaching during Zoom and Teams calls.',
    publishedAt: '2026-06-10',
    readMinutes: 6,
    keywords:
      'AI interview assistant, technical interview preparation, live interview coaching, Zoom interview help',
    sections: [
      {
        paragraphs: [
          'Technical interviews move fast. You are expected to explain past projects, solve problems on the spot, and stay calm while interviewers stack follow-up questions. An AI interview assistant like Mentora listens to meeting audio, transcribes questions in real time, and suggests answers based on your resume.',
        ],
      },
      {
        heading: 'Why real-time transcription matters',
        paragraphs: [
          'When nerves kick in, it is easy to miss part of a question. Live transcription gives you a second chance to read exactly what was asked before you answer. Mentora uses fast speech-to-text so you are not guessing what the interviewer meant.',
          'This is especially useful in panel interviews, accent-heavy calls, or noisy environments where audio quality is inconsistent.',
        ],
      },
      {
        heading: 'Profile-aware answers beat generic AI',
        paragraphs: [
          'Generic chatbots do not know your background. Mentora loads your resume, skills, and project notes so every suggestion sounds like you—not a template. That makes follow-up questions easier because your story stays consistent.',
        ],
      },
      {
        heading: 'Stay discreet with hide mode',
        paragraphs: [
          'Screen sharing is common in technical rounds. Mentora hide mode and content protection help keep coaching off shared screens while you read answers in a floating desktop window above your IDE or browser.',
        ],
      },
    ],
  },
  {
    slug: 'hide-mode-screen-share-interviews',
    title: 'Hide Mode for Screen Sharing: Stay Invisible During Online Interviews',
    excerpt:
      'Screen share hide mode lets you use an AI meeting assistant without exposing coaching windows to interviewers on Zoom, Meet, or Teams.',
    publishedAt: '2026-06-12',
    readMinutes: 5,
    keywords:
      'screen share hide mode, invisible interview assistant, Zoom screen share privacy, meeting overlay',
    sections: [
      {
        paragraphs: [
          'Many candidates want AI coaching during interviews but worry about screen sharing. If your assistant window appears on the shared screen, it can create an awkward moment—or worse, violate company policies.',
        ],
      },
      {
        heading: 'What hide mode does',
        paragraphs: [
          'Mentora hide mode is designed to keep the coaching overlay off most screen captures and shares. You can position the window above your code editor or notes and read suggestions without broadcasting them to the room.',
          'Always test hide mode with your exact setup before a high-stakes call. Platforms and OS versions handle screen capture differently.',
        ],
      },
      {
        heading: 'Best practices before you share',
        paragraphs: [
          'Toggle hide mode before sharing your screen. Use a transparent overlay to read bullet points instead of long paragraphs. Keep answers short so your delivery still sounds natural.',
          'Mentora is a coaching tool—not a script. Use it to remember metrics, project names, and structure, then speak in your own voice.',
        ],
      },
    ],
  },
  {
    slug: 'real-time-meeting-transcription-tools',
    title: 'Real-Time Meeting Transcription for Interviews: What to Look For',
    excerpt:
      'Compare what makes real-time meeting transcription useful for interviews: latency, accuracy, local processing, and integration with AI answer tools.',
    publishedAt: '2026-06-14',
    readMinutes: 5,
    keywords:
      'real-time meeting transcription, interview transcription software, live STT for meetings, Groq Whisper',
    sections: [
      {
        paragraphs: [
          'Not all transcription tools are built for live interviews. Post-meeting summaries help with notes, but interviews need low latency, high accuracy, and tight integration with answer generation.',
        ],
      },
      {
        heading: 'Latency is everything',
        paragraphs: [
          'If transcription arrives five seconds after a question, you have already started answering. Mentora targets sub-second transcription using fast STT providers like Groq Whisper so prompts appear while the question is still fresh.',
        ],
      },
      {
        heading: 'Local processing and privacy',
        paragraphs: [
          'Interview conversations can include salary expectations, employer names, and proprietary project details. Choose tools that process audio locally when possible and let you control which API keys send data to third parties.',
        ],
      },
      {
        heading: 'From transcript to coaching',
        paragraphs: [
          'Transcription alone is not enough. The best meeting assistants pipe transcripts directly into profile-aware AI models so you get suggested talking points—not just a wall of text to read mid-call.',
        ],
      },
    ],
  },
  {
    slug: 'coding-interview-screenshot-assist',
    title: 'Screenshot Assist for Coding Interviews: Solve Problems Faster',
    excerpt:
      'How screenshot assist captures LeetCode-style prompts, whiteboard photos, and IDE questions to generate step-by-step solutions during technical screens.',
    publishedAt: '2026-06-16',
    readMinutes: 4,
    keywords:
      'coding interview screenshot assist, technical interview AI, LeetCode interview help, whiteboard problem solver',
    sections: [
      {
        paragraphs: [
          'Coding interviews often jump between verbal questions and on-screen problems. Screenshot assist lets you capture the exact prompt—whether it is a browser tab, shared slide, or IDE—and get structured guidance without retyping the problem.',
        ],
      },
      {
        heading: 'When screenshot assist helps most',
        paragraphs: [
          'Long problem statements with constraints and examples are tedious to copy manually. A single capture saves time and reduces transcription errors that lead to wrong approaches.',
          'Mentora grounds solutions in your profile when possible, so explanations reference your preferred languages, frameworks, and past projects.',
        ],
      },
      {
        heading: 'Use it as a coach, not a crutch',
        paragraphs: [
          'Strong candidates still explain their thinking out loud. Use screenshot assist to confirm edge cases, recall syntax, or sanity-check complexity—not to read code verbatim without understanding it.',
        ],
      },
    ],
  },
] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
