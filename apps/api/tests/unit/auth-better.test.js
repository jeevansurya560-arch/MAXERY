import { describe, it, expect } from 'vitest';
import { auth, authHandler } from '../../src/infrastructure/auth/better-auth.js';
import { connectWithRetry } from '../../src/infrastructure/database/prisma.js';

describe('Better Auth & Neon Infrastructure Unit Tests', () => {
  it('initializes Better Auth instance with correct provider and options', () => {
    expect(auth).toBeDefined();
    expect(typeof auth.api.getSession).toBe('function');
    expect(typeof auth.api.signInSocial).toBe('function');
    expect(typeof authHandler).toBe('function');
  });

  it('tolerates simulated Neon database wake-up latency (P1001) during connectWithRetry', async () => {
    let callCount = 0;
    const mockPrismaClient = {
      $connect: async () => {
        callCount += 1;
        if (callCount < 2) {
          const err = new Error("Can't reach database server");
          err.code = 'P1001';
          throw err;
        }
        return true;
      },
    };

    const connected = await connectWithRetry(mockPrismaClient, 3, 10);
    expect(connected).toBe(true);
    expect(callCount).toBe(2);
  });

  it('fails loudly when Neon database remains unreachable after max retries', async () => {
    const mockUnreachableClient = {
      $connect: async () => {
        const err = new Error("Can't reach database server");
        err.code = 'P1001';
        throw err;
      },
    };

    await expect(connectWithRetry(mockUnreachableClient, 2, 5)).rejects.toThrow(
      "Can't reach database server"
    );
  });
});
