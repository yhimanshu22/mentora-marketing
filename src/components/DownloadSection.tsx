import {
  APP_VERSION,
  DOWNLOAD_PLATFORMS,
} from '../content';
import {
  btnGhost,
  btnLg,
  btnPrimary,
  btnSecondary,
  container,
  glassCard,
} from '../lib/classes';

export function DownloadSection() {
  return (
    <section id="download" className="pb-24 max-sm:pb-20">
      <div className={container}>
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-3">
            Download
          </p>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mb-3">
            Get Mentora for your desktop
          </h2>
          <p className="text-slate-400 mb-2">
            Version {APP_VERSION} · Windows and macOS. Free to install — start with 15
            credits.
          </p>
          <p className="text-sm text-slate-500">
            Your audio stays local; only API calls leave your device.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {DOWNLOAD_PLATFORMS.map((platform) => (
            <div key={platform.id} className={`${glassCard} p-6 flex flex-col`}>
              <div className="text-center mb-5">
                <i
                  className={`${platform.icon} text-2xl text-indigo-300 mb-2`}
                  aria-hidden="true"
                />
                <h3 className="font-display text-lg text-slate-100">{platform.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{platform.requirements}</p>
              </div>

              <div className="flex flex-col gap-2 mb-5">
                {platform.files.map((file, index) => (
                  <a
                    key={file.id}
                    href={file.href}
                    className={index === 0 ? `${btnPrimary} ${btnLg}` : `${btnSecondary} ${btnLg}`}
                    download
                  >
                    <i className={`${platform.icon} mr-1`} aria-hidden="true" /> {file.label}
                  </a>
                ))}
              </div>

              <ul className="text-left text-sm text-slate-500 space-y-2 mt-auto">
                {platform.files.map((file) => (
                  <li key={file.id} className="flex gap-2">
                    <i
                      className="fas fa-check text-emerald-500 text-xs mt-1 shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      <span className="text-slate-400">{file.description}</span>
                      <span className="block text-xs text-slate-600 break-all">{file.fileName}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-10 pt-6 border-t border-white/6 max-w-5xl mx-auto">
          <a href="#pricing" className={`${btnGhost} ${btnLg}`}>
            View plans
          </a>
        </div>
      </div>
    </section>
  );
}
