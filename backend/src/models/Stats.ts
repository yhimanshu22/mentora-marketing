import mongoose, { Document, Schema } from 'mongoose';

export interface IStats extends Document {
  visits: number;
  downloads: number;
}

const statsSchema = new Schema<IStats>(
  {
    visits: { type: Number, default: 0 },
    downloads: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Stats = mongoose.model<IStats>('Stats', statsSchema);
