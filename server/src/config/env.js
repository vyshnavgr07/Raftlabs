import dotenv from 'dotenv';

dotenv.config();

const required = ['PORT', 'MONGO_URI', 'CLIENT_URL'];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
}

export const env = Object.freeze({
  port: Number(process.env.PORT),
  mongoUri: process.env.MONGO_URI,
  clientUrl: process.env.CLIENT_URL,
  nodeEnv: process.env.NODE_ENV || 'development',
});

console.log('[env]', env);
