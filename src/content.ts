export const GITHUB_URL = 'https://github.com/yhimanshu22/mentora';
export const LIFETIME_URL = 'https://lazyjobseeker.com/angel-lifetime';

export const FEATURES = [
  {
    icon: 'fa-microphone-lines',
    title: 'Live meeting audio',
    description:
      'Captures system audio and transcribes interviewer questions in real time with Groq Whisper or your chosen STT provider.',
  },
  {
    icon: 'fa-user-tie',
    title: 'Profile-aware answers',
    description:
      'Upload your resume and documents. Every answer reflects your experience, skills, and talking points.',
  },
  {
    icon: 'fa-eye-slash',
    title: 'Hide mode',
    description:
      'Content protection keeps Mentora off most screen shares. Transparent overlay lets you read answers over your IDE.',
  },
  {
    icon: 'fa-camera',
    title: 'Screenshot assist',
    description:
      'Capture coding problems, slides, or whiteboard content and get step-by-step solutions grounded in your profile.',
  },
  {
    icon: 'fa-layer-group',
    title: 'Always on top',
    description:
      'Floating desktop window stays above Zoom, Meet, Teams, and your editor — coaching without switching tabs.',
  },
  {
    icon: 'fa-bolt',
    title: 'Streaming answers',
    description:
      'OpenAI or Google Gemini streams responses in real time with follow-up suggestions and adjustable answer length.',
  },
] as const;

export const STEPS = [
  {
    step: '01',
    title: 'Set up your profile',
    description: 'Paste your resume, add skills, and import PDFs so answers sound like you.',
  },
  {
    step: '02',
    title: 'Connect your API keys',
    description: 'Bring your own OpenAI or Gemini key. Optional Groq key for fast transcription.',
  },
  {
    step: '03',
    title: 'Join your meeting',
    description: 'Mentora listens to system audio, transcribes questions, and coaches you silently.',
  },
  {
    step: '04',
    title: 'Press mic for answers',
    description: 'Get profile-aware responses instantly. Toggle Hide before you share your screen.',
  },
] as const;
