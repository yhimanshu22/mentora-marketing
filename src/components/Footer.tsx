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
    <footer className="w-full overflow-x-clip border-t border-[#262626] bg-[#050505] py-16">
      <div className={container}>
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between min-w-0">
          <div className="min-w-0 text-left">
            <div className="flex items-center gap-2.5 font-bold mb-3 text-white">
              <img src="/logo.png" alt="Mentora AI logo" className="shrink-0 rounded-lg border border-[#2e2e2e]" width={28} height={28} />
              <span className="text-base tracking-tight">Mentora AI</span>
            </div>
            <p className="text-sm text-[#71717a] mb-5 max-w-sm leading-relaxed">
              Real-time AI copilot for live calls and technical interviews. Sub-second audio transcription, contextual answers, and screen share invisible overlay.
            </p>
            <div className="mb-6">
              <a
                href="https://www.producthunt.com/products/mentora-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-mentora-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block hover:opacity-90 transition-opacity"
              >
                <img
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1175821&theme=light&t=1782303221233"
                  alt="Mentora AI - AI meeting assistant and summarisation tool | Product Hunt"
                  width="180"
                  height="39"
                  className="w-[180px] h-[39px]"
                />
              </a>
            </div>
            <div className="flex flex-col gap-2 text-xs text-[#a1a1aa]">
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white break-all">
                {CONTACT_EMAIL}
              </a>
              <a href={`tel:+91${CONTACT_PHONE}`} className="hover:text-white w-fit">
                {CONTACT_PHONE_DISPLAY}
              </a>
              <p className="text-[#71717a] max-w-sm">
                {CONTACT_LOCATION}
                <span className="block text-[11px] mt-1 text-[#52525b]">{CONTACT_ONLINE_NOTE}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-14 md:gap-20 text-left shrink-0">
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#fafafa] mb-4">
                Product
              </p>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-xs text-[#a1a1aa] hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#fafafa] mb-4">
                Company
              </p>
              <ul className="flex flex-col gap-3">
                {COMPANY_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-xs text-[#a1a1aa] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717a]">
          <p>© {year} Mentora AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
