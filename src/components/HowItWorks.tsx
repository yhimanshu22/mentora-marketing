import { STEPS } from '../content';
import {
  container,
  sectionHead,
  sectionTitle,
} from '../lib/classes';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-28 max-sm:py-20 border-t border-[#262626] bg-[#0a0a0a]">
      <div className={container}>
        <div className={sectionHead}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#171717] border border-[#2e2e2e] text-[#fafafa] mb-4">
            Effortless Setup
          </div>
          <h2 className={sectionTitle}>Up and running in 30 seconds</h2>
          <p className="text-[#a1a1aa] text-[1.05rem]">Zero bot invites. Works automatically with your meeting apps and local audio.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-[#141414] border border-[#262626] relative group hover:border-[#404040] transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-[#fafafa] font-semibold mb-4 bg-[#1f1f1f] w-fit px-2.5 py-1 rounded-md border border-[#2e2e2e]">
                  STEP {item.step}
                </div>
                <h3 className="text-base font-bold text-[#fafafa] mb-2 tracking-tight">{item.title}</h3>
                <p className="text-sm text-[#a1a1aa] leading-relaxed font-normal">{item.description}</p>
              </div>
              <div className="pt-4 mt-6 border-t border-[#222222] flex items-center justify-between text-xs text-[#71717a]">
                <span>Automated</span>
                <i className="fas fa-check text-emerald-400 text-xs" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
