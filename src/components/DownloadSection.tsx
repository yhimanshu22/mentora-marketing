import {
  APP_VERSION,
  GITHUB_RELEASES_URL,
  PRIMARY_DOWNLOAD_URL,
  WINDOWS_DOWNLOADS,
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
        <div className={`${glassCard} text-center py-12 px-8 max-w-2xl mx-auto`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-3">
            Download
          </p>
          <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] mb-3">
            Get Mentora for Windows
          </h2>
          <p className="text-slate-400 mb-2">
            Version {APP_VERSION} · Windows 10+ (64-bit). Free to install — start with 15 credits.
          </p>
          <p className="text-sm text-slate-500 mb-8">
            Your audio stays local; only API calls leave your device.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 mb-4">
            <a
              href={PRIMARY_DOWNLOAD_URL}
              className={`${btnPrimary} ${btnLg}`}
              download
            >
              <i className="fab fa-windows" aria-hidden="true" /> Download .exe
            </a>
            <a
              href={WINDOWS_DOWNLOADS[1].href}
              className={`${btnSecondary} ${btnLg}`}
              download
            >
              <i className="fas fa-box-archive" aria-hidden="true" /> Download .msi
            </a>
          </div>

          <ul className="text-left text-sm text-slate-500 space-y-2 max-w-md mx-auto mb-8">
            {WINDOWS_DOWNLOADS.map((file) => (
              <li key={file.id} className="flex gap-2">
                <i className="fas fa-check text-emerald-500 text-xs mt-1 shrink-0" aria-hidden="true" />
                <span>
                  <span className="text-slate-400">{file.description}</span>
                  <span className="block text-xs text-slate-600 break-all">{file.fileName}</span>
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap justify-center gap-3 pt-6 border-t border-white/[0.06]">
            <a href="#pricing" className={`${btnGhost} ${btnLg}`}>
              View plans
            </a>
            <a
              href={GITHUB_RELEASES_URL}
              className={`${btnGhost} ${btnLg}`}
              target="_blank"
              rel="noreferrer"
            >
              All releases on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
