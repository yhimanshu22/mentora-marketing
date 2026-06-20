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
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
          {FEATURES.map((feature) => (
            <article key={feature.title} className={`${glassCard} p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/30 hover:shadow-[0_12px_36px_rgba(99,102,241,0.08),0_8px_24px_rgba(0,0,0,0.4)] group`}>
              <span
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/12 border border-white/[0.05] text-indigo-300 mb-4 shadow-[0_4px_12px_rgba(0,0,0,0.22),inset_0_1px_0_rgba(255,255,255,0.05)] transition-colors duration-300 group-hover:bg-indigo-500/20 group-hover:text-indigo-200"
                aria-hidden="true"
              >
                <i className={`fas ${feature.icon} text-[1.05rem]`} />
              </span>
              <h3 className="text-base font-semibold mb-2 group-hover:text-indigo-200 transition-colors duration-300">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
