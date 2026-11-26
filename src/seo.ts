import {
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FOOTER_LEGAL_LINKS,
  PRIMARY_DOWNLOAD_URL,
  SITE_URL,
  SUBSCRIPTION_PLANS,
} from './content';
import type { BlogPost } from './content/blog';
import { BLOG_POSTS } from './content/blog';
import { FAQ_ITEMS } from './content/faq';
import { getPrerenderRoutes } from './routes';

export { getPrerenderRoutes };

export const SITE_NAME = 'Mentora';
export const SITE_NAME_FULL = 'Mentora AI';
export const DEFAULT_OG_IMAGE = '/logo.png';

export const SITE_ROUTES = getPrerenderRoutes();

export type SeoPageId =
  | 'home'
  | 'blog'
  | 'login'
  | 'billing'
  | 'billingSuccess'
  | (typeof FOOTER_LEGAL_LINKS)[number]['pageId'];

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string;
  noindex?: boolean;
};

const HOME_KEYWORDS = [
  'real-time AI copilot',
  'live interview assistant',
  'interview copilot',
  'Cluely alternative',
  'undetectable AI overlay',
  'screen share invisible HUD',
  'real-time call guidance',
  'bot-free audio transcription',
  'LeetCode AI assistant',
  'technical interview helper',
  'coding interview copilot',
  'system design interview assistant',
  'stealth interview assistant',
  'Zoom interview copilot',
  'Teams meeting copilot',
  'Google Meet AI assistant',
  'live speech to text for interviews',
  'invisible AI meeting assistant',
  'best Final Round AI alternative',
  'AI copilot for sales calls',
  'desktop AI overlay for interviews',
  'real-time algorithm solver',
  'audio loopback transcription AI',
].join(', ');

export const PAGE_SEO: Record<SeoPageId, PageSeo> = {
  home: {
    title: 'Mentora — Real-Time AI Copilot for Live Calls & Interviews',
    description:
      'Mentora is a real-time AI copilot for live calls and technical interviews. Sub-second audio transcription, resume-grounded answers, and screen share invisible HUD.',
    path: '/',
    keywords: HOME_KEYWORDS,
  },
  blog: {
    title: 'Mentora Blog — AI Copilot Guides & Alternative Reviews',
    description:
      'Practical guides on real-time AI copilots, undetectable screen share overlays, live interview preparation, and comparison against alternatives like Cluely.',
    path: '/blog',
    keywords:
      'AI copilot blog, live interview guides, Cluely alternative, interview assistant articles, Mentora blog',
  },
  login: {
    title: 'Sign in to Mentora — Real-Time AI Copilot Account',
    description:
      'Sign in to your Mentora account to sync custom profiles, manage your credit balance, and access the desktop AI copilot on Windows and macOS.',
    path: '/login',
    noindex: true,
  },
  billingSuccess: {
    title: 'Payment Successful — Mentora AI Credits Activated',
    description:
      'Your Mentora subscription payment was successful. Credits have been applied to your account for live call transcription and AI guidance.',
    path: '/billing/success',
    noindex: true,
  },
  billing: {
    title: 'Billing & Plan Credits Management — Mentora AI',
    description:
      'View your active Mentora plan, check remaining AI call credits, track upcoming renewal dates, and manage payment options.',
    path: '/billing',
    noindex: true,
  },
  contact: {
    title: 'Contact Mentora Support — Billing & Product Help',
    description:
      'Contact Mentora AI for live call copilot assistance, billing questions, and technical support. Direct email, WhatsApp, and phone channels available.',
    path: '/contact',
    keywords: 'Mentora contact, Mentora support, Mentora billing help',
  },
  about: {
    title: 'About Mentora — Real-Time AI Copilot & Call Assistant',
    description:
      'Learn about Mentora, the native desktop AI copilot for live calls and interviews with sub-second transcription and screen-share invisible overlay.',
    path: '/about',
    keywords: 'about Mentora, real-time AI copilot, live interview assistant, call copilot company',
  },
  'privacy-policy': {
    title: 'Privacy Policy — Data Protection at Mentora AI',
    description:
      'Read how Mentora AI protects your privacy. Learn about local audio loopback capture, encrypted API transmission, and our strict zero-data-sale policy.',
    path: '/privacy-policy',
    keywords: 'Mentora privacy policy, data protection, meeting assistant privacy',
  },
  'refund-policy': {
    title: 'Refund Policy & Guarantees — Mentora AI',
    description:
      'Mentora 7-day refund policy for Starter, Pro, Ultimate, and Magic plans, as well as terms regarding the one-time full source code purchase.',
    path: '/refund-policy',
    keywords: 'Mentora refund policy, subscription refund, source code refund',
  },
  'terms-of-service': {
    title: 'Terms of Service — User Agreement & Rules | Mentora',
    description:
      'Terms of Service for using the Mentora desktop AI copilot, covering account registration, credit consumption, billing cycles, and acceptable use.',
    path: '/terms-of-service',
    keywords: 'Mentora terms of service, user agreement, acceptable use',
  },
};

export function getSiteUrl(): string {
  const configured =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
    (typeof process !== 'undefined' ? process.env.VITE_SITE_URL : undefined);

  if (configured?.trim() && !configured.includes('mentora-marketing-eta.vercel.app')) {
    return configured.trim().replace(/\/$/, '');
  }

  if (typeof window !== 'undefined' && window.location.origin && !window.location.origin.includes('localhost')) {
    return window.location.origin;
  }

  return SITE_URL;
}

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  if (normalizedPath === '/') {
    return getSiteUrl();
  }
  return `${getSiteUrl()}${normalizedPath}`;
}

export function formatTitle(title: string): string {
  if (title.includes('Mentora')) {
    return title;
  }
  return `${title} | ${SITE_NAME}`;
}

export function homeJsonLd(): Record<string, unknown> {
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: SITE_NAME_FULL,
        description: PAGE_SEO.home.description,
        inLanguage: 'en',
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: SITE_NAME_FULL,
        url: siteUrl,
        email: CONTACT_EMAIL,
        telephone: `+91-${CONTACT_PHONE}`,
        logo: absoluteUrl(DEFAULT_OG_IMAGE),
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Varanasi',
          addressRegion: 'Uttar Pradesh',
          addressCountry: 'IN',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: CONTACT_EMAIL,
          telephone: `+91-${CONTACT_PHONE}`,
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi'],
        },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${siteUrl}/#software`,
        name: SITE_NAME_FULL,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Windows 10+, macOS',
        description: PAGE_SEO.home.description,
        url: siteUrl,
        downloadUrl: PRIMARY_DOWNLOAD_URL,
        offers: SUBSCRIPTION_PLANS.map((plan) => ({
          '@type': 'Offer',
          name: plan.name,
          url: plan.href,
          price: plan.monthlyPrice ?? 0,
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
        })),
        featureList: [
          'Real-time meeting transcription',
          'Profile-aware AI answers',
          'Hide mode for screen sharing',
          'Screenshot assist',
          'Always-on-top desktop window',
          'Streaming answers with OpenAI and Gemini',
        ],
      },
    ],
  };
}

export function faqJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export function getBlogPostSeo(post: BlogPost): PageSeo {
  return {
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: post.keywords,
  };
}

export function blogPostJsonLd(post: BlogPost): Record<string, unknown> {
  const pageUrl = absoluteUrl(`/blog/${post.slug}`);
  const siteUrl = getSiteUrl();

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: `${post.publishedAt}T00:00:00+05:30`,
        dateModified: `${post.publishedAt}T00:00:00+05:30`,
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        author: {
          '@type': 'Organization',
          name: SITE_NAME_FULL,
        },
        publisher: {
          '@type': 'Organization',
          name: SITE_NAME_FULL,
          logo: {
            '@type': 'ImageObject',
            url: absoluteUrl(DEFAULT_OG_IMAGE),
          },
        },
        mainEntityOfPage: pageUrl,
        keywords: post.keywords,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: absoluteUrl('/blog') },
          { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
        ],
      },
    ],
  };
}

export function blogListingJsonLd(): Record<string, unknown> {
  const siteUrl = getSiteUrl();
  const blogUrl = absoluteUrl('/blog');

  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${blogUrl}#blog`,
    url: blogUrl,
    name: `${SITE_NAME_FULL} Blog`,
    description: PAGE_SEO.blog.description,
    blogPost: BLOG_POSTS.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
    })),
    isPartOf: { '@id': `${siteUrl}/#website` },
  };
}

export function infoPageJsonLd(page: PageSeo): Record<string, unknown> {
  const siteUrl = getSiteUrl();
  const pageUrl = absoluteUrl(page.path);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: page.title,
        description: page.description,
        isPartOf: { '@id': `${siteUrl}/#website` },
        inLanguage: 'en',
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.title.replace(/ — Mentora.*$/, '').replace(/ \| Mentora$/, ''),
            item: pageUrl,
          },
        ],
      },
    ],
  };
}
