import { FEATURES } from '../content';
import {
  container,
  sectionHead,
  sectionLead,
  sectionTitle,
} from '../lib/classes';

export function Features() {
  return (
    <section id="features" className="py-24 max-sm:py-16 border-t border-white/[0.06]">
      <div className={container}>
        <div className={sectionHead}>
          <h2 className={sectionTitle}>Built for high-stakes conversations</h2>
          <p className={sectionLead}>
            Engineered to give you calm, precise leverage during interviews, client presentations, and technical screenings.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-slate-900/40 border border-white/[0.08] hover:border-indigo-500/30 hover:bg-slate-900/70 transition-all duration-200"
            >
              <div
                className="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300 flex items-center justify-center mb-5 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors"
                aria-hidden="true"
              >
                <i className={`fas ${feature.icon} text-sm`} />
              </div>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
