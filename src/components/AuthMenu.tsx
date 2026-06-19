import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';
import { ApiError, apiFetch } from '../lib/api';
import { btnGhost } from '../lib/classes';

export function AuthMenu() {
  const { user, token, isAuthenticated, signOut } = useAuth();
  const [portalLoading, setPortalLoading] = useState(false);

  if (!isAuthenticated || !user || !token) {
    return (
      <Link to="/login" className={`${btnGhost} max-sm:px-3 max-sm:text-xs`}>
        Sign in
      </Link>
    );
  }

  const openBillingPortal = async () => {
    setPortalLoading(true);
    try {
      const data = await apiFetch<{ url: string }>('/api/billing/portal', {
        method: 'POST',
        token,
      });
      window.location.href = data.url;
    } catch (err) {
      if (err instanceof ApiError && err.status === 400) {
        window.location.href = '/#pricing';
      }
      setPortalLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <img
        src={user.picture}
        alt=""
        className="w-8 h-8 rounded-full border border-white/10"
        width={32}
        height={32}
        referrerPolicy="no-referrer"
      />
      <div className="hidden sm:block min-w-0">
        <p className="text-xs font-medium text-slate-200 truncate max-w-[8rem]">{user.name}</p>
        <p className="text-[0.65rem] text-slate-500 capitalize">
          {user.plan} · {user.credits} credits
        </p>
        <div className="flex items-center gap-2">
          {user.plan !== 'free' ? (
            <button
              type="button"
              onClick={() => void openBillingPortal()}
              disabled={portalLoading}
              className="text-[0.7rem] text-indigo-400 hover:text-indigo-300 disabled:opacity-60"
            >
              {portalLoading ? 'Opening…' : 'Manage billing'}
            </button>
          ) : null}
          <button
            type="button"
            onClick={signOut}
            className="text-[0.7rem] text-slate-500 hover:text-indigo-300"
          >
            Sign out
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={signOut}
        className="sm:hidden text-xs text-slate-400 hover:text-indigo-300"
        aria-label="Sign out"
      >
        <i className="fas fa-right-from-bracket" aria-hidden="true" />
      </button>
    </div>
  );
}
