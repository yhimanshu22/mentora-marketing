import mongoose, { Schema, type HydratedDocument, type InferSchemaType } from 'mongoose';

const payUTransactionSchema = new Schema(
  {
    txnid: { type: String, required: true, unique: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: String, required: true },
    billingMonths: { type: Number, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export type PayUTransactionDocument = HydratedDocument<InferSchemaType<typeof payUTransactionSchema>>;

export const PayUTransaction = mongoose.model('PayUTransaction', payUTransactionSchema);
