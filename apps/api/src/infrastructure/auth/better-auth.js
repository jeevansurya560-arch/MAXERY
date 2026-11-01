import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { toNodeHandler } from 'better-auth/node';
import { getPrismaClient } from '../database/prisma.js';
import { config } from '../../config/index.js';

const prisma = getPrismaClient();

// Configure Google OAuth provider if credentials are provided in environment
const googleProviderConfig = config.GOOGLE_CLIENT_ID
  ? {
      google: {
        clientId: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET || '',
      },
    }
  : {};

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  secret: config.BETTER_AUTH_SECRET,
  baseURL: config.BETTER_AUTH_URL,
  trustedOrigins: [config.CORS_ORIGIN, 'http://localhost:3000'],
  socialProviders: googleProviderConfig,
  session: {
    expiresIn: config.SESSION_ABSOLUTE_TIMEOUT_SECONDS,
    updateAge: config.SESSION_IDLE_TIMEOUT_SECONDS,
    cookieCache: {
      enabled: true,
      maxAge: 300, // 5 min client cache
    },
  },
  advanced: {
    cookiePrefix: 'maxery',
  },
  user: {
    additionalFields: {
      role: {
        type: 'string',
        defaultValue: 'RESPONDER',
      },
      badgeNumber: {
        type: 'string',
        required: false,
      },
      phone: {
        type: 'string',
        required: false,
      },
      isActive: {
        type: 'boolean',
        defaultValue: true,
      },
    },
  },
});

export const authHandler = toNodeHandler(auth);
