import { Link } from 'react-router-dom';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Seo } from '../components/Seo';
import { BLOG_POSTS } from '../content/blog';
import { container, eyebrow, glassCard, sectionTitle } from '../lib/classes';
import { PAGE_SEO, blogListingJsonLd } from '../seo';

export function BlogPage() {
  return (
    <>
      <Seo page={PAGE_SEO.blog} jsonLd={blogListingJsonLd()} />
      <Header />
      <main className="w-full overflow-x-hidden py-20 max-sm:py-14">
        <div className={container}>
          <div className="max-w-3xl mb-12">
            <p className={eyebrow}>Blog</p>
            <h1 className={sectionTitle}>Interview &amp; meeting AI guides</h1>
            <p className="text-slate-400 text-[1.05rem]">
              Practical guides on AI interview assistants, hide mode, transcription, and technical
              screen preparation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
            {BLOG_POSTS.map((post) => (
              <article key={post.slug} className={`${glassCard} p-6 flex flex-col min-w-0`}>
                <time className="text-xs text-slate-500 mb-2" dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}{' '}
                  · {post.readMinutes} min read
                </time>
                <h2 className="text-lg font-semibold mb-2 leading-snug">
                  <Link to={`/blog/${post.slug}`} className="hover:text-indigo-300">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-slate-400 mb-4 flex-1">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.slug}`}
                  className="text-sm font-semibold text-indigo-300 hover:text-indigo-200 w-fit"
                >
                  Read article →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
