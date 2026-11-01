import { Server } from 'socket.io';
import { SOCKET_EVENTS } from '@maxery/shared';

let ioInstance = null;

export function initializeSocketServer(httpServer, config) {
  if (ioInstance) return ioInstance;

  ioInstance = new Server(httpServer, {
    cors: {
      origin: config.CORS_ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  // Authentication Middleware for WebSocket Handshake
  ioInstance.use((socket, next) => {
    const token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization?.replace(/^Bearer\s+/i, '');

    if (!token) {
      return next(new Error('Authentication token required'));
    }

    try {
      // Decode and verify token
      const fastifyInstance = httpServer._fastify;
      if (fastifyInstance && fastifyInstance.jwt) {
        const decoded = fastifyInstance.jwt.verify(token);
        socket.data.user = decoded;
        return next();
      }
      return next();
    } catch (_err) {
      return next(new Error('Invalid or expired socket authentication token'));
    }
  });

  ioInstance.on('connection', (socket) => {
    const user = socket.data.user || {};

    // Join personal notification room
    if (user.id) {
      socket.join(`user:${user.id}`);
    }

    // Join institutional room if applicable
    if (user.organisationId) {
      socket.join(`hospital:${user.organisationId}`);
    }

    // Handle joining specific case room
    socket.on(SOCKET_EVENTS.JOIN_CASE_ROOM, ({ caseId }) => {
      if (!caseId) return;
      if (['RESPONDER', 'DISPATCHER', 'ADMIN', 'AUDITOR'].includes(user.role)) {
        socket.join(`case:${caseId}`);
        socket.emit('joined', { room: `case:${caseId}` });
      }
    });

    socket.on(SOCKET_EVENTS.LEAVE_CASE_ROOM, ({ caseId }) => {
      if (!caseId) return;
      socket.leave(`case:${caseId}`);
    });
  });

  return ioInstance;
}

export function getSocketServer() {
  return ioInstance;
}
