import { useState, useEffect } from 'react';
import { getStats, recordDownload, Stats } from '../lib/stats';
import {
  btnLg,
  btnPrimary,
  container,
} from '../lib/classes';

export function Hero() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    getStats().then(setStats).catch(console.error);
  }, []);

  const handleDownload = () => {
    recordDownload().catch(console.error);
  };

  return (
    <section className="pt-20 pb-24 max-sm:pt-12 max-sm:pb-16 relative">
      <div className={`${container} grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center min-w-0`}>
        <div className="min-w-0 lg:col-span-7">
          <h1 className="font-display font-semibold text-[clamp(2.25rem,5.5vw,3.6rem)] tracking-tight leading-[1.12] mb-5 text-white">
            Silent coaching for interviews & live calls
          </h1>
          <p className="text-[1.1rem] text-slate-300 max-w-xl mb-8 leading-relaxed font-normal">
            Mentora transcribes conversation audio in real time and streams contextual, profile-aware answers in a discreet desktop HUD with screen share content protection.
          </p>
          <div className="flex flex-wrap items-center gap-3.5 mb-6">
            <a
              href="#download"
              onClick={handleDownload}
              className={`${btnPrimary} ${btnLg} max-sm:w-full max-sm:text-center`}
            >
              <i className="fas fa-download text-xs" aria-hidden="true" /> Download for Desktop
            </a>
            {/* <a
              href={SOURCE_CODE_URL}
              className={`${btnSecondary} ${btnLg} max-sm:w-full max-sm:text-center`}
            >
              Full Source Code — $499
            </a> */}
          </div>
          {stats && (
            <div className="flex items-center gap-4 mb-6 text-xs text-slate-400 bg-white/[0.03] border border-white/[0.08] w-fit px-3.5 py-1.5 rounded-md">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>{stats.visits.toLocaleString()} visitors</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-700" />
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>{stats.downloads.toLocaleString()} active downloads</span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
            <span className="flex items-center gap-1.5">
              <i className="fab fa-windows text-slate-400" aria-hidden="true" /> Windows 10/11
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <i className="fab fa-apple text-slate-400" aria-hidden="true" /> macOS (Apple Silicon & Intel)
            </span>
            <span>•</span>
            <a href="#download" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-4 decoration-indigo-400/30">
              Install guide
            </a>
          </div>
        </div>
        <div className="relative min-w-0 lg:col-span-5" aria-hidden="true">
          <div className="relative rounded-xl border border-white/[0.12] bg-[#0c1220]/90 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-md overflow-hidden">
            {/* Window title bar */}
            <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-950/70 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="ml-2 text-[11px] font-mono text-slate-400">Mentora Overlay HUD</span>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Screen Hide: Active
              </div>
            </div>

            {/* Simulated Live UI Content */}
            <div className="p-4 space-y-3.5 font-sans">
              {/* Question bubble */}
              <div className="p-3 rounded-lg bg-white/[0.04] border border-white/[0.06] text-xs">
                <div className="flex items-center justify-between text-[10px] font-medium text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <i className="fas fa-user text-slate-500 text-[9px]" /> Interviewer
                  </span>
                  <span className="font-mono text-[9px] text-slate-500">Just now</span>
                </div>
                <p className="text-slate-200 leading-snug font-medium">
                  "How did you handle state synchronization across distributed microservices in your previous project?"
                </p>
              </div>

              {/* AI Suggestion Box */}
              <div className="p-3.5 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-xs shadow-inner">
                <div className="flex items-center justify-between text-[10px] text-indigo-300 font-semibold mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    Suggested Talking Points (Profile-Matched)
                  </span>
                  <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-200">1.8s</span>
                </div>
                <ul className="space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span><strong>Event-driven architecture:</strong> Implemented transactional outbox pattern with Kafka.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span><strong>Consistency trade-offs:</strong> Chose eventual consistency for order updates, reducing lock contention by 65%.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-indigo-400 font-bold">•</span>
                    <span><strong>Idempotency:</strong> Handled deduplication via unique trace IDs in Redis.</span>
                  </li>
                </ul>
              </div>

              {/* Audio Monitor strip */}
              <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                    <i className="fas fa-waveform-lines text-[9px]" />
                  </span>
                  <span className="text-[10px] text-slate-400">Listening to system audio</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex items-end gap-[2px] h-3 shrink-0">
                    <span className="w-[2px] bg-emerald-400 rounded-full animate-audio-bar-1" />
                    <span className="w-[2px] bg-emerald-400 rounded-full animate-audio-bar-2" />
                    <span className="w-[2px] bg-emerald-400 rounded-full animate-audio-bar-3" />
                    <span className="w-[2px] bg-emerald-400 rounded-full animate-audio-bar-4" />
                    <span className="w-[2px] bg-emerald-400 rounded-full animate-audio-bar-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 ml-1">44.1 kHz</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
