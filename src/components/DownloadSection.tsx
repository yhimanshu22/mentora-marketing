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
    <section id="download" className="py-24 max-sm:py-16 border-t border-white/[0.06]">
      <div className={container}>
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="font-display text-[clamp(1.75rem,3.5vw,2.5rem)] font-bold tracking-tight text-white mb-3">
            Download Mentora for Desktop
          </h2>
          <p className="text-slate-400 text-sm">
            Current build v{APP_VERSION} · Native binaries for macOS & Windows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {DOWNLOAD_PLATFORMS.map((platform) => (
            <div
              key={platform.id}
              className="p-6 rounded-xl bg-slate-900/40 border border-white/[0.08] hover:border-white/15 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-slate-300">
                      <i className={`${platform.icon} text-sm`} aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white text-base">{platform.name}</h3>
                      <p className="text-[11px] text-slate-500">{platform.requirements}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 my-5">
                  {platform.files.map((file, index) => (
                    <a
                      key={file.id}
                      href={file.href}
                      onClick={() => handleDownload(platform.name, file.label)}
                      className={index === 0 ? `${btnPrimary} text-xs py-2.5` : `${btnSecondary} text-xs py-2.5`}
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
