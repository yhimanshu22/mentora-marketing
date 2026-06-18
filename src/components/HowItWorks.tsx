import { STEPS } from '../content';
import {
  container,
  eyebrow,
  glassCard,
  sectionHead,
  sectionTitle,
} from '../lib/classes';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 max-sm:py-14 bg-bg-alt/50">
      <div className={container}>
        <div className={sectionHead}>
          <p className={eyebrow}>How it works</p>
          <h2 className={sectionTitle}>Up and running in minutes</h2>
        </div>
        <ol className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4 list-none">
          {STEPS.map((item) => (
            <li key={item.step} className={`${glassCard} flex gap-4 p-5`}>
              <span className="text-2xl font-bold text-indigo-300/60 leading-none">
                {item.step}
              </span>
              <div>
                <h3 className="text-base mb-1.5">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
