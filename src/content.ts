export const SITE_URL = 'https://mentora.cv';
export const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

export const SOURCE_CODE_URL = `${SITE_URL}/#pricing`;

export const APP_VERSION = '1.0.0';
/** Public release page — installers are mirrored here from the private mentora app repo. */
export const GITHUB_RELEASES_URL = 'https://github.com/yhimanshu22/mentora-marketing/releases';
export const GITHUB_RELEASE_TAG_URL = `${GITHUB_RELEASES_URL}/tag/v${APP_VERSION}`;
const RELEASE_DOWNLOAD_BASE = `${GITHUB_RELEASES_URL}/download/v${APP_VERSION}`;

/** Tauri bundle asset name prefix on macOS, Windows, and Linux. */
const PRODUCT_NAME = 'Mentora.AI.Meeting.Assistant';

export type DownloadFile = {
  id: string;
  label: string;
  description: string;
  href: string;
  fileName: string;
};

export type DownloadPlatform = {
  id: 'windows' | 'macos' | 'linux';
  name: string;
  icon: string;
  requirements: string;
  files: readonly DownloadFile[];
};

function releaseAsset(fileName: string) {
  return `${RELEASE_DOWNLOAD_BASE}/${encodeURIComponent(fileName)}`;
}

function windowsAssetName(kind: 'setup' | 'msi') {
  const base = `${PRODUCT_NAME}_${APP_VERSION}_x64`;
  return kind === 'setup' ? `${base}-setup.exe` : `${base}_en-US.msi`;
}

function macAssetName(arch: 'aarch64' | 'x64') {
  return `${PRODUCT_NAME}_${APP_VERSION}_${arch}.dmg`;
}

// Linux builds paused — re-enable when CI packaging is ready.
// function linuxAssetName(kind: 'appimage' | 'deb') {
//   const ext = kind === 'appimage' ? 'AppImage' : 'deb';
//   return `${PRODUCT_NAME}_${APP_VERSION}_amd64.${ext}`;
// }

export const WINDOWS_DOWNLOADS: readonly DownloadFile[] = [
  {
    id: 'setup',
    label: 'Download .exe',
    description: 'Windows installer — recommended',
    href: releaseAsset(windowsAssetName('setup')),
    fileName: windowsAssetName('setup'),
  },
  {
    id: 'msi',
    label: 'Download .msi',
    description: 'MSI package for IT deployment',
    href: releaseAsset(windowsAssetName('msi')),
    fileName: windowsAssetName('msi'),
  },
];

export const MACOS_DOWNLOADS: readonly DownloadFile[] = [
  {
    id: 'dmg-arm',
    label: 'Download .dmg',
    description: 'Apple Silicon (M1/M2/M3/M4)',
    href: releaseAsset(macAssetName('aarch64')),
    fileName: macAssetName('aarch64'),
  },
  {
    id: 'dmg-intel',
    label: 'Download .dmg',
    description: 'Intel Mac',
    href: releaseAsset(macAssetName('x64')),
    fileName: macAssetName('x64'),
  },
];

export const LINUX_DOWNLOADS: readonly DownloadFile[] = [
  // Linux builds paused — re-enable when CI packaging is ready.
  // {
  //   id: 'appimage',
  //   label: 'Download .AppImage',
  //   description: 'Portable — works on most distros',
  //   href: releaseAsset(linuxAssetName('appimage')),
  //   fileName: linuxAssetName('appimage'),
  // },
  // {
  //   id: 'deb',
  //   label: 'Download .deb',
  //   description: 'Debian / Ubuntu package',
  //   href: releaseAsset(linuxAssetName('deb')),
  //   fileName: linuxAssetName('deb'),
  // },
];

export const DOWNLOAD_PLATFORMS: readonly DownloadPlatform[] = [
  {
    id: 'windows',
    name: 'Windows',
    icon: 'fab fa-windows',
    requirements: 'Windows 10+ (64-bit)',
    files: WINDOWS_DOWNLOADS,
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: 'fab fa-apple',
    requirements: 'macOS 11+ · Apple Silicon or Intel',
    files: MACOS_DOWNLOADS,
  },
  // {
  //   id: 'linux',
  //   name: 'Linux',
  //   icon: 'fab fa-linux',
  //   requirements: 'Ubuntu 22.04+ / Debian (64-bit)',
  //   files: LINUX_DOWNLOADS,
  // },
];

export const PRIMARY_DOWNLOAD_URL = WINDOWS_DOWNLOADS[0].href;

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
    name: 'Starter',
    monthlyPrice: 1,
    features: [
      '15 Credits',
      'Mentora Desktop Version',
      'Mentora Browser Version',
      'Unlimited Profiles',
      'No Time Limit',
    ],
    cta: 'Get Starter ($1)',
    href: `${SITE_URL}/#pricing`,
  },
  {
    id: 'pro',
    name: 'Pro',
    monthlyPrice: 20,
    features: [
      'Everything in Starter Plan',
      '600 Credits',
      'Privacy & Speed',
      'Instant Support (WhatsApp + Email)',
    ],
    cta: 'Choose Pro',
    href: `${SITE_URL}/#pricing`,
  },
  {
    id: 'ultimate',
    name: 'Ultimate',
    monthlyPrice: 50,
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
    href: `${SITE_URL}/#pricing`,
  },
  {
    id: 'magic',
    name: 'Magic',
    monthlyPrice: 95,
    upgradeAddOnMonthly: 45,
    badge: 'Best value',
    features: [
      'Everything in Ultimate Plan',
      '4,000 Credits',
      'Mentora Fully Automatic Mode',
      'Instant Support (WhatsApp + Email + Phone Call)',
      '1-on-1 Onboarding Call (On Demand)',
    ],
    cta: 'Choose Magic',
    href: `${SITE_URL}/#pricing`,
  },
] as const;

export function formatInr(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}

export function periodTotal(monthlyPrice: number, months: BillingPeriod): number {
  return monthlyPrice * months;
}

export function periodLabel(months: BillingPeriod): string {
  return months === 1 ? '1 month' : `${months} months`;
}

export const GET_STARTED_URL = PRIMARY_DOWNLOAD_URL;

export const CONTACT_EMAIL = 'himu09854@gmail.com';
export const CONTACT_PHONE = '8114245060';
export const CONTACT_PHONE_DISPLAY = '+91 81142 45060';
export const CONTACT_LOCATION = 'Varanasi, Uttar Pradesh, India';
export const CONTACT_ONLINE_NOTE =
  'Mentora is a fully online business. We do not have a physical office — this address is for correspondence only.';

/** @deprecated Use CONTACT_EMAIL */
export const SUPPORT_EMAIL = CONTACT_EMAIL;

export const FOOTER_LEGAL_LINKS = [
  { to: '/contact', pageId: 'contact', label: 'Contact Us' },
  { to: '/about', pageId: 'about', label: 'About Us' },
  { to: '/privacy-policy', pageId: 'privacy-policy', label: 'Privacy Policy' },
  { to: '/refund-policy', pageId: 'refund-policy', label: 'Refund Policy' },
  { to: '/terms-of-service', pageId: 'terms-of-service', label: 'Terms of Service' },
] as const;

export type InfoPageId = (typeof FOOTER_LEGAL_LINKS)[number]['pageId'];

export type InfoSection = {
  heading?: string;
  paragraphs: readonly string[];
};

export type InfoPageContent = {
  title: string;
  lead?: string;
  sections: readonly InfoSection[];
};

export const INFO_PAGES = {
  contact: {
    title: 'Contact Us',
    lead: 'Questions about Mentora, billing, or your account? We are here to help.',
    sections: [
      {
        heading: 'Email',
        paragraphs: [
          `Reach us at ${CONTACT_EMAIL}. We typically respond within one business day.`,
        ],
      },
      {
        heading: 'Phone',
        paragraphs: [
          `Call or WhatsApp us at ${CONTACT_PHONE_DISPLAY} (${CONTACT_PHONE}).`,
        ],
      },
      {
        heading: 'Location',
        paragraphs: [CONTACT_LOCATION, CONTACT_ONLINE_NOTE],
      },
      {
        heading: 'Paid plan support',
        paragraphs: [
          'Pro, Ultimate, and Magic subscribers get instant support via WhatsApp and email. Ultimate and Magic plans also include phone support.',
        ],
      },
      {
        heading: 'Billing & upgrades',
        paragraphs: [
          'For subscription changes, upgrades, or invoice questions, email us with the address tied to your account.',
        ],
      },
    ],
  },
  about: {
    title: 'About Us',
    lead: 'Mentora is a real-time AI copilot for live calls, technical interviews, and client meetings.',
    sections: [
      {
        paragraphs: [
          'We help professionals excel during live calls with real-time audio transcription, instant contextual answers, code solutions, and private on-screen guidance — completely bot-free.',
        ],
      },
      {
        heading: 'What we build',
        paragraphs: [
          'Mentora is available as a native desktop app for Windows and macOS. It listens to system audio and captures screen context in real time, delivering sub-second AI guidance without sending awkward bots into your call rooms.',
        ],
      },
      {
        heading: 'Our focus',
        paragraphs: [
          'Speed, privacy, and precision guidance. Whether tackling a demanding technical interview, client sales pitch, or complex engineering sync, Mentora delivers relevant talking points and answers right when you need them.',
        ],
      },
    ],
  },
  'privacy-policy': {
    title: 'Privacy Policy',
    lead: 'Last updated: June 2026',
    sections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Mentora respects your privacy. This policy describes what information we collect, how we use it, and the choices you have.',
        ],
      },
      {
        heading: 'Information we collect',
        paragraphs: [
          'Account details you provide when signing up (such as name and email).',
          'Billing information processed by our payment partners when you purchase a plan.',
          'Support messages you send us by email, WhatsApp, or phone.',
          'Basic usage and diagnostic data needed to operate and improve the service.',
        ],
      },
      {
        heading: 'Local processing',
        paragraphs: [
          'Mentora is designed so meeting audio and profile data stay on your device. API calls to providers you configure (such as OpenAI or Google Gemini) are sent from your machine using your keys.',
        ],
      },
      {
        heading: 'How we use information',
        paragraphs: [
          'We use your information to provide the service, process payments, offer support, prevent abuse, and improve Mentora. We do not sell your personal data.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [`Privacy questions: ${CONTACT_EMAIL}`],
      },
    ],
  },
  'refund-policy': {
    title: 'Refund Policy',
    lead: 'Last updated: June 2026',
    sections: [
      {
        heading: 'Subscriptions',
        paragraphs: [
          'Paid plans (Pro, Ultimate, and Magic) are billed in advance for the period you select (1, 3, 6, or 12 months).',
          'If you are unsatisfied, contact us within 7 days of your initial purchase for the current billing period. Approved refunds are issued to the original payment method.',
        ],
      },
      {
        heading: 'Renewals',
        paragraphs: [
          'Renewals are generally non-refundable once a new billing period has started, except where required by applicable law.',
        ],
      },
      {
        heading: 'Full source code',
        paragraphs: [
          'The one-time full source code purchase ($499) is non-refundable after download or delivery of access, unless required by law or we are unable to deliver the product.',
        ],
      },
      {
        heading: 'How to request a refund',
        paragraphs: [
          `Email ${CONTACT_EMAIL} with your account email, plan name, and purchase date. We will review and respond promptly.`,
        ],
      },
    ],
  },
  'terms-of-service': {
    title: 'Terms of Service',
    lead: 'Last updated: June 2026',
    sections: [
      {
        heading: 'Agreement',
        paragraphs: [
          'By using Mentora, you agree to these Terms of Service. If you do not agree, do not use the service.',
        ],
      },
      {
        heading: 'Service',
        paragraphs: [
          'Mentora provides a real-time AI copilot and assistant for live calls, interviews, presentations, and team discussions. Features and availability may change over time. You are responsible for complying with the rules of any platform or organization where you use Mentora.',
        ],
      },
      {
        heading: 'Accounts & billing',
        paragraphs: [
          'You must provide accurate account information. Subscription fees are charged according to the plan and billing period you choose. Credits and plan limits are described on our pricing page.',
        ],
      },
      {
        heading: 'Acceptable use',
        paragraphs: [
          'You may not misuse Mentora, attempt to reverse engineer the hosted service, resell access without permission, or use the product in ways that violate law or third-party terms.',
        ],
      },
      {
        heading: 'Disclaimer',
        paragraphs: [
          'Mentora is provided "as is" without warranties of any kind. We are not liable for indirect or consequential damages to the extent permitted by law.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: [`Questions about these terms: ${CONTACT_EMAIL}`],
      },
    ],
  },
} as const satisfies Record<string, InfoPageContent>;

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
    title: 'Live call transcription',
    description:
      'Captures system audio and transcribes spoken dialogue in real time with sub-second latency powered by Groq Whisper.',
  },
  {
    icon: 'fa-brain',
    title: 'Context-aware AI answers',
    description:
      'Upload your resume, portfolio, or project notes. Mentora streams tailored talking points, code snippets, and answers aligned with your background.',
  },
  {
    icon: 'fa-eye-slash',
    title: 'Screen share invisible overlay',
    description:
      'Native OS window content protection keeps live guidance visible only on your display while staying completely invisible to attendees on screen shares.',
  },
  {
    icon: 'fa-camera',
    title: 'Screenshot assist & OCR',
    description:
      'Capture code snippets, system architecture diagrams, or technical problems on your screen to get immediate analysis and solutions.',
  },
  {
    icon: 'fa-layer-group',
    title: 'Always-on-top desktop HUD',
    description:
      'A compact, floating overlay sits seamlessly over Zoom, Meet, Teams, and coding IDEs without disrupting your active workflow.',
  },
  {
    icon: 'fa-file-lines',
    title: 'Instant meeting notes & recaps',
    description:
      'Generates structured key takeaways, decisions, and follow-up action items the moment your conversation concludes.',
  },
] as const;

export const STEPS = [
  {
    step: '01',
    title: 'Connect your background',
    description: 'Add your resume, project notes, or documentation so AI answers match your authentic voice and experience.',
  },
  {
    step: '02',
    title: 'Join your live call or interview',
    description: 'Mentora captures system audio in real time across Zoom, Teams, Meet, or browser calls without bot invites.',
  },
  {
    step: '03',
    title: 'Get real-time answers & hints',
    description: 'Follow live transcription and receive streamed answers, talking points, and technical guidance on your private screen.',
  },
  {
    step: '04',
    title: 'Share screen with confidence',
    description: 'Window protection ensures your notes and answers remain strictly on your monitor, never leaking to shared screens.',
  },
] as const;
