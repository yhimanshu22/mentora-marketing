import { GITHUB_URL } from '../content';

export function Cta() {
  return (
    <section id="download" className="section section-cta">
      <div className="container">
        <div className="glass-card cta-card">
          <h2>Ready to ace your next meeting?</h2>
          <p>
            Download the open-source build or grab the lifetime edition. Your audio stays local;
            only API calls leave your device.
          </p>
          <div className="cta-actions">
            <a href={GITHUB_URL} className="btn btn-primary btn-lg" target="_blank" rel="noreferrer">
              <i className="fab fa-github" aria-hidden="true" />
              Star on GitHub
            </a>
            <a href="#pricing" className="btn btn-ghost btn-lg">
              Compare editions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
