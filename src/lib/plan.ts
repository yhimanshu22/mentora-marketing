import type { PlanId } from '../auth/types';
import { SUBSCRIPTION_PLANS } from '../content';

export const PLAN_CREDITS: Record<PlanId, number> = {
  free: 15,
  pro: 600,
  ultimate: 1500,
  magic: 4000,
};

export function formatPlanLabel(plan: PlanId | string): string {
  return SUBSCRIPTION_PLANS.find((entry) => entry.id === plan)?.name ?? plan;
}

export function planCreditsLimit(plan: PlanId | string): number {
  return PLAN_CREDITS[plan as PlanId] ?? PLAN_CREDITS.free;
}

export function creditsUsagePercent(credits: number, plan: PlanId | string): number {
  const limit = planCreditsLimit(plan);
  if (limit <= 0) return 0;
  return Math.min(100, Math.max(0, (credits / limit) * 100));
}

export function formatPlanExpiry(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function planPillClass(plan: PlanId | string): string {
  const base =
    'inline-flex items-center shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide border';
  switch (plan as PlanId) {
    case 'pro':
      return `${base} bg-blue-500/20 text-blue-300 border-blue-500/30`;
    case 'ultimate':
      return `${base} bg-indigo-500/25 text-indigo-300 border-indigo-500/35`;
    case 'magic':
      return `${base} bg-violet-500/20 text-violet-300 border-violet-500/30`;
    default:
      return `${base} bg-slate-500/20 text-slate-300 border-slate-500/25`;
  }
}
