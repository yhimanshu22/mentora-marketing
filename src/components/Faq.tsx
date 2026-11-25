import { FAQ_ITEMS } from '../content/faq';
import { container, sectionHead, sectionTitle } from '../lib/classes';

export function Faq() {
  return (
    <section id="faq" className="py-28 max-sm:py-20 w-full overflow-x-hidden border-t border-[#262626] bg-[#0d0d0d]">
      <div className={container}>
        <div className={sectionHead}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#171717] border border-[#2e2e2e] text-[#fafafa] mb-4">
            Common Inquiries
          </div>
          <h2 className={sectionTitle}>A few things you might be wondering</h2>
          <p className="text-[#a1a1aa] text-[1.05rem]">
            Answers about real-time summarisation, screen-share protection, local audio processing, and billing.
          </p>
        </div>
        <div className="max-w-3xl mx-auto flex flex-col gap-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group p-5 rounded-2xl bg-[#141414] border border-[#262626] transition-all open:border-[#383838]"
            >
              <summary className="cursor-pointer list-none font-semibold text-[#fafafa] pr-6 relative text-sm select-none [&::-webkit-details-marker]:hidden flex items-center justify-between">
                <span>{item.question}</span>
                <span
                  className="text-[#71717a] transition-transform duration-200 group-open:rotate-180"
                  aria-hidden="true"
                >
                  <i className="fas fa-chevron-down text-xs" />
                </span>
              </summary>
              <p className="mt-3.5 text-xs text-[#a1a1aa] leading-relaxed font-normal">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
