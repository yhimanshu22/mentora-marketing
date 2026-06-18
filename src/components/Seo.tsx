import { useEffect } from 'react';

import {
  DEFAULT_OG_IMAGE,
  SITE_NAME_FULL,
  absoluteUrl,
  formatTitle,
  type PageSeo,
} from '../seo';

type SeoProps = {
  page: PageSeo;
  jsonLd?: Record<string, unknown> | readonly Record<string, unknown>[];
};

function upsertMeta(
  attribute: 'name' | 'property',
  key: string,
  content: string,
): void {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

function upsertLink(rel: string, href: string): void {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }

  element.setAttribute('href', href);
}

export function Seo({ page, jsonLd }: SeoProps) {
  const title = formatTitle(page.title);
  const canonicalUrl = absoluteUrl(page.path);
  const imageUrl = absoluteUrl(DEFAULT_OG_IMAGE);

  useEffect(() => {
    document.title = title;

    upsertMeta('name', 'description', page.description);
    upsertMeta('name', 'robots', page.noindex ? 'noindex, nofollow' : 'index, follow');
    upsertMeta('name', 'author', SITE_NAME_FULL);
    upsertMeta('name', 'application-name', SITE_NAME_FULL);

    if (page.keywords) {
      upsertMeta('name', 'keywords', page.keywords);
    }

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME_FULL);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', page.description);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:image', imageUrl);
    upsertMeta('property', 'og:locale', 'en_IN');

    upsertMeta('name', 'twitter:card', 'summary');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', page.description);
    upsertMeta('name', 'twitter:image', imageUrl);

    upsertLink('canonical', canonicalUrl);

    const schemas = jsonLd ? (Array.isArray(jsonLd) ? [...jsonLd] : [jsonLd]) : [];
    const scripts = schemas.map((schema, index) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonLd = String(index);
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      return script;
    });

    return () => {
      scripts.forEach((script) => script.remove());
    };
  }, [canonicalUrl, imageUrl, jsonLd, page.description, page.keywords, page.noindex, title]);

  return null;
}
