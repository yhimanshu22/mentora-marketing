import { Link } from 'react-router-dom';

import { useAuth } from '../auth/AuthContext';
import { btnGhost } from '../lib/classes';
import { formatPlanLabel, planPillClass } from '../lib/plan';

export function AuthMenu() {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) {
    return (
      <Link to="/login" className={`${btnGhost} max-sm:px-3 max-sm:text-xs`}>
        Sign in
      </Link>
    );
  }

  return (
    <Link
      to="/billing"
      className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1.5 hover:bg-white/[0.06] transition-colors"
      title="Manage billing"
    >
      <img
        src={user.picture}
        alt=""
        className="w-8 h-8 rounded-full border border-white/10 shrink-0"
        width={32}
        height={32}
        referrerPolicy="no-referrer"
      />
      <span className={planPillClass(user.plan)}>{formatPlanLabel(user.plan)}</span>
    </Link>
  );
}
