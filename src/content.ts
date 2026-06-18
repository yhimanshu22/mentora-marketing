export const SOURCE_CODE_URL = 'https://lazyjobseeker.com/mentora-lifetime';

export const BILLING_PERIODS = [1, 3, 6, 12] as const;
export type BillingPeriod = (typeof BILLING_PERIODS)[number];

export type PricingPlan = {
  id: string;
  name: string;
  monthlyPrice?: number;
  badge?: string;
  featured?: boolean;
  upgradeAddOnMonthly?: number;
  features: readonly string[];
  cta: string;
  href: string;
};

export const SUBSCRIPTION_PLANS: readonly PricingPlan[] = [
  {
    id: 'free',
    name: 'Free',
    features: [
      '15 Credits',
      'Mentora Desktop Version',
      'Mentora Browser Version',
      'Unlimited Profiles',
      'No Time Limit',
    ],
    cta: 'Get Started',
    href: 'https://lazyjobseeker.com/mentora',
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 2038,
    features: [
      'Everything in Free Plan',
      '600 Credits',
      'Privacy & Speed',
      'Instant Support (WhatsApp + Email)',
    ],
    cta: 'Choose Pro',
    href: 'https://lazyjobseeker.com/mentora-pro',
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    monthlyPrice: 3625,
    badge: 'Popular',
    featured: true,
    features: [
      'Everything in Pro Plan',
      '1,500 Credits',
      'Magic Keys Access Included',
      'Mentora Fully Automatic Mode',
      'Instant Support (WhatsApp + Email + Phone Call)',
    ],
    cta: 'Choose Ultimate',
    href: 'https://lazyjobseeker.com/mentora-ultimate',
  },
  {
    id: 'magic',
    name: 'Magic',
    monthlyPrice: 7967,
    upgradeAddOnMonthly: 4120,
    badge: 'Best value',
    features: [
      'Everything in Ultimate Plan',
      '4,000 Credits',
      'Mentora Fully Automatic Mode',
      'Instant Support (WhatsApp + Email + Phone Call)',
      '1-on-1 Onboarding Call (On Demand)',
    ],
    cta: 'Choose Magic',
    href: 'https://lazyjobseeker.com/mentora-magic',
  },
] as const;

export function formatInr(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function periodTotal(monthlyPrice: number, months: BillingPeriod): number {
  return monthlyPrice * months;
}

export function periodLabel(months: BillingPeriod): string {
  return months === 1 ? '1 month' : `${months} months`;
}

export const GET_STARTED_URL = SUBSCRIPTION_PLANS[0].href;

export const SOURCE_CODE_FEATURES = [
  'Complete Mentora source code',
  'Desktop & browser builds',
  'One-time purchase — no subscription',
  'Self-host with your own keys',
  'Priority updates & support',
] as const;

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
