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
  const isAdmin = user.email === 'himu09854@gmail.com';
  const now = Date.now();
  const planActive =
    user.plan === 'free' ||
    (user.planExpiresAt != null && user.planExpiresAt.getTime() > now);

  return {
    plan: isAdmin ? 'magic' : (user.plan as PlanId),
    credits: isAdmin ? 999999 : user.credits,
    planExpiresAt: user.planExpiresAt ? user.planExpiresAt.toISOString() : null,
    canUseAi: isAdmin || (planActive && user.credits > 0),
  };
}
