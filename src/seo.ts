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
  'AI meeting assistant',
  'AI interview assistant',
  'interview coaching software',
  'real-time meeting transcription',
  'interview answer assistant',
  'screen share hide mode',
  'desktop AI for interviews',
  'Zoom interview help',
  'Teams meeting AI',
  'resume-aware AI answers',
].join(', ');

export const PAGE_SEO: Record<SeoPageId, PageSeo> = {
  home: {
    title: 'Mentora — AI Meeting Assistant for Interviews & Live Calls',
    description:
      'Mentora is an AI meeting assistant for interviews and online calls. Get real-time transcription, profile-aware answers, hide mode for screen share, and screenshot assist on Windows and macOS.',
    path: '/',
    keywords: HOME_KEYWORDS,
  },
  blog: {
    title: 'Mentora Blog — AI Interview & Meeting Guides',
    description:
      'Guides on AI interview assistants, hide mode for screen sharing, real-time meeting transcription, and coding interview screenshot assist with Mentora.',
    path: '/blog',
    keywords:
      'AI interview blog, meeting assistant guides, interview preparation articles, Mentora blog',
  },
  login: {
    title: 'Sign in — Mentora AI',
    description: 'Sign in to Mentora with your Google account.',
    path: '/login',
    noindex: true,
  },
  billingSuccess: {
    title: 'Payment successful — Mentora AI',
    description: 'Your Mentora subscription payment was successful.',
    path: '/billing/success',
    noindex: true,
  },
  contact: {
    title: 'Contact Mentora — Support & Billing',
    description:
      'Contact Mentora AI for product questions, billing, upgrades, and support. Email, phone, and WhatsApp help for Free, Pro, Ultimate, and Magic plans.',
    path: '/contact',
    keywords: 'Mentora contact, Mentora support, Mentora billing help',
  },
  about: {
    title: 'About Mentora — AI Coaching for Meetings',
    description:
      'Learn about Mentora AI, the desktop and browser assistant for interviews and live meetings with real-time transcription and private, profile-aware coaching.',
    path: '/about',
    keywords: 'about Mentora, AI interview coaching, meeting assistant company',
  },
  'privacy-policy': {
    title: 'Privacy Policy — Mentora AI',
    description:
      'Read how Mentora AI collects, uses, and protects your data. Local audio processing, your API keys, and privacy-first meeting assistance.',
    path: '/privacy-policy',
    keywords: 'Mentora privacy policy, data protection, meeting assistant privacy',
  },
  'refund-policy': {
    title: 'Refund Policy — Mentora AI',
    description:
      'Mentora refund policy for Pro, Ultimate, Magic subscriptions and the one-time full source code purchase. How to request a refund within 7 days.',
    path: '/refund-policy',
    keywords: 'Mentora refund policy, subscription refund, source code refund',
  },
  'terms-of-service': {
    title: 'Terms of Service — Mentora AI',
    description:
      'Terms of Service for using Mentora AI meeting assistant, including accounts, billing, acceptable use, and service limitations.',
    path: '/terms-of-service',
    keywords: 'Mentora terms of service, user agreement, acceptable use',
  },
};

export function getSiteUrl(): string {
  const configured =
    (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SITE_URL) ||
    (typeof process !== 'undefined' ? process.env.VITE_SITE_URL : undefined);

  if (configured?.trim()) {
    return configured.trim().replace(/\/$/, '');
  }

  if (typeof window !== 'undefined') {
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
          priceCurrency: plan.monthlyPrice ? 'INR' : 'INR',
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
    title: post.title,
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
        datePublished: post.publishedAt,
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
