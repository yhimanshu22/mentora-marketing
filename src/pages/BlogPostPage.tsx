import { Link, useParams } from 'react-router-dom';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Seo } from '../components/Seo';
import { getBlogPost } from '../content/blog';
import { container, glassCard } from '../lib/classes';
import { blogPostJsonLd, getBlogPostSeo } from '../seo';

export function BlogPostPage() {
  const { slug = '' } = useParams();
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <>
        <Header />
        <main className="w-full overflow-x-hidden py-20 max-sm:py-14">
          <div className={`${container} max-w-2xl`}>
            <h1 className="font-display text-2xl mb-3">Article not found</h1>
            <p className="text-slate-400 mb-6">This blog post does not exist.</p>
            <Link to="/blog" className="text-indigo-300 hover:text-indigo-200 text-sm">
              ← Back to blog
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const seo = getBlogPostSeo(post);

  return (
    <>
      <Seo page={seo} jsonLd={blogPostJsonLd(post)} />
      <Header />
      <main className="w-full overflow-x-hidden py-20 max-sm:py-14">
        <article className={`${container} max-w-2xl`}>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 mb-5 hover:text-indigo-300"
          >
            <i className="fas fa-arrow-left" aria-hidden="true" /> Back to blog
          </Link>
          <header className="mb-8">
            <time className="text-xs text-slate-500" dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              · {post.readMinutes} min read
            </time>
            <h1 className="font-display text-[clamp(1.75rem,4vw,2.25rem)] mt-2 mb-3 break-words">
              {post.title}
            </h1>
            <p className="text-slate-400">{post.excerpt}</p>
          </header>
          <div className={`${glassCard} p-7`}>
            {post.sections.map((section, index) => (
              <section
                key={section.heading ?? `section-${index}`}
                className={index > 0 ? 'mt-6 pt-6 border-t border-white/[0.06]' : undefined}
              >
                {section.heading ? (
                  <h2 className="text-base font-semibold mb-2.5">{section.heading}</h2>
                ) : null}
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={paragraph}
                    className={`text-[0.9rem] text-slate-400 leading-relaxed${pIndex > 0 ? ' mt-2.5' : ''}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
