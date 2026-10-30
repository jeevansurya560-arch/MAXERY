import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { z } from 'zod';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from apps/api/.env or root .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const configSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default('0.0.0.0'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  // SESSION_SECRET must be a strong random secret. No fallback — fail loudly in production.
  SESSION_SECRET: z
    .string()
    .min(32, 'SESSION_SECRET must be at least 32 characters')
    .refine(
      (s) => process.env.NODE_ENV !== 'production' || s !== 'maxery_dev_session_secret_change_in_production_minimum_32_chars',
      'SESSION_SECRET must be changed from the development default in production',
    ),
  CORS_ORIGIN: z.string().default('http://localhost:3000'),
  REDIS_URL: z.string().optional(),
  // Session settings
  SESSION_IDLE_TIMEOUT_SECONDS: z.coerce.number().default(1800),   // 30 min
  SESSION_ABSOLUTE_TIMEOUT_SECONDS: z.coerce.number().default(43200), // 12 hrs
});

const parsed = configSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.API_PORT || process.env.PORT,
  HOST: process.env.API_HOST || process.env.HOST,
  DATABASE_URL: process.env.DATABASE_URL,
  SESSION_SECRET:
    process.env.SESSION_SECRET ||
    (process.env.NODE_ENV !== 'production'
      ? 'maxery_dev_session_secret_change_in_production_minimum_32_chars'
      : undefined),
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  REDIS_URL: process.env.REDIS_URL,
  SESSION_IDLE_TIMEOUT_SECONDS: process.env.SESSION_IDLE_TIMEOUT_SECONDS,
  SESSION_ABSOLUTE_TIMEOUT_SECONDS: process.env.SESSION_ABSOLUTE_TIMEOUT_SECONDS,
});

if (!parsed.success) {
  console.error('Configuration validation failed:', parsed.error.format());
  throw new Error('Invalid service configuration.');
}

export const config = Object.freeze(parsed.data);
