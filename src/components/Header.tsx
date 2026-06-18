import { Link } from 'react-router-dom';

import { btnGhost, btnPrimary, container } from '../lib/classes';
import { AuthMenu } from './AuthMenu';

const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
  { to: '/blog', label: 'Blog' },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-[100] border-b border-white/[0.04] bg-[rgba(11,17,32,0.85)] backdrop-blur-xl">
      <div className={`${container} flex items-center justify-between gap-3 py-3.5 min-w-0`}>
        <Link className="flex items-center gap-2 font-bold text-[1.05rem] min-w-0 shrink" to="/">
          <img src="/logo.png" alt="Mentora AI logo" className="rounded-lg" width={32} height={32} />
          <span>Mentora</span>
        </Link>
        <nav className="hidden lg:flex gap-5 shrink-0" aria-label="Primary">
          {NAV_LINKS.map((link) =>
            'to' in link ? (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm text-slate-400 transition-colors hover:text-slate-200"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-slate-200"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2 shrink-0">
          <AuthMenu />
          <a href="/#pricing" className={`${btnGhost} max-sm:hidden`}>
            View plans
          </a>
          <a href="/#download" className={`${btnPrimary} max-sm:px-3 max-sm:text-xs`}>
            Download
          </a>
        </div>
      </div>
    </header>
  );
}
