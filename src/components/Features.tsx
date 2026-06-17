import { FEATURES } from '../content';

export function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Features</p>
          <h2 className="section-title">Built for high-stakes conversations</h2>
          <p className="section-lead">
            Everything you need to stay sharp in interviews, client calls, and technical screens —
            without leaving your flow.
          </p>
        </div>
        <div className="feature-grid">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="glass-card feature-card">
              <span className="feature-icon" aria-hidden="true">
                <i className={`fas ${feature.icon}`} />
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
