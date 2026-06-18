import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { getPrerenderRoutes } from '../src/routes';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, '..', 'dist');

import { SITE_URL } from '../src/content';

const siteUrl = (process.env.VITE_SITE_URL || SITE_URL).replace(/\/$/, '');

function routeMeta(path: string): { changefreq: string; priority: string } {
  if (path === '/') {
    return { changefreq: 'weekly', priority: '1.0' };
  }
  if (path === '/blog' || path.startsWith('/blog/')) {
    return { changefreq: 'weekly', priority: '0.8' };
  }
  if (path === '/login') {
    return { changefreq: 'monthly', priority: '0.3' };
  }
  if (path === '/contact' || path === '/about') {
    return { changefreq: 'monthly', priority: '0.7' };
  }
  return { changefreq: 'yearly', priority: '0.4' };
}

const routes = getPrerenderRoutes();

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map((path) => {
    const { changefreq, priority } = routeMeta(path);
    return `  <url>
    <loc>${siteUrl}${path === '/' ? '' : path}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(distDir, 'robots.txt'), robots, 'utf8');

console.log(`Generated SEO files for ${siteUrl} (${routes.length} routes)`);
