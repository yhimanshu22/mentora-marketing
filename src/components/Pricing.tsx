import { GITHUB_URL, LIFETIME_URL } from '../content';

const OPEN_SOURCE_FEATURES = [
  'Real-time transcription',
  'OpenAI & Gemini chat',
  'Hide mode & transparent overlay',
  'Screenshot analysis',
  'Local profile & SQLite storage',
] as const;

const LIFETIME_FEATURES = [
  'Everything in Open Source',
  'One-click installer',
  'Token usage controls',
  'Multiple chat modes',
  'Priority support & updates',
] as const;

export function Pricing() {
  return (
    <section id="pricing" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Pricing</p>
          <h2 className="section-title">Choose your edition</h2>
          <p className="section-lead">
            Both editions use your own API keys — we never bundle or resell access.
          </p>
        </div>
        <div className="pricing-grid">
          <article className="glass-card pricing-card">
            <p className="pricing-label">Open Source</p>
            <p className="pricing-price">
              Free <span className="pricing-period">forever</span>
            </p>
            <p className="pricing-desc">Clone, build, and run from source with your own keys.</p>
            <ul className="pricing-list">
              {OPEN_SOURCE_FEATURES.map((item) => (
                <li key={item}>
                  <i className="fas fa-check" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <a href={GITHUB_URL} className="btn btn-secondary btn-block" target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </article>
          <article className="glass-card pricing-card pricing-card-featured">
            <p className="pricing-badge">Popular</p>
            <p className="pricing-label">Lifetime Access</p>
            <p className="pricing-price">
              $69 <span className="pricing-period">one-time</span>
            </p>
            <p className="pricing-desc">Ready-to-install app with extra power features. No subscription.</p>
            <ul className="pricing-list">
              {LIFETIME_FEATURES.map((item) => (
                <li key={item}>
                  <i className="fas fa-check" aria-hidden="true" /> {item}
                </li>
              ))}
            </ul>
            <a href={LIFETIME_URL} className="btn btn-primary btn-block" target="_blank" rel="noreferrer">
              Get Lifetime Access
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
