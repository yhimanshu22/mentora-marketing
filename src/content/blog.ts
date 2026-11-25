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
    slug: 'ai-meeting-assistant-summarisation-guide',
    title: 'The Modern Guide to AI Meeting Assistants & Real-Time Summarisation',
    excerpt:
      'Discover how an AI meeting assistant captures live conversation audio, transcribes discussions with sub-second latency, and delivers structured meeting summaries and action items.',
    publishedAt: '2026-06-10',
    readMinutes: 6,
    keywords:
      'AI meeting assistant, meeting summarisation tool, real-time meeting transcription, meeting summaries, AI action items',
    sections: [
      {
        paragraphs: [
          'High-performing teams spend dozens of hours every week in syncs, reviews, and client calls. When conversations move quickly, manual note-taking distracts participants from actively listening and engaging. An AI meeting assistant like Mentora captures system audio in real time, generates accurate live transcripts, and automates structured meeting summarisation.',
        ],
      },
      {
        heading: 'Why real-time transcription transforms meeting productivity',
        paragraphs: [
          'Live transcription ensures you never miss critical nuances, sprint updates, or technical specifications. Mentora uses fast speech-to-text models like Groq Whisper so you can follow verbatim discussions with sub-second latency directly on your desktop.',
          'This is especially valuable for remote cross-functional teams, multi-speaker panel reviews, and noisy environments where audio clarity fluctuates.',
        ],
      },
      {
        heading: 'From raw conversation to structured summaries',
        paragraphs: [
          'A giant wall of text transcript is difficult to digest. What teams actually need is structured intelligence: key takeaways, decisions made, open questions, and designated action item owners. Mentora automatically synthesizes discussion points into clear executive summaries ready for Slack, Jira, or email.',
        ],
      },
      {
        heading: 'No awkward meeting bots required',
        paragraphs: [
          'Traditional meeting tools require an invasive third-party bot to join the call room, which can raise confidentiality concerns and interrupt client meetings. Mentora runs locally on your desktop (Windows & macOS), processing system audio directly without any bot invites.',
        ],
      },
    ],
  },
  {
    slug: 'hide-mode-screen-share-meetings',
    title: 'Private Display Mode: Screen Sharing Protection for AI Meeting Assistants',
    excerpt:
      'Learn how private display mode and window content protection let you view live meeting notes, agendas, and summaries without sharing them during screen presentations.',
    publishedAt: '2026-06-12',
    readMinutes: 5,
    keywords:
      'screen share privacy, AI meeting assistant overlay, Zoom screen share privacy, meeting summarisation notes',
    sections: [
      {
        paragraphs: [
          'When presenting slides, demonstrating software, or sharing a spreadsheet during calls, keeping your assistant notes and summaries private is critical. Desktop clutter and accidental window shares can distract viewers and compromise internal discussion points.',
        ],
      },
      {
        heading: 'How native window content protection works',
        paragraphs: [
          'Mentora uses native OS window affinity and content protection designed to keep the assistant overlay visible only on your personal display. While sharing an application or full screen on Zoom, Microsoft Teams, or Google Meet, your private talking points and live summaries remain protected.',
          'This enables you to maintain a persistent HUD over your IDE, browser, or slide deck without fear of broadcasting your notes to other attendees.',
        ],
      },
      {
        heading: 'Best practices for confident remote presentations',
        paragraphs: [
          'Position your floating assistant near your web camera to maintain natural eye contact while referencing talking points. Use bulleted takeaways rather than long blocks of text for rapid scanning.',
          'Mentora acts as an executive copilot: glance at live discussion summaries, reference relevant project documents, and lead the conversation with authority.',
        ],
      },
    ],
  },
  {
    slug: 'real-time-meeting-transcription-tools',
    title: 'Real-Time Meeting Transcription & Summarisation Tools: What Matters',
    excerpt:
      'A deep dive into speech-to-text latency, local audio processing, security, and instant summarisation for modern business and engineering meetings.',
    publishedAt: '2026-06-14',
    readMinutes: 5,
    keywords:
      'real-time meeting transcription, meeting summarisation tool, live STT for meetings, Groq Whisper summaries',
    sections: [
      {
        paragraphs: [
          'Not all meeting transcription software is built the same. Post-processed cloud recordings take minutes or hours to process, rendering them useless during live calls. Modern productivity demands real-time transcription tightly coupled with instantaneous summarisation.',
        ],
      },
      {
        heading: 'Latency is everything in live discussions',
        paragraphs: [
          'If speech transcription lags by five seconds, the conversation has already moved on. Mentora targets sub-second transcription using high-speed STT providers like Groq Whisper, allowing the AI to generate summaries and answer live questions as they arise.',
        ],
      },
      {
        heading: 'Privacy and local audio architecture',
        paragraphs: [
          'Enterprise discussions involve product roadmaps, financials, and proprietary customer data. Choosing tools that capture system audio directly from the OS—rather than granting third-party web crawlers access to your calendar—protects corporate privacy.',
        ],
      },
      {
        heading: 'Automated action item extraction',
        paragraphs: [
          'The real value of transcription is automated follow-up. Mentora detects commitments made by participants (e.g., "I will send the revised proposal by 3 PM") and compiles them into a structured checklist before you even end the call.',
        ],
      },
    ],
  },
  {
    slug: 'screenshot-assist-meeting-summarisation',
    title: 'Visual Meeting Intelligence: Screenshot Assist & Diagram Summarisation',
    excerpt:
      'How visual screenshot assist captures shared slides, architecture diagrams, charts, and spreadsheets to provide immediate technical context and summaries.',
    publishedAt: '2026-06-16',
    readMinutes: 4,
    keywords:
      'visual meeting intelligence, screenshot assist, slide summarisation tool, diagram OCR AI',
    sections: [
      {
        paragraphs: [
          'Meetings rarely rely solely on spoken audio. Stakeholders frequently present architectural diagrams, complex metrics dashboards, financial tables, and code snippets on screen. Visual OCR capture bridges the gap between what is said and what is shown.',
        ],
      },
      {
        heading: 'Instant context from visual slides',
        paragraphs: [
          'With a simple hotkey, Mentora captures selected screen regions—such as a complex flowchart or quarterly KPI table—and uses multimodal vision models to extract data, explain architecture, or highlight inconsistencies.',
          'This context is merged with the meeting transcript, creating a unified summary that combines spoken discussion with the visual slides presented.',
        ],
      },
      {
        heading: 'Accelerating technical and client discussions',
        paragraphs: [
          'Whether you are reviewing code, debugging production logs live with colleagues, or analyzing product mocks with clients, visual intelligence ensures you can ask insightful questions and contribute decisively without delay.',
        ],
      },
    ],
  },
  {
    slug: 'best-ai-meeting-assistants-summarisation-tools',
    title: 'Best AI Meeting Assistants & Summarisation Tools in 2026',
    excerpt:
      'Compare top AI meeting assistants and summarisation tools. Discover why bot-free, privacy-first desktop assistants like Mentora offer distinct advantages over cloud bots.',
    publishedAt: '2026-06-20',
    readMinutes: 6,
    keywords:
      'best AI meeting assistant, meeting summarisation tool, top meeting notes AI, bot-free meeting recorder, Mentora vs Otter',
    sections: [
      {
        paragraphs: [
          'The demand for AI meeting assistants and summarisation tools has exploded as teams fight meeting fatigue and fragmented communication. Today’s software landscape spans from intrusive calendar-joining bots to discreet native desktop copilots.',
          'Here is a breakdown of what professionals should look for in meeting summarisation software and why Mentora stands out as a leading privacy-first choice.',
        ],
      },
      {
        heading: 'Key limitations of traditional meeting bots',
        paragraphs: [
          'While tools like Otter.ai, Fireflies, and Fathom popularized automated transcripts, users regularly encounter friction:',
          '1. Intrusive Meeting Bots: External bot accounts joining meetings create awkward social friction and are often blocked by corporate security policies.',
          '2. Post-Meeting Delays: Many cloud tools require waiting several minutes after a call ends before summaries become available.',
          '3. High Monthly Lock-ins: Mandatory recurring enterprise pricing structures often force teams into rigid long-term contracts.',
          '4. Lack of Live Guidance: Most bots are passive listeners that summarize later, offering zero real-time talking points or private on-screen assistance during the meeting itself.',
        ],
      },
      {
        heading: 'Why Mentora AI is the modern alternative',
        paragraphs: [
          'Mentora was purpose-engineered as a high-performance native desktop meeting assistant for Windows and macOS.',
          'Core Mentora Advantages:',
          '• 100% Bot-Free Audio Capture: Directly captures system sound and microphone input without sending external bots into your meeting room.',
          '• Real-Time Meeting Summarisation: Delivers running bullet points, decisions, and action items as the meeting progresses.',
          '• Private Desktop Overlay: OS-level content protection keeps your notes completely invisible to viewers during screen sharing.',
          '• Document-Aware Intelligence: Upload company wikis, project documentation, or resumes to ground live responses in authentic context.',
          '• Transparent Credit Pricing: Start for just $1 (15 credits) to experience instant summarisation before scaling.',
        ],
      },
      {
        heading: 'Feature Comparison',
        paragraphs: [
          '• Compatibility: Works universally across Zoom, Google Meet, Teams, Webex, Slack, and Discord.',
          '• Live HUD: Displays talking points and summaries in a non-intrusive floating window above all apps.',
          '• Visual Assist: Hotkey screenshot capture allows simultaneous analysis of shared slides and charts.',
          '• Full Source Code Option: Teams with strict internal compliance can purchase full source code to self-host.',
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          'If you want immediate meeting clarity, instant structured summaries, and private real-time support without intrusive bots, Mentora provides the most seamless and versatile desktop solution.',
        ],
      },
    ],
  },
  {
    slug: 'automated-meeting-notes-action-items-guide',
    title: 'How to Automate Meeting Notes and Action Items with AI',
    excerpt:
      'Learn how automated meeting summarisation eliminates manual note-taking, improves team alignment, and guarantees follow-through on every project commitment.',
    publishedAt: '2026-06-22',
    readMinutes: 5,
    keywords:
      'automated meeting notes, meeting action items AI, meeting summarisation workflow, productive meetings',
    sections: [
      {
        paragraphs: [
          'Unclear takeaways and forgotten action items are among the biggest drivers of wasted organizational time. When team members multitask between listening and typing notes, essential context is lost. Automating meeting notes with an AI meeting assistant transforms everyday discussions into clear operational momentum.',
        ],
      },
      {
        heading: 'The anatomy of an effective meeting summary',
        paragraphs: [
          'An actionable meeting summary must contain four critical elements: a high-level executive recap, categorized discussion topics, decisions agreed upon, and an explicit list of action items assigned to specific owners with deadlines.',
        ],
      },
      {
        heading: 'Zero-effort workflow with Mentora',
        paragraphs: [
          'With Mentora running on your desktop, you simply start your call. The assistant listens in the background, transcribes dialogue in real time, and continuously updates key takeaways in your private HUD.',
          'Once the call concludes, copy the structured summary or export action items straight into Slack, Notion, or your project tracker in seconds.',
        ],
      },
      {
        heading: 'Summary',
        paragraphs: [
          'By leveraging an AI meeting assistant and summarisation tool, teams reclaim hours of manual work every week, eliminate ambiguity, and maintain total alignment across all projects.',
        ],
      },
    ],
  },
] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
