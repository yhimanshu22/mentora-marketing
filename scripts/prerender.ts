import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { StrictMode } from 'react';
import { StaticRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { AuthProvider } from '../src/auth/AuthContext';
import { AppRoutes } from '../src/AppRoutes';
import { FOOTER_LEGAL_LINKS } from '../src/content';
import { getBlogPost } from '../src/content/blog';
import { getPrerenderRoutes } from '../src/routes';
import { getGoogleClientId } from '../src/lib/google';
import {
  DEFAULT_OG_IMAGE,
  PAGE_SEO,
  SITE_NAME_FULL,
  absoluteUrl,
  blogListingJsonLd,
  blogPostJsonLd,
  faqJsonLd,
  formatTitle,
  getBlogPostSeo,
  homeJsonLd,
  infoPageJsonLd,
  type PageSeo,
} from '../src/seo';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const distDir = join(projectRoot, 'dist');

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getSeoForPath(path: string): {
  page: PageSeo;
  jsonLd: Record<string, unknown>[];
} {
  if (path === '/') {
    return { page: PAGE_SEO.home, jsonLd: [homeJsonLd(), faqJsonLd()] };
  }

  if (path === '/blog') {
    return { page: PAGE_SEO.blog, jsonLd: [blogListingJsonLd()] };
  }

  if (path === '/login') {
    return { page: PAGE_SEO.login, jsonLd: [] };
  }

  if (path === '/billing/success') {
    return { page: PAGE_SEO.billingSuccess, jsonLd: [] };
  }

  const blogMatch = path.match(/^\/blog\/([^/]+)$/);
  if (blogMatch) {
    const post = getBlogPost(blogMatch[1]);
    if (!post) {
      throw new Error(`Unknown blog slug in route: ${path}`);
    }
    const page = getBlogPostSeo(post);
    return { page, jsonLd: [blogPostJsonLd(post)] };
  }

  const infoLink = FOOTER_LEGAL_LINKS.find((link) => link.to === path);
  if (infoLink) {
    const page = PAGE_SEO[infoLink.pageId];
    return { page, jsonLd: [infoPageJsonLd(page)] };
  }

  throw new Error(`No SEO config for route: ${path}`);
}

function upsertTag(html: string, pattern: RegExp, replacement: string): string {
  if (pattern.test(html)) {
    return html.replace(pattern, replacement);
  }
  return html.replace('</head>', `  ${replacement}\n  </head>`);
}

function injectHead(html: string, page: PageSeo, jsonLd: Record<string, unknown>[]): string {
  const title = escapeHtml(formatTitle(page.title));
  const description = escapeHtml(page.description);
  const canonical = escapeHtml(absoluteUrl(page.path));
  const image = escapeHtml(absoluteUrl(DEFAULT_OG_IMAGE));
  const robots = page.noindex ? 'noindex, nofollow' : 'index, follow';

  let output = html;
  output = upsertTag(output, /<title>.*?<\/title>/, `<title>${title}</title>`);
  output = upsertTag(
    output,
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`,
  );
  output = upsertTag(
    output,
    /<meta name="robots" content="[^"]*"\s*\/?>/,
    `<meta name="robots" content="${robots}" />`,
  );

  if (page.keywords) {
    output = upsertTag(
      output,
      /<meta name="keywords" content="[^"]*"\s*\/?>/,
      `<meta name="keywords" content="${escapeHtml(page.keywords)}" />`,
    );
  }

  const ogTags = [
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME_FULL}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<link rel="canonical" href="${canonical}" />`,
  ];

  for (const tag of ogTags) {
    const attrMatch = tag.match(/(?:name|property|rel)="([^"]+)"/);
    const attr = attrMatch?.[1];
    if (!attr) continue;

    const pattern =
      tag.includes('rel="canonical"')
        ? /<link rel="canonical" href="[^"]*"\s*\/?>/
        : tag.includes('property=')
          ? new RegExp(`<meta property="${attr}" content="[^"]*"\\s*/?>`)
          : new RegExp(`<meta name="${attr}" content="[^"]*"\\s*/?>`);

    output = upsertTag(output, pattern, tag);
  }

  const jsonLdScripts = jsonLd
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema)}</script>`,
    )
    .join('\n    ');

  output = output.replace('</head>', `    ${jsonLdScripts}\n  </head>`);
  return output;
}

function renderRoute(path: string): string {
  const googleClientId = getGoogleClientId();
  const routes = React.createElement(
    StaticRouter,
    { location: path },
    React.createElement(AppRoutes),
  );
  const withAuth = React.createElement(AuthProvider, null, routes);
  const withGoogle = googleClientId
    ? React.createElement(GoogleOAuthProvider, { clientId: googleClientId }, withAuth)
    : withAuth;

  return renderToString(React.createElement(StrictMode, null, withGoogle));
}

function outputPath(route: string): string {
  if (route === '/') {
    return join(distDir, 'index.html');
  }
  return join(distDir, route.slice(1), 'index.html');
}

function prerenderRoute(template: string, path: string): void {
  const { page, jsonLd } = getSeoForPath(path);
  const bodyHtml = renderRoute(path);
  const html = injectHead(
    template.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`),
    page,
    jsonLd,
  );

  const filePath = outputPath(path);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, html, 'utf8');
  console.log(`Prerendered ${path}`);
}

const template = readFileSync(join(distDir, 'index.html'), 'utf8');
const routes = getPrerenderRoutes();

for (const route of routes) {
  prerenderRoute(template, route);
}

console.log(`Prerendered ${routes.length} routes into ${distDir}`);
