import { BLOG_POSTS } from './content/blog';
import { FOOTER_LEGAL_LINKS } from './content';

export function getPrerenderRoutes(): string[] {
  return [
    '/',
    '/login',
    '/billing/success',
    '/blog',
    ...BLOG_POSTS.map((post) => `/blog/${post.slug}`),
    ...FOOTER_LEGAL_LINKS.map((link) => link.to),
  ];
}
