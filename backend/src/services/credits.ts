import { getEntitlements, User, type UserDocument } from '../models/User.js';
import type { Entitlements } from '../types.js';

export class CreditError extends Error {
  status: number;
  entitlements: Entitlements;

  constructor(status: number, message: string, entitlements: Entitlements) {
    super(message);
    this.status = status;
    this.entitlements = entitlements;
  }
}

function activePlanFilter(amount: number) {
  return {
    credits: { $gte: amount },
    $or: [{ plan: 'free' }, { planExpiresAt: { $gt: new Date() } }],
  };
}

export async function consumeUserCredit(
  user: UserDocument,
  amount = 1,
): Promise<Entitlements> {
  if (!Number.isFinite(amount) || amount < 1) {
    throw new Error('Invalid credit amount');
  }

  const entitlements = getEntitlements(user);
  if (!entitlements.canUseAi) {
    throw new CreditError(402, 'No active plan or credits remaining', entitlements);
  }

  if (user.credits < amount) {
    throw new CreditError(402, 'Insufficient credits', entitlements);
  }

  const updated = await User.findOneAndUpdate(
    { _id: user._id, ...activePlanFilter(amount) },
    { $inc: { credits: -amount } },
    { new: true },
  );

  if (updated) {
    return getEntitlements(updated);
  }

  const refreshed = await User.findById(user._id);
  if (!refreshed) {
    throw new Error('User not found');
  }

  const latest = getEntitlements(refreshed);
  if (!latest.canUseAi) {
    throw new CreditError(402, 'No active plan or credits remaining', latest);
  }

  throw new CreditError(402, 'Insufficient credits', latest);
}

export async function loadUserOrThrow(userId: string) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}
