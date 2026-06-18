import { FAQ_ITEMS } from '../content/faq';
import { container, eyebrow, glassCard, sectionHead, sectionTitle } from '../lib/classes';

export function Faq() {
  return (
    <section id="faq" className="py-20 max-sm:py-14 w-full overflow-x-hidden">
      <div className={container}>
        <div className={sectionHead}>
          <p className={eyebrow}>FAQ</p>
          <h2 className={sectionTitle}>Frequently asked questions</h2>
          <p className="text-slate-400 text-[1.05rem]">
            Answers about Mentora for interviews, screen sharing, pricing, privacy, and support.
          </p>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {FAQ_ITEMS.map((item) => (
            <details key={item.question} className={`${glassCard} group p-5`}>
              <summary className="cursor-pointer list-none font-medium text-slate-200 pr-6 relative [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  className="absolute right-0 top-0.5 text-indigo-300 transition-transform group-open:rotate-180"
                  aria-hidden="true"
                >
                  <i className="fas fa-chevron-down text-xs" />
                </span>
              </summary>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
