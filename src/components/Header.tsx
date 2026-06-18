const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#pricing', label: 'Pricing' },
] as const;

export function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#">
          <img src="/logo.png" alt="" className="brand-logo" width={32} height={32} />
          <span className="brand-name">Mentora</span>
        </a>
        <nav className="nav" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-actions">
          <a href="#pricing" className="btn btn-ghost">
            View plans
          </a>
          <a href="#download" className="btn btn-primary">
            Get Mentora
          </a>
        </div>
      </div>
    </header>
  );
}
