import { recordDownload } from '../lib/stats';
import {
  btnPrimary,
  btnSecondary,
  container,
} from '../lib/classes';

export function Hero() {
  const handleDownload = () => {
    recordDownload().catch(console.error);
  };

  return (
    <section className="pt-24 pb-28 max-sm:pt-14 max-sm:pb-20 relative overflow-hidden">
      <div className={`${container} flex flex-col items-center text-center min-w-0`}>
        {/* Top Announcement Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-[#171717] border border-[#2e2e2e] text-[#fafafa] mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[#a1a1aa]">v1.0 is live:</span>
          <span>Zero-bot meeting transcription &amp; summaries</span>
          <i className="fas fa-arrow-right text-[10px] text-[#71717a]" />
        </div>

        {/* Hero Title */}
        <h1 className="font-display font-extrabold text-[clamp(2.4rem,6vw,4.5rem)] tracking-tight leading-[1.08] mb-6 text-[#fafafa] max-w-4xl">
          #1 AI Meeting <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">Assistant</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[1.15rem] text-[#a1a1aa] max-w-2xl mb-10 leading-relaxed font-normal">
          Real-time transcription, instant executive summaries, and smart action item tracking. All in a private desktop HUD across Zoom, Teams, and Google Meet without annoying bot invites.
        </p>

        {/* Primary and Secondary CTA group */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-4 w-full sm:w-auto">
          <a
            href="#download"
            onClick={handleDownload}
            className={`${btnPrimary} text-sm px-6 py-3 rounded-xl max-sm:w-full flex items-center justify-center gap-2`}
          >
            <i className="fas fa-download text-xs" aria-hidden="true" /> Download for Desktop
          </a>
          <a
            href="#features"
            className={`${btnSecondary} text-sm px-6 py-3 rounded-xl max-sm:w-full flex items-center justify-center gap-2`}
          >
            Explore Capabilities
          </a>
        </div>

        <p className="text-xs text-[#71717a] mb-14">
          Ready in 30 seconds · No calendar bot invite required · Windows &amp; macOS
        </p>

        {/* Live UI Mockup Preview Frame */}
        <div className="w-full max-w-4xl mx-auto rounded-2xl border border-[#262626] bg-[#121212] shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* Mockup Titlebar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#171717] border-b border-[#262626]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#333333]" />
              <span className="w-3 h-3 rounded-full bg-[#333333]" />
              <span className="w-3 h-3 rounded-full bg-[#333333]" />
              <span className="ml-2 text-xs font-mono text-[#a1a1aa]">Mentora Live Meeting Assistant</span>
            </div>
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#1f1f1f] border border-[#2e2e2e] text-xs font-medium text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Real-Time Capturing</span>
            </div>
          </div>

          {/* Mockup Interior Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-5 text-left">
            {/* Live Audio & Transcript stream */}
            <div className="md:col-span-6 flex flex-col justify-between bg-[#171717] border border-[#262626] rounded-xl p-5">
              <div>
                <div className="flex items-center justify-between text-xs text-[#a1a1aa] mb-3">
                  <span className="flex items-center gap-1.5 font-medium text-white">
                    <i className="fas fa-users text-[#71717a] text-[10px]" /> Product &amp; Eng Weekly Sync
                  </span>
                  <span className="font-mono text-[10px] text-[#71717a]">Zoom · 24m 12s</span>
                </div>
                <div className="space-y-3 text-xs leading-relaxed">
                  <div className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg p-3">
                    <p className="text-[#71717a] text-[10px] uppercase font-mono mb-1">Speaker: Sarah (Engineering Lead)</p>
                    <p className="text-[#fafafa]">
                      "We concluded benchmark testing on the read-replica failover. Zero packet drops observed during the simulated outage."
                    </p>
                  </div>
                  <div className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-lg p-3">
                    <p className="text-[#71717a] text-[10px] uppercase font-mono mb-1">Speaker: Michael (Product Manager)</p>
                    <p className="text-[#fafafa]">
                      "Great! Can we schedule the database migration window for Saturday midnight and notify customer support?"
                    </p>
                  </div>
                </div>
              </div>

              {/* Audio meter */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-[#262626] text-xs text-[#71717a]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-[11px] font-mono text-[#a1a1aa]">Sub-second Whisper STT</span>
                </div>
                <span className="text-[11px] font-mono text-[#71717a]">48.0 kHz · Clean Audio</span>
              </div>
            </div>

            {/* Live Generated Summary & Action Items */}
            <div className="md:col-span-6 bg-[#171717] border border-[#262626] rounded-xl p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-white flex items-center gap-2">
                    <i className="fas fa-bolt text-[#a1a1aa] text-xs" /> Instant Action Items &amp; Recap
                  </span>
                  <span className="text-[10px] font-mono bg-white/10 text-white px-2 py-0.5 rounded">Live Updated</span>
                </div>
                <ul className="space-y-2.5 text-xs text-[#d4d4d8]">
                  <li className="flex items-start gap-2 bg-[#1f1f1f] p-2.5 rounded-lg border border-[#2a2a2a]">
                    <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                    <div>
                      <strong className="text-white">Decision:</strong> Production migration approved for Saturday 12:00 AM UTC.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 bg-[#1f1f1f] p-2.5 rounded-lg border border-[#2a2a2a]">
                    <span className="text-white font-bold mt-0.5">•</span>
                    <div>
                      <strong className="text-white">Action (Sarah):</strong> Prepare the automated database backup snapshot scripts.
                    </div>
                  </li>
                  <li className="flex items-start gap-2 bg-[#1f1f1f] p-2.5 rounded-lg border border-[#2a2a2a]">
                    <span className="text-white font-bold mt-0.5">•</span>
                    <div>
                      <strong className="text-white">Action (Michael):</strong> Share migration schedule with Customer Success team by Friday.
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-4 mt-4 border-t border-[#262626] flex items-center justify-between text-xs text-[#71717a]">
                <span>1-click export to Slack / Notion</span>
                <span className="font-mono text-[#a1a1aa]">99.4% Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
