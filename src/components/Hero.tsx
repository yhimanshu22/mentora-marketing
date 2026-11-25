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
          <span>AI Meeting Assistant</span>
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
        <div className="w-full max-w-4xl mx-auto rounded-2xl border border-[#344b69]/60 bg-[#0d1016] shadow-[0_20px_50px_rgba(0,0,0,0.7)] overflow-hidden text-left">
          {/* Mockup Titlebar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#101622] border-b border-[#1f2b3e]">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
              <span className="ml-2.5 text-[11px] font-medium text-[#8ca0ba] tracking-wide">Mentora Chat Demo</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#162235] border border-[#2b4160] text-[11px] font-medium text-[#00b9e8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00b9e8] animate-pulse" />
              <span>AI Co-Pilot</span>
            </div>
          </div>

          {/* Chat Container */}
          <div className="p-3.5 sm:p-4 flex flex-col gap-2.5 text-xs sm:text-[12.5px] leading-relaxed">
            {/* Q1: User question 1 */}
            <div className="flex justify-end w-full">
              <div className="bg-gradient-to-r from-[#08b6d9] to-[#3184f6] rounded-[16px_16px_5px_16px] px-3 py-1.5 text-white font-medium shadow-[0_4px_15px_rgba(0,174,230,0.18)]">
                Write my introduction
              </div>
            </div>

            {/* A1: Assistant answer 1 */}
            <div className="flex justify-start w-full">
              <div className="bg-gradient-to-br from-[#1a273a] to-[#1c2a40] border border-[#344b69] rounded-[16px_16px_16px_5px] max-w-[90%] p-2.5 sm:p-3 text-[#e5ebf5] shadow-sm">
                <p className="text-white font-medium mb-1">
                  &ldquo;I am a Full-Stack &amp; AI Engineer with experience building scalable distributed web apps and intelligent automation systems. Passionate about solving complex problems through clean architecture, real-time data processing, and user-centric design.&rdquo;
                </p>
                <span className="block text-right text-[#8ca0ba] text-[10px]">1.4s response</span>
              </div>
            </div>

            {/* Q2: User question 2 */}
            <div className="flex justify-end w-full">
              <div className="bg-gradient-to-r from-[#08b6d9] to-[#3184f6] rounded-[16px_16px_5px_16px] px-3 py-1.5 text-white font-medium shadow-[0_4px_15px_rgba(0,174,230,0.18)]">
                Explain internship project
              </div>
            </div>

            {/* A2: Assistant answer 2 */}
            <div className="flex justify-start w-full">
              <div className="bg-gradient-to-br from-[#1a273a] to-[#1c2a40] border border-[#344b69] rounded-[16px_16px_16px_5px] max-w-[92%] p-2.5 sm:p-3 text-[#e5ebf5] shadow-sm">
                <div className="text-[12px] font-semibold text-white mb-1.5 flex items-center justify-between">
                  <span className="text-[#38bdf8]">Internship Project Overview:</span>
                  <span className="text-[#8ca0ba] text-[10px] font-mono">STAR Framework</span>
                </div>
                <div className="space-y-1 text-[11px] sm:text-xs">
                  <div>
                    <strong className="text-white min-w-[70px] inline-block">Situation:</strong>
                    <span>Internal microservices faced bottlenecks during peak concurrent user requests.</span>
                  </div>
                  <div>
                    <strong className="text-white min-w-[70px] inline-block">Task:</strong>
                    <span>Designed an asynchronous queuing architecture with Redis &amp; worker pools.</span>
                  </div>
                  <div>
                    <strong className="text-white min-w-[70px] inline-block">Impact:</strong>
                    <span>Reduced API latency by 42% and achieved zero packet drops under stress testing.</span>
                  </div>
                </div>
                <span className="block text-right text-[#8ca0ba] text-[10px] mt-1.5">2.1s response</span>
              </div>
            </div>

            {/* Suggestion buttons */}
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              <button
                type="button"
                className="border border-[#00b9e8]/70 bg-[#101c2a] hover:bg-[#073b51] text-[#dcecff] rounded-full px-2.5 py-0.5 text-[10.5px] font-medium transition-all shadow-sm hover:shadow-[0_0_12px_rgba(0,190,240,0.2)] hover:-translate-y-0.5"
              >
                ✨ Tailor for FAANG interview
              </button>
              <button
                type="button"
                className="border border-[#00b9e8]/70 bg-[#101c2a] hover:bg-[#073b51] text-[#dcecff] rounded-full px-2.5 py-0.5 text-[10.5px] font-medium transition-all shadow-sm hover:shadow-[0_0_12px_rgba(0,190,240,0.2)] hover:-translate-y-0.5"
              >
                ✨ Add metrics &amp; tech stack
              </button>
              <button
                type="button"
                className="border border-[#00b9e8]/70 bg-[#101c2a] hover:bg-[#073b51] text-[#dcecff] rounded-full px-2.5 py-0.5 text-[10.5px] font-medium transition-all shadow-sm hover:shadow-[0_0_12px_rgba(0,190,240,0.2)] hover:-translate-y-0.5"
              >
                ✨ Practice follow-up Q&amp;A
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
