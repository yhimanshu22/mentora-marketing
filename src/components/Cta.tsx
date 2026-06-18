import { GET_STARTED_URL } from '../content';

export function Cta() {
  return (
    <section id="download" className="section section-cta">
      <div className="container">
        <div className="glass-card cta-card">
          <h2>Ready to ace your next meeting?</h2>
          <p>
            Start with the free plan or upgrade anytime. Your audio stays local;
            only API calls leave your device.
          </p>
          <div className="cta-actions">
            <a href={GET_STARTED_URL} className="btn btn-primary btn-lg" target="_blank" rel="noreferrer">
              Get Started Free
            </a>
            <a href="#pricing" className="btn btn-ghost btn-lg">
              View plans
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
