import { GITHUB_URL, LIFETIME_URL } from '../content';

export function Hero() {
  return (
    <section className="hero section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">AI Meeting Assistant</p>
          <h1 className="hero-title">
            Silent coaching for interviews and online meetings
          </h1>
          <p className="hero-lead">
            Mentora listens to meeting audio, transcribes questions in real time, and
            delivers profile-aware answers in a floating desktop window — always on top,
            optionally hidden from screen share.
          </p>
          <div className="hero-actions">
            <a href={GITHUB_URL} className="btn btn-primary btn-lg" target="_blank" rel="noreferrer">
              <i className="fab fa-github" aria-hidden="true" />
              Open Source — Build from GitHub
            </a>
            <a href={LIFETIME_URL} className="btn btn-secondary btn-lg" target="_blank" rel="noreferrer">
              Lifetime Edition — $69
            </a>
          </div>
          <p className="hero-note">
            <i className="fas fa-desktop" aria-hidden="true" /> Windows 10+ &amp; macOS · Tauri desktop app
          </p>
        </div>
        <div className="hero-visual glass-card" aria-hidden="true">
          <div className="mock-window">
            <div className="mock-titlebar">
              <span className="mock-dot" />
              <span className="mock-dot" />
              <span className="mock-dot" />
              <span className="mock-title">Mentora</span>
            </div>
            <div className="mock-body">
              <div className="mock-msg mock-msg-user">Tell me about your recent project.</div>
              <div className="mock-msg mock-msg-ai">
                I led a React dashboard that cut report time by 40%. We used TypeScript and
                GraphQL…
                <span className="mock-time">2.1s</span>
              </div>
              <div className="mock-controls">
                <span className="mock-mic" />
                <span className="mock-hint">Listening to meeting audio. Press mic for what to say.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
