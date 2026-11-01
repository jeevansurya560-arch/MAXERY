import { getPrismaClient } from '../infrastructure/database/prisma.js';
import { getSocketServer } from '../realtime/socket-server.js';
import { OutboxStatus } from '@maxery/shared';

let pollerInterval = null;

export async function processOutboxBatch() {
  const prisma = getPrismaClient();
  const io = getSocketServer();

  try {
    const pendingEvents = await prisma.outboxEvent.findMany({
      where: {
        status: OutboxStatus.PENDING,
        nextRetryAt: { lte: new Date() },
      },
      take: 25,
      orderBy: { createdAt: 'asc' },
    });

    if (!pendingEvents || pendingEvents.length === 0) return 0;

    for (const event of pendingEvents) {
      try {
        if (io) {
          const payload = event.payload;

          if (event.eventType === 'case.created') {
            io.emit('case.created', payload);
          } else if (event.eventType === 'case.status_updated') {
            io.to(`case:${event.aggregateId}`).emit('case.status_updated', payload);
            io.emit('case.status_updated', payload);
          } else if (event.eventType === 'contact.attempt_updated') {
            io.to(`case:${event.aggregateId}`).emit('contact.attempt_updated', payload);
          } else {
            io.emit(event.eventType, payload);
          }
        }

        await prisma.outboxEvent.update({
          where: { id: event.id },
          data: {
            status: OutboxStatus.PUBLISHED,
            processedAt: new Date(),
          },
        });
      } catch (err) {
        const nextRetry = new Date(Date.now() + Math.pow(2, event.retryCount + 1) * 1000);
        await prisma.outboxEvent.update({
          where: { id: event.id },
          data: {
            retryCount: { increment: 1 },
            nextRetryAt: nextRetry,
            status: event.retryCount >= 5 ? OutboxStatus.FAILED : OutboxStatus.PENDING,
            error: err.message,
          },
        });
      }
    }

    return pendingEvents.length;
  } catch (_err) {
    return 0;
  }
}

export function startOutboxPublisher(intervalMs = 1000) {
  if (pollerInterval) return;
  pollerInterval = setInterval(async () => {
    await processOutboxBatch();
  }, intervalMs);
}

export function stopOutboxPublisher() {
  if (pollerInterval) {
    clearInterval(pollerInterval);
    pollerInterval = null;
  }
}
