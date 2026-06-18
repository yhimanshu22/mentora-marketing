import mongoose from 'mongoose';

import { config } from './config.js';

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(config.mongodbUri);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes('bad auth') || message.includes('Authentication failed')) {
      throw new Error(
        'MongoDB authentication failed. In Atlas: Database Access → confirm the DB user exists, reset its password, and copy a fresh connection string. If the password has special characters (@, #, :, /), URL-encode them in MONGODB_URI.',
      );
    }
    throw error;
  }
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
}
