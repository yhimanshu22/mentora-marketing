import { SOURCE_CODE_URL } from '../content';
import {
  btnLg,
  btnPrimary,
  btnSecondary,
  container,
  eyebrow,
  glassCard,
} from '../lib/classes';

export function Hero() {
  return (
    <section className="pt-16 pb-20 max-sm:py-14">
      <div className={`${container} grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-w-0`}>
        <div className="min-w-0">
          <p className={eyebrow}>AI Meeting Assistant</p>
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] mb-4 bg-gradient-to-br from-slate-50 to-indigo-300 bg-clip-text text-transparent">
            Silent coaching for interviews and online meetings
          </h1>
          <p className="text-[1.05rem] text-slate-400 max-w-lg mb-7">
            Mentora listens to meeting audio, transcribes questions in real time, and
            delivers profile-aware answers in a floating desktop window — always on top,
            optionally hidden from screen share.
          </p>
          <div className="flex flex-wrap gap-3 mb-5">
            <a
              href="#download"
              className={`${btnPrimary} ${btnLg} max-sm:w-full max-sm:whitespace-normal max-sm:text-center`}
            >
              <i className="fas fa-download" aria-hidden="true" /> Download app
            </a>
            <a
              href={SOURCE_CODE_URL}
              className={`${btnSecondary} ${btnLg} max-sm:w-full max-sm:whitespace-normal max-sm:text-center`}
            >
              Full Source Code — $499
            </a>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap mb-6">
            <i className="fas fa-desktop" aria-hidden="true" /> Windows · macOS ·{' '}
            <a href="#download" className="text-indigo-300 hover:text-indigo-200">
              All download options
            </a>
          </p>
          <div className="mb-6">
            <a
              href="https://www.producthunt.com/products/mentora-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-mentora-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:opacity-90 transition-opacity"
            >
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1175821&theme=light&t=1782303221233"
                alt="Mentora AI - AI meeting assistant for interviews and meetings | Product Hunt"
                width="250"
                height="54"
                className="w-[250px] h-[54px]"
              />
            </a>
          </div>
        </div>
        <div className="relative min-w-0" aria-hidden="true">
          <div className="absolute -inset-10 glow-indigo rounded-full opacity-60 pointer-events-none" />
          <div className="absolute -inset-20 glow-violet rounded-full opacity-40 pointer-events-none" />
          <div className={`${glassCard} p-4 relative border-white/[0.08] hover:border-indigo-500/20 transition-all duration-300`}>
            <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-bg/40 backdrop-blur-md">
              <div className="flex items-center gap-1.5 px-3 py-2.5 bg-slate-950/80 border-b border-white/[0.06]">
                <span className="w-[0.55rem] h-[0.55rem] rounded-full bg-slate-600" />
                <span className="w-[0.55rem] h-[0.55rem] rounded-full bg-slate-600" />
                <span className="w-[0.55rem] h-[0.55rem] rounded-full bg-slate-600" />
                <div className="flex items-center gap-1.5 ml-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[0.62rem] text-slate-400 font-medium">Live Assist Active</span>
                </div>
                <span className="ml-auto text-[0.68rem] text-slate-500 font-semibold tracking-wider uppercase">Mentora</span>
              </div>
              <div className="p-4 bg-bg/60 flex flex-col gap-3.5">
                <div className="self-end text-[0.72rem] px-3 py-2 rounded-lg max-w-[90%] leading-snug bg-indigo-600/90 text-white font-medium shadow-md">
                  Tell me about your recent project.
                </div>
                <div className="relative self-start text-[0.72rem] px-3 py-2 pb-5 rounded-lg max-w-[90%] leading-snug bg-slate-800/85 text-slate-200 border-l-2 border-emerald-400 shadow-md">
                  I led a React dashboard that cut report time by 40%. We used TypeScript and
                  GraphQL…
                  <span className="absolute right-2.5 bottom-1 text-[0.58rem] text-slate-400">
                    2.1s · AI response
                  </span>
                </div>
                <div className="flex items-center justify-between gap-3 pt-2.5 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-inner">
                      <i className="fas fa-microphone text-[0.58rem]" />
                    </span>
                    <span className="text-[0.65rem] text-slate-400">
                      Capturing desktop system audio...
                    </span>
                  </div>
                  <div className="flex items-end gap-[3px] h-4 shrink-0 pb-0.5">
                    <span className="w-[3px] bg-emerald-500 rounded-full animate-audio-bar-1" />
                    <span className="w-[3px] bg-emerald-400 rounded-full animate-audio-bar-2" />
                    <span className="w-[3px] bg-emerald-500 rounded-full animate-audio-bar-3" />
                    <span className="w-[3px] bg-emerald-400 rounded-full animate-audio-bar-4" />
                    <span className="w-[3px] bg-emerald-500 rounded-full animate-audio-bar-5" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
