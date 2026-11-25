import { recordDownload } from '../lib/stats';
import { trackDownload } from '../lib/analytics';
import {
  APP_VERSION,
  DOWNLOAD_PLATFORMS,
} from '../content';
import {
  btnPrimary,
  btnSecondary,
  container,
} from '../lib/classes';

export function DownloadSection() {
  const handleDownload = (platformName?: string, fileName?: string) => {
    trackDownload(platformName, fileName);
    recordDownload().catch(console.error);
  };

  return (
    <section id="download" className="py-24 max-sm:py-16 border-t border-[#262626] bg-[#0a0a0a]">
      <div className={container}>
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#171717] border border-[#2e2e2e] text-[#fafafa] mb-4">
            Available for macOS &amp; Windows
          </div>
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-[#fafafa] mb-3">
            Download Mentora for Desktop
          </h2>
          <p className="text-[#a1a1aa] text-sm">
            Current release v{APP_VERSION} · Zero-bot real-time audio capture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {DOWNLOAD_PLATFORMS.map((platform) => (
            <div
              key={platform.id}
              className="p-6 rounded-2xl bg-[#141414] border border-[#262626] hover:border-[#383838] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-[#1c1c1c] border border-[#2e2e2e] flex items-center justify-center text-[#fafafa]">
                      <i className={`${platform.icon} text-sm`} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-[#fafafa] text-base">{platform.name}</h3>
                      <p className="text-[11px] text-[#71717a]">{platform.requirements}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 my-5">
                  {platform.files.map((file, index) => (
                    <a
                      key={file.id}
                      href={file.href}
                      onClick={() => handleDownload(platform.name, file.label)}
                      className={index === 0 ? `${btnPrimary} text-xs py-2.5 rounded-xl` : `${btnSecondary} text-xs py-2.5 rounded-xl`}
                      download
                    >
                      <i className={`${platform.icon} text-xs`} aria-hidden="true" /> {file.label}
                    </a>
                  ))}
                </div>
              </div>

              <ul className="text-xs text-slate-400 space-y-2 border-t border-white/[0.06] pt-4">
                {platform.files.map((file) => (
                  <li key={file.id} className="flex items-start gap-2">
                    <i
                      className="fas fa-check text-emerald-400 text-[10px] mt-0.5 shrink-0"
                      aria-hidden="true"
                    />
                    <div className="leading-snug">
                      <span className="text-slate-300">{file.description}</span>
                      <span className="block text-[10px] font-mono text-slate-500 break-all">{file.fileName}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
