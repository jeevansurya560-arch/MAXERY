import fp from 'fastify-plugin';
import { getPrismaClient } from '../infrastructure/database/prisma.js';

async function prismaPlugin(fastify) {
  const prisma = getPrismaClient();

  fastify.decorate('prisma', prisma);

  fastify.addHook('onClose', async () => {
    await prisma.$disconnect();
  });
}

export default fp(prismaPlugin);
