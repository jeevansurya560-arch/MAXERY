import { buildApp } from './app.js';
import { config } from './config/index.js';
import { initializeSocketServer } from './realtime/socket-server.js';
import { startOutboxPublisher, stopOutboxPublisher } from './jobs/outbox-publisher.js';

async function main() {
  const app = await buildApp();

  try {
    // 1. Start HTTP Server
    await app.listen({ port: config.PORT, host: config.HOST });
    app.server._fastify = app;

    // 2. Attach Socket.IO Realtime Server
    initializeSocketServer(app.server, config);

    // 3. Start Outbox Background Worker
    startOutboxPublisher(1000);

    app.log.info(
      `MAXERY Dedicated API Server running at http://${config.HOST}:${config.PORT}`
    );
    app.log.info(`API Base URL: http://${config.HOST}:${config.PORT}/api/v1`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  // Graceful shutdown
  const handleShutdown = async (signal) => {
    app.log.info(`Received ${signal}. Gracefully terminating MAXERY API...`);
    stopOutboxPublisher();
    await app.close();
    process.exit(0);
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}

main();
