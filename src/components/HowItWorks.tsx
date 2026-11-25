import { STEPS } from '../content';
import {
  container,
  sectionHead,
  sectionTitle,
} from '../lib/classes';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 max-sm:py-16 border-t border-white/[0.06] bg-white/[0.01]">
      <div className={container}>
        <div className={sectionHead}>
          <h2 className={sectionTitle}>Up and running in minutes</h2>
          <p className="text-slate-400 text-[1.05rem]">Zero bot invites. Works automatically with your meeting apps and local audio.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-xl bg-slate-900/40 border border-white/[0.08] relative group hover:border-white/20 transition-colors"
            >
              <div className="text-xs font-mono text-slate-200 font-semibold mb-4 bg-white/[0.06] w-fit px-2 py-0.5 rounded border border-white/20">
                STEP {item.step}
              </div>
              <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
