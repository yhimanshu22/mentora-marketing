import { Link, Navigate } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';
import { Footer } from '../components/Footer';
import { GoogleSignInButton } from '../components/GoogleSignInButton';
import { Header } from '../components/Header';
import { Seo } from '../components/Seo';
import { container, glassCard } from '../lib/classes';
import { getGoogleClientId, isValidGoogleClientId } from '../lib/google';
import { PAGE_SEO } from '../seo';

export function LoginPage() {
  const { isAuthenticated } = useAuth();
  const googleClientId = getGoogleClientId();
  const googleConfigured = isValidGoogleClientId(googleClientId);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Seo page={PAGE_SEO.login} />
      <Header />
      <main className="w-full overflow-x-hidden py-20 max-sm:py-14">
        <div className={`${container} max-w-md`}>
          <div className={`${glassCard} p-8 text-center`}>
            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-3">
              Sign in
            </p>
            <h1 className="font-display text-2xl font-bold mb-2">Sign in to Mentora</h1>
            <p className="text-sm text-slate-400 mb-8">
              Sign in with Google to access your account and sync your Mentora experience.
            </p>

            {googleConfigured ? (
              <GoogleSignInButton text="signin_with" />
            ) : (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-left text-sm text-amber-100">
                <p className="font-medium mb-1">Google sign-in is not configured correctly.</p>
                <p className="text-amber-200/80 mb-2">
                  Set a valid <code className="text-amber-50">VITE_GOOGLE_CLIENT_ID</code> in your{' '}
                  <code className="text-amber-50">.env</code> file (local) or Vercel environment
                  variables (production).
                </p>
                {googleClientId ? (
                  <p className="text-amber-200/80 text-xs break-all">
                    Current value looks invalid: <code className="text-amber-50">{googleClientId}</code>
                  </p>
                ) : null}
              </div>
            )}

            <p className="text-xs text-slate-500 mt-8">
              By continuing, you agree to our{' '}
              <Link to="/terms-of-service" className="text-indigo-300 hover:text-indigo-200">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="/privacy-policy" className="text-indigo-300 hover:text-indigo-200">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
