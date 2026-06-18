import type { PlanDefinition, PlanId } from '../types.js';

export const BILLING_PERIODS = [1, 3, 6, 12] as const;

export const PLANS: Record<PlanId, PlanDefinition> = {
  free: {
    id: 'free',
    name: 'Free',
    monthlyPriceInr: null,
    credits: 15,
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    monthlyPriceInr: 2038,
    credits: 600,
  },
  ultimate: {
    id: 'ultimate',
    name: 'Ultimate',
    monthlyPriceInr: 3625,
    credits: 1500,
  },
  magic: {
    id: 'magic',
    name: 'Magic',
    monthlyPriceInr: 7967,
    credits: 4000,
  },
};

export function isPaidPlan(planId: string): planId is Exclude<PlanId, 'free'> {
  return planId === 'pro' || planId === 'ultimate' || planId === 'magic';
}

export function isBillingPeriod(months: number): months is 1 | 3 | 6 | 12 {
  return BILLING_PERIODS.includes(months as 1 | 3 | 6 | 12);
}

export function periodTotalInr(monthlyPriceInr: number, months: number): number {
  return monthlyPriceInr * months;
}

export function periodTotalInPaise(monthlyPriceInr: number, months: number): number {
  return periodTotalInr(monthlyPriceInr, months) * 100;
}

export function addMonths(date: Date, months: number): Date {
  const next = new Date(date);
  next.setMonth(next.getMonth() + months);
  return next;
}
