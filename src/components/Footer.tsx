import { Link } from 'react-router-dom';

import {
  CONTACT_EMAIL,
  CONTACT_LOCATION,
  CONTACT_ONLINE_NOTE,
  CONTACT_PHONE,
  CONTACT_PHONE_DISPLAY,
  FOOTER_LEGAL_LINKS,
} from '../content';
import { container } from '../lib/classes';

const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
] as const;

const COMPANY_LINKS = [
  { to: '/blog', label: 'Blog' },
  ...FOOTER_LEGAL_LINKS,
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full overflow-x-hidden border-t border-white/[0.06] py-10">
      <div className={container}>
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between min-w-0">
          <div className="min-w-0 text-left">
            <div className="flex items-center gap-2 font-semibold mb-3">
              <img src="/logo.png" alt="Mentora AI logo" className="shrink-0" width={28} height={28} />
              <span>Mentora AI</span>
            </div>
            <p className="text-sm text-slate-500 mb-4 max-w-sm">
              Real-time transcription and AI coaching for interviews and meetings.
            </p>
            <div className="flex flex-col gap-1.5 text-sm text-slate-400">
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-indigo-300 break-all">
                {CONTACT_EMAIL}
              </a>
              <a href={`tel:+91${CONTACT_PHONE}`} className="hover:text-indigo-300 w-fit">
                {CONTACT_PHONE_DISPLAY}
              </a>
              <p className="text-slate-500 max-w-sm">
                {CONTACT_LOCATION}
                <span className="block text-xs mt-1 text-slate-600">{CONTACT_ONLINE_NOTE}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-16 text-left shrink-0">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-3">
                Product
              </p>
              <ul className="flex flex-col gap-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 hover:text-indigo-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-3">
                Company
              </p>
              <ul className="flex flex-col gap-2.5">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 hover:text-indigo-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-10 pt-6 border-t border-white/[0.06] text-center">
          © {year} Mentora AI · Made with{' '}
          <i className="fas fa-heart text-[#ff4d6d]" aria-hidden="true" />
        </p>
      </div>
    </footer>
  );
}
