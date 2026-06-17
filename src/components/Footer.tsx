import { GITHUB_URL } from '../content';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/logo.png" alt="" width={28} height={28} />
          <span>Mentora AI</span>
        </div>
        <p className="footer-tagline">
          Real-time transcription and AI coaching for interviews and meetings.
        </p>
        <div className="footer-links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
        </div>
        <p className="footer-copy">
          © {year} Mentora AI · Made with <i className="fas fa-heart heart-icon" aria-hidden="true" />
        </p>
      </div>
    </footer>
  );
}
