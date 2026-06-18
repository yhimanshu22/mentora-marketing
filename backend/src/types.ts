export type PlanId = 'free' | 'pro' | 'ultimate' | 'magic';

export type BillingPeriod = 1 | 3 | 6 | 12;

export type PlanDefinition = {
  id: PlanId;
  name: string;
  monthlyPriceInr: number | null;
  credits: number;
};

export type AuthTokenPayload = {
  sub: string;
  userId: string;
};

export type PublicUser = {
  id: string;
  email: string;
  name: string;
  picture: string;
  plan: PlanId;
  credits: number;
  planExpiresAt: string | null;
};

export type Entitlements = {
  plan: PlanId;
  credits: number;
  planExpiresAt: string | null;
  canUseAi: boolean;
};
