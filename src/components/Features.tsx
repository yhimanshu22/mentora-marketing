import { FEATURES } from '../content';
import {
  container,
  eyebrow,
  glassCard,
  sectionHead,
  sectionLead,
  sectionTitle,
} from '../lib/classes';

export function Features() {
  return (
    <section id="features" className="py-20 max-sm:py-14">
      <div className={container}>
        <div className={sectionHead}>
          <p className={eyebrow}>Features</p>
          <h2 className={sectionTitle}>Built for high-stakes conversations</h2>
          <p className={sectionLead}>
            Everything you need to stay sharp in interviews, client calls, and technical screens —
            without leaving your flow.
          </p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-4">
          {FEATURES.map((feature) => (
            <article key={feature.title} className={`${glassCard} p-5`}>
              <span
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-indigo-500/18 border border-white/[0.05] text-indigo-300 mb-3.5 shadow-[0_4px_12px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.05)]"
                aria-hidden="true"
              >
                <i className={`fas ${feature.icon}`} />
              </span>
              <h3 className="text-base mb-1.5">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-normal">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
