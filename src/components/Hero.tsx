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
          <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.1] mb-4 bg-gradient-to-br from-slate-50 to-indigo-300 bg-clip-text text-transparent">
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
          <p className="text-xs text-slate-500 flex items-center gap-1.5 flex-wrap">
            <i className="fas fa-desktop" aria-hidden="true" /> Windows · macOS ·{' '}
            <a href="#download" className="text-indigo-300 hover:text-indigo-200">
              All download options
            </a>
          </p>
        </div>
        <div className={`${glassCard} p-4 min-w-0`} aria-hidden="true">
          <div className="rounded-xl overflow-hidden border border-white/[0.08]">
            <div className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-900 border-b border-white/[0.06]">
              <span className="w-[0.55rem] h-[0.55rem] rounded-full bg-slate-600" />
              <span className="w-[0.55rem] h-[0.55rem] rounded-full bg-slate-600" />
              <span className="w-[0.55rem] h-[0.55rem] rounded-full bg-slate-600" />
              <span className="ml-auto text-[0.68rem] text-slate-500">Mentora</span>
            </div>
            <div className="p-3.5 bg-bg flex flex-col gap-2">
              <div className="self-end text-[0.72rem] px-2.5 py-1.5 rounded-lg max-w-[90%] leading-snug bg-indigo-500/85 text-white">
                Tell me about your recent project.
              </div>
              <div className="relative self-start text-[0.72rem] px-2.5 py-1.5 pb-4 rounded-lg max-w-[90%] leading-snug bg-slate-800/90 text-slate-200 border-l-2 border-emerald-500">
                I led a React dashboard that cut report time by 40%. We used TypeScript and
                GraphQL…
                <span className="absolute right-2 bottom-1 text-[0.58rem] text-slate-500">
                  2.1s
                </span>
              </div>
              <div className="flex items-center gap-2 pt-1.5 border-t border-white/[0.06]">
                <span className="w-8 h-8 rounded-full shrink-0 bg-gradient-to-br from-indigo-500 to-violet-500" />
                <span className="text-[0.58rem] text-slate-500">
                  Listening to meeting audio. Press mic for what to say.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
