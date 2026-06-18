import { Link } from 'react-router-dom';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import {
  CONTACT_EMAIL,
  CONTACT_LOCATION,
  CONTACT_ONLINE_NOTE,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  INFO_PAGES,
  type InfoPageId,
} from '../content';
import { container, glassCard } from '../lib/classes';
import { Seo } from '../components/Seo';
import { PAGE_SEO, infoPageJsonLd } from '../seo';

type InfoPageProps = {
  pageId: InfoPageId;
};

export function InfoPage({ pageId }: InfoPageProps) {
  const page = INFO_PAGES[pageId];
  const seo = PAGE_SEO[pageId];

  return (
    <>
      <Seo page={seo} jsonLd={infoPageJsonLd(seo)} />
      <Header />
      <main className="py-20 max-sm:py-14">
        <div className={`${container} max-w-2xl`}>
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 mb-5 hover:text-indigo-300"
          >
            <i className="fas fa-arrow-left" aria-hidden="true" /> Back to home
          </Link>
          <h1 className="font-display text-[clamp(1.75rem,4vw,2.25rem)] mb-2">{page.title}</h1>
          {page.lead ? <p className="text-slate-400 mb-6">{page.lead}</p> : null}

          {pageId === 'contact' ? (
            <div className={`${glassCard} p-7 mb-6 grid gap-4 sm:grid-cols-3`}>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-1.5">
                  Email
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-sm text-slate-300 hover:text-indigo-300 break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-1.5">
                  Phone
                </p>
                <a
                  href={`tel:+91${CONTACT_PHONE}`}
                  className="text-sm text-slate-300 hover:text-indigo-300"
                >
                  {CONTACT_PHONE_DISPLAY}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-1.5">
                  Location
                </p>
                <p className="text-sm text-slate-300">{CONTACT_LOCATION}</p>
                <p className="text-xs text-slate-500 mt-1">{CONTACT_ONLINE_NOTE}</p>
              </div>
            </div>
          ) : null}

          <div className={`${glassCard} p-7`}>
            {page.sections.map((section, index) => (
              <section
                key={'heading' in section ? section.heading : `section-${index}`}
                className={
                  index > 0 ? 'mt-6 pt-6 border-t border-white/[0.06]' : undefined
                }
              >
                {'heading' in section ? (
                  <h2 className="text-base mb-2.5">{section.heading}</h2>
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
        </div>
      </main>
      <Footer />
    </>
  );
}
