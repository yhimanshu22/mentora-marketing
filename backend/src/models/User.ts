import mongoose, { Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

import type { PlanId } from '../types.js';

const userSchema = new Schema(
  {
    googleId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, index: true },
    name: { type: String, required: true },
    picture: { type: String, default: '' },
    plan: {
      type: String,
      enum: ['free', 'pro', 'ultimate', 'magic'],
      default: 'free',
    },
    credits: { type: Number, default: 15 },
    planExpiresAt: { type: Date, default: null },
    stripeCustomerId: { type: String, default: null },
    stripeSubscriptionId: { type: String, default: null },
  },
  { timestamps: true },
);

export type UserDocument = HydratedDocument<InferSchemaType<typeof userSchema>>;

export const User = mongoose.model('User', userSchema);

export function toPublicUser(user: UserDocument) {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    picture: user.picture,
    plan: user.plan as PlanId,
    credits: user.credits,
    planExpiresAt: user.planExpiresAt ? user.planExpiresAt.toISOString() : null,
  };
}

export function getEntitlements(user: UserDocument) {
  const now = Date.now();
  const planActive =
    user.plan === 'free' ||
    (user.planExpiresAt != null && user.planExpiresAt.getTime() > now);

  return {
    plan: user.plan as PlanId,
    credits: user.credits,
    planExpiresAt: user.planExpiresAt ? user.planExpiresAt.toISOString() : null,
    canUseAi: planActive && user.credits > 0,
  };
}
