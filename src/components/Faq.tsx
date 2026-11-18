import { FAQ_ITEMS } from '../content/faq';
import { container, sectionHead, sectionTitle } from '../lib/classes';

export function Faq() {
  return (
    <section id="faq" className="py-24 max-sm:py-16 w-full overflow-x-hidden border-t border-white/[0.06]">
      <div className={container}>
        <div className={sectionHead}>
          <h2 className={sectionTitle}>Frequently asked questions</h2>
          <p className="text-slate-400 text-[1.05rem]">
            Answers about screen share privacy, device compatibility, latency, and subscription tiers.
          </p>
        </div>
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group p-4 rounded-xl bg-slate-900/40 border border-white/[0.08] transition-colors open:bg-slate-900/70 open:border-white/15"
            >
              <summary className="cursor-pointer list-none font-medium text-slate-100 pr-6 relative text-sm select-none [&::-webkit-details-marker]:hidden flex items-center justify-between">
                <span>{item.question}</span>
                <span
                  className="text-slate-400 transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                >
                  <i className="fas fa-chevron-down text-xs" />
                </span>
              </summary>
              <p className="mt-3 text-xs text-slate-400 leading-relaxed font-normal">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
