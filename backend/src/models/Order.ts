import mongoose, { Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

const orderSchema = new Schema(
  {
    paymentId: { type: String, index: true },
    sessionId: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: String, required: true },
    billingMonths: { type: Number, required: true, default: 1 },
    status: {
      type: String,
      enum: ['pending', 'succeeded', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export type OrderDocument = HydratedDocument<InferSchemaType<typeof orderSchema>>;

export const Order = mongoose.model('Order', orderSchema);
