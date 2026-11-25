import { useState } from 'react';
import { Link } from 'react-router-dom';

import { btnPrimary, container } from '../lib/classes';
import { AuthMenu } from './AuthMenu';

const NAV_LINKS = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/#faq', label: 'FAQ' },
  { to: '/blog', label: 'Blog' },
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[100] border-b border-[#262626] bg-[#0a0a0a]/85 backdrop-blur-md">
      <div className={`${container} flex items-center justify-between gap-4 py-3.5 min-w-0`}>
        <div className="flex items-center gap-6">
          <Link
            className="flex items-center gap-2.5 font-bold text-[0.95rem] tracking-tight min-w-0 shrink text-[#fafafa] hover:opacity-90 transition-opacity"
            to="/"
          >
            <img
              src="/logo.png"
              alt="Mentora AI logo"
              className="rounded-lg border border-[#2e2e2e]"
              width={28}
              height={28}
            />
            <span className="text-[#fafafa] font-bold text-base">Mentora</span>
          </Link>

          <nav
            className="hidden md:flex items-center gap-1 shrink-0 bg-[#141414] border border-[#262626] px-2.5 py-1 rounded-full text-[13px] font-medium"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) =>
              'to' in link ? (
                <Link
                  key={link.to}
                  to={link.to}
                  className="px-3 py-1 rounded-full text-[#a1a1aa] transition-colors hover:text-[#fafafa] hover:bg-[#1f1f1f]"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-1 rounded-full text-[#a1a1aa] transition-colors hover:text-[#fafafa] hover:bg-[#1f1f1f]"
                >
                  {link.label}
                </a>
              ),
            )}
          </nav>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <AuthMenu />
          <a
            href="/#pricing"
            className="hidden sm:inline-block text-[13px] font-medium text-[#a1a1aa] hover:text-[#fafafa] px-2 py-1 transition-colors"
          >
            Pricing
          </a>
          <a
            href="/#download"
            className={`${btnPrimary} text-xs px-4 py-2 rounded-xl`}
          >
            Get Started
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 rounded-lg bg-[#171717] border border-[#262626] text-[#fafafa]"
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            <span className={`w-4 h-0.5 bg-white transition-transform ${mobileOpen ? 'rotate-45 translate-y-1' : ''}`} />
            <span className={`w-4 h-0.5 bg-white transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-4 h-0.5 bg-white transition-transform ${mobileOpen ? '-rotate-45 -translate-y-1' : ''}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#262626] bg-[#0d0d0d] px-6 py-5 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
          {NAV_LINKS.map((link) =>
            'to' in link ? (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-[#d4d4d8] hover:text-white py-1.5"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-[#d4d4d8] hover:text-white py-1.5"
              >
                {link.label}
              </a>
            ),
          )}
          <div className="pt-3 border-t border-[#262626] flex gap-2">
            <a
              href="/#download"
              onClick={() => setMobileOpen(false)}
              className={`${btnPrimary} w-full text-center text-xs py-2`}
            >
              Download App
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
