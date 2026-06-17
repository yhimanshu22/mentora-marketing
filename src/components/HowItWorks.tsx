import { STEPS } from '../content';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title">Up and running in minutes</h2>
        </div>
        <ol className="steps">
          {STEPS.map((item) => (
            <li key={item.step} className="glass-card step-card">
              <span className="step-num">{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
