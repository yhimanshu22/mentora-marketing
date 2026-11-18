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
    <header className="sticky top-0 z-[100] border-b border-white/[0.08] bg-[#090d16]/80 backdrop-blur-xl">
      <div className={`${container} flex items-center justify-between gap-4 py-3.5 min-w-0`}>
        <Link className="flex items-center gap-2.5 font-semibold text-[0.95rem] tracking-tight min-w-0 shrink hover:opacity-90 transition-opacity" to="/">
          <img src="/logo.png" alt="Mentora AI logo" className="rounded-md border border-white/10" width={28} height={28} />
          <span className="text-white">Mentora</span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">v1.0</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1 shrink-0 bg-white/[0.03] border border-white/[0.06] px-2 py-1 rounded-full text-xs font-medium" aria-label="Primary">
          {NAV_LINKS.map((link) =>
            'to' in link ? (
              <Link
                key={link.to}
                to={link.to}
                className="px-3 py-1.5 rounded-full text-slate-300 transition-colors hover:text-white hover:bg-white/[0.06]"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-slate-300 transition-colors hover:text-white hover:bg-white/[0.06]"
              >
                {link.label}
              </a>
            ),
          )}
        </nav>
        <div className="flex items-center gap-2.5 shrink-0">
          <AuthMenu />
          <a href="/#pricing" className={`${btnGhost} text-xs hidden sm:inline-flex`}>
            Pricing
          </a>
          <a href="/#download" className={`${btnPrimary} text-xs px-3.5 py-2`}>
            Download App
          </a>
        </div>
      </div>
    </header>
  );
}
