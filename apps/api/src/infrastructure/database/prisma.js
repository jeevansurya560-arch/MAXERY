import { PrismaClient } from '@prisma/client';

let prismaInstance = null;

/**
 * Creates or retrieves the singleton PrismaClient instance.
 * Configured with retry tolerance for Neon compute wake-up latency (cold-starts).
 */
export function getPrismaClient() {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      log:
        process.env.NODE_ENV === 'development'
          ? ['warn', 'error']
          : ['error'],
    });
  }
  return prismaInstance;
}

/**
 * Connects to the database with retry logic to tolerate Neon compute wake-up (1-3s latency).
 * @param {PrismaClient} [client]
 * @param {number} [maxRetries=3]
 * @param {number} [delayMs=1500]
 */
export async function connectWithRetry(client = getPrismaClient(), maxRetries = 3, delayMs = 1500) {
  let attempt = 0;
  while (attempt < maxRetries) {
    try {
      await client.$connect();
      return true;
    } catch (err) {
      attempt += 1;
      // P1001: Can't reach database server at ...
      if (err.code === 'P1001' && attempt < maxRetries) {
        console.warn(`[Neon] Database compute waking up... retrying connection (${attempt}/${maxRetries}) in ${delayMs}ms`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      } else {
        throw err;
      }
    }
  }
}

export async function disconnectPrisma() {
  if (prismaInstance) {
    await prismaInstance.$disconnect();
    prismaInstance = null;
  }
}
