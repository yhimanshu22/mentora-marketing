import { Link } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';
import { btnGhost } from '../lib/classes';

export function AuthMenu() {
  const { user, isAuthenticated, signOut } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <Link to="/login" className={`${btnGhost} max-sm:px-3 max-sm:text-xs`}>
        Sign in
      </Link>
    );
  }

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
        <button
          type="button"
          onClick={signOut}
          className="text-[0.7rem] text-slate-500 hover:text-indigo-300"
        >
          Sign out
        </button>
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
