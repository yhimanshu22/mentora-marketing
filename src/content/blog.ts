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
    slug: 'mentora-vs-cluely-ai-pricing-comparison',
    title: 'Mentora vs Cluely AI: Feature, Privacy & Pricing Comparison (2026)',
    excerpt:
      'Compare Mentora and Cluely AI for live call copilots. Breakdown of real-time audio transcription, screen share undetectability, and why Mentora offers full privacy at $1 instead of Cluely’s $149.99/mo.',
    publishedAt: '2026-06-25',
    readMinutes: 7,
    keywords:
      'Mentora vs Cluely, Cluely AI alternatives, Cluely pricing, undetectable interview assistant, Cluely vs Mentora, live call copilot comparison',
    sections: [
      {
        paragraphs: [
          'Real-time AI copilots have transformed high-stakes remote conversations, from demanding technical interviews to enterprise sales presentations. Both Cluely and Mentora provide on-screen AI guidance by listening to live audio and parsing desktop context. However, their pricing structure, feature accessibility, and privacy models differ dramatically.',
          'If you are evaluating whether to subscribe to Cluely or choose an alternative like Mentora, here is an objective breakdown of features, detection protection, and cost.',
        ],
      },
      {
        heading: 'Pricing breakdown: Mentora vs Cluely',
        paragraphs: [
          'The most glaring difference between the two platforms lies in how privacy and undetectability are monetized:',
          '• Cluely Pricing: Cluely offers a basic free tier with strict rate limits, a Pro plan at $19.99/month, and locks its critical "Undetectability" / screen share protection behind an expensive "Pro + Undetectability" tier priced at $149.99/month ($1,799+ per year).',
          '• Mentora Pricing: Mentora believes that screen-share privacy is an essential baseline, not an enterprise upcharge. Full native OS window content protection is included across every tier—starting with Starter at just $1 (15 credits), Pro at $20/month (600 credits), and Ultimate at $50/month (1,500 credits).',
          'For candidates preparing for a 2-4 week interview cycle, paying $149.99/mo for Cluely is prohibitively expensive compared to testing Mentora for $1.',
        ],
      },
      {
        heading: 'Screen share privacy: Window protection vs paid add-on',
        paragraphs: [
          'In virtual meetings (Zoom, Microsoft Teams, Google Meet), screen sharing is routine. If your AI assistant appears on the shared screen, it ruins your presentation or technical screen.',
          'Cluely restricts screen share invisibility to its $149.99/mo package. In contrast, Mentora leverages native OS-level window affinity APIs on both Windows and macOS out of the box. Mentora’s floating HUD remains completely invisible to screen recorders, attendees, and capture software on all tiers without extra fees.',
        ],
      },
      {
        heading: 'Audio capture: Bot-free vs meeting bots',
        paragraphs: [
          'Neither tool forces an intrusive third-party bot to join the call room. Both capture system audio locally, ensuring other participants receive zero bot notifications. However, Mentora pairs direct OS loopback capture with Groq Whisper for ultra-low sub-second latency (under 800ms), giving you answers while the question is still being spoken.',
        ],
      },
      {
        heading: 'Context grounding & resume awareness',
        paragraphs: [
          'Cluely allows document uploads (up to 3 files on free, more on Pro). Mentora lets you create unlimited custom profiles, uploading your full resume, project documentation, code repositories, or company playbooks. When an interviewer asks about your past experience or system design trade-offs, Mentora grounds its suggestions in your actual work history rather than generic textbook answers.',
        ],
      },
      {
        heading: 'Self-hosting & source code option',
        paragraphs: [
          'For corporate teams, privacy advocates, and engineers with strict compliance rules, Mentora offers a one-time purchase ($499) for the complete desktop and web source code. Cluely does not offer a self-hostable source code license.',
        ],
      },
      {
        heading: 'Verdict: Which should you choose?',
        paragraphs: [
          'Choose Cluely if you are already locked into their ecosystem and do not mind paying $149.99/month for screen invisibility.',
          'Choose Mentora if you want sub-second latency, full screen-share invisibility included on all plans, resume-grounded answers, and the ability to get started immediately for just $1.',
        ],
      },
    ],
  },
  {
    slug: 'top-cluely-alternatives-live-ai-copilots',
    title: 'Top Cluely AI Alternatives for Live Calls & Interviews in 2026',
    excerpt:
      'Looking for alternatives to Cluely AI? Explore the best live call copilots, interview assistants, and bot-free desktop overlays with transparent pricing and screen share protection.',
    publishedAt: '2026-06-24',
    readMinutes: 6,
    keywords:
      'Cluely alternatives, Cluely AI competitors, interview copilot alternatives, best live call AI, Mentora vs Final Round AI',
    sections: [
      {
        paragraphs: [
          'While Cluely popularized the concept of real-time desktop AI assistance for sales calls and meetings, its $149.99/month price tag for screen share privacy has prompted many professionals to search for more affordable, flexible alternatives. Whether you are facing technical coding interviews, sales discovery calls, or panel presentations, here are the top Cluely alternatives in 2026.',
        ],
      },
      {
        heading: '1. Mentora AI — Best Overall Cluely Alternative',
        paragraphs: [
          'Mentora is engineered specifically as a native desktop AI copilot for Windows and macOS. It captures system audio with sub-second latency and displays contextual talking points, algorithms, and answers in a floating HUD.',
          'Key Advantages over Cluely:',
          '• Screen share privacy included on all plans (no $149.99/mo gatekeeping).',
          '• Test everything with Starter for just $1 (15 credits).',
          '• Profile-grounded answers: upload your resume or sales playbook for authentic responses.',
          '• Visual Screenshot Assist for coding screens (LeetCode, system architecture, database diagrams).',
          '• One-time full source code purchase available ($499) for complete data sovereignty.',
        ],
      },
      {
        heading: '2. Final Round AI',
        paragraphs: [
          'Final Round AI is one of the earliest interview copilots on the market, offering specialized mock interview practice and live coding assistance. However, it suffers from aggressive subscription auto-renewals, high monthly fees ($90–$150+/month), and rigid lock-in periods, making it less attractive for candidates with short interview timelines.',
        ],
      },
      {
        heading: '3. Littlebird & Backdrop AI',
        paragraphs: [
          'For dedicated B2B sales teams, tools like Littlebird and Backdrop focus heavily on live objection handling and CRM syncing during customer discovery calls. While strong for revenue reps, they lack the technical coding support, resume customization, and flexible credit pricing found in Mentora.',
        ],
      },
      {
        heading: '4. Granola & Fathom',
        paragraphs: [
          'If you only need post-call notes and do not require live on-screen assistance or interview answers during the conversation, Granola (bot-free notepad) and Fathom (meeting recorder) are solid choices for passive documentation.',
        ],
      },
      {
        heading: 'Summary recommendation',
        paragraphs: [
          'For professionals who need real-time, on-screen guidance during live calls without paying hundreds of dollars each month, Mentora represents the modern benchmark in speed, discretion, and value.',
        ],
      },
    ],
  },
  {
    slug: 'ai-meeting-assistant-summarisation-guide',
    title: 'The Modern Guide to Real-Time AI Copilots & Live Call Guidance',
    excerpt:
      'Discover how real-time AI copilots capture live conversation audio, transcribe questions with sub-second latency, and deliver contextual answers and talking points on your private screen.',
    publishedAt: '2026-06-10',
    readMinutes: 6,
    keywords:
      'real-time AI copilot, live interview assistant, call copilot, AI meeting guidance, Groq Whisper transcription',
    sections: [
      {
        paragraphs: [
          'High-stakes remote conversations—technical screens, system design interviews, client negotiations, and leadership syncs—move fast. An AI copilot like Mentora captures system audio in real time, generates sub-second live transcripts, and streams contextual talking points and solutions directly to your screen.',
        ],
      },
      {
        heading: 'Why real-time transcription transforms live call performance',
        paragraphs: [
          'Live transcription ensures you never miss a multi-part question or technical specification. Mentora uses high-speed speech-to-text models like Groq Whisper so you can follow verbatim discussions with sub-second latency directly on your desktop.',
          'This provides an immediate safety net during panel interviews, noisy calls, or high-pressure executive questions.',
        ],
      },
      {
        heading: 'From raw conversation to contextual answers',
        paragraphs: [
          'Rather than giving generic boilerplate answers, Mentora synthesizes your uploaded background (resume, portfolio, documentation) to deliver personalized talking points and code solutions that match your actual experience.',
        ],
      },
      {
        heading: '100% bot-free and private',
        paragraphs: [
          'Traditional meeting tools send an invasive bot into the call. Mentora runs locally on your desktop (Windows & macOS), processing system audio directly without any bot invites or attendee notifications.',
        ],
      },
    ],
  },
  {
    slug: 'hide-mode-screen-share-meetings',
    title: 'Screen Share Privacy: Invisible AI Overlays for Zoom & Teams',
    excerpt:
      'Learn how native window content protection lets you reference live AI answers, code hints, and talking points without exposing the assistant on shared screens.',
    publishedAt: '2026-06-12',
    readMinutes: 5,
    keywords:
      'screen share privacy, invisible AI overlay, Zoom screen share hide, interview copilot privacy, undetectable AI assistant',
    sections: [
      {
        paragraphs: [
          'When presenting slides, demonstrating code in your IDE, or sharing a browser window during technical interviews, keeping your AI assistant private is critical. If your assistant window appears on the shared screen, it can compromise the entire conversation.',
        ],
      },
      {
        heading: 'How native window content protection works',
        paragraphs: [
          'Mentora uses native OS window affinity and content protection designed to keep the assistant overlay visible only on your personal display. While sharing an application or full screen on Zoom, Microsoft Teams, or Google Meet, your private talking points and live answers remain protected.',
          'This enables you to maintain a persistent HUD over your IDE, browser, or slide deck without fear of broadcasting your notes to other attendees.',
        ],
      },
      {
        heading: 'Why other tools charge $150/mo for this feature',
        paragraphs: [
          'Competitors like Cluely lock screen-share undetectability behind their top-tier $149.99/mo plan. Mentora includes native window protection across every single plan—including our $1 Starter tier.',
        ],
      },
    ],
  },
  {
    slug: 'screenshot-assist-meeting-summarisation',
    title: 'Visual Screenshot Assist: Solving Code & Architecture Problems Live',
    excerpt:
      'How visual screenshot assist captures LeetCode problems, system architecture diagrams, and SQL schemas to provide immediate technical analysis and algorithms.',
    publishedAt: '2026-06-16',
    readMinutes: 5,
    keywords:
      'screenshot assist AI, live coding assistant, LeetCode copilot, system design OCR, technical interview AI',
    sections: [
      {
        paragraphs: [
          'Technical interviews rarely rely solely on spoken questions. Interviewers frequently paste coding problems in CoderPad, share architecture diagrams on Miro, or present database schemas on screen. Visual OCR capture bridges the gap between what is spoken and what is shown.',
        ],
      },
      {
        heading: 'Instant context from visual problems',
        paragraphs: [
          'With a quick hotkey, Mentora captures selected screen regions—such as a complex algorithmic prompt or data pipeline diagram—and uses multimodal vision models to extract data, formulate optimal approaches, and outline edge cases.',
          'This gives you a clear structural outline before you write your first line of code.',
        ],
      },
      {
        heading: 'Accelerating technical confidence',
        paragraphs: [
          'Whether you are solving LeetCode hard problems, debugging live code with a team, or explaining microservices trade-offs, visual intelligence ensures you contribute decisively without freezing.',
        ],
      },
    ],
  },
  {
    slug: 'automated-meeting-notes-action-items-guide',
    title: 'Real-Time Audio Capture vs Cloud Meeting Bots',
    excerpt:
      'Why native desktop audio capture is superior to cloud meeting bots for latency, privacy, and real-time conversation assistance.',
    publishedAt: '2026-06-22',
    readMinutes: 5,
    keywords:
      'native audio capture vs meeting bots, bot-free meeting recorder, private AI call assistant, Groq STT',
    sections: [
      {
        paragraphs: [
          'The first generation of meeting AI relied on cloud bots joining Zoom or Teams rooms. While suitable for simple calendar note-taking, this approach fails in high-stakes live calls where latency and privacy are paramount.',
        ],
      },
      {
        heading: 'The three flaws of meeting bots',
        paragraphs: [
          '1. Social friction: Asking an interviewer or client for permission to admit an AI bot creates immediate awkwardness.',
          '2. Latency delay: Cloud bots upload audio chunks to remote servers, causing 5-15 second delays that make live conversational guidance impossible.',
          '3. Security policies: Many corporate firewalls and interview platforms explicitly block external bot accounts from joining.',
        ],
      },
      {
        heading: 'The native desktop advantage with Mentora',
        paragraphs: [
          'Mentora runs locally on Windows and macOS, capturing audio from your sound card directly via loopback. Latency drops below 1 second, zero bots join the room, and your guidance remains confidential.',
        ],
      },
    ],
  },
] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
