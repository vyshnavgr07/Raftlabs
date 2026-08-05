import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  const connection = await mongoose.connect(env.mongoUri);
  return connection;
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
};
