import {
  LoginSchema,
  RegisterSchema,
  successResponse,
  errorResponse,
  AuditAction,
} from '@maxery/shared';
import { hashPassword, verifyPassword } from '../../security/crypto.js';

export default async function authRoutes(fastify) {
  // POST /api/v1/auth/login
  fastify.post('/auth/login', async (request, reply) => {
    const parseResult = LoginSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply
        .code(400)
        .send(errorResponse('Invalid login credentials', 'VALIDATION_ERROR', parseResult.error.format()));
    }

    const { email, password } = parseResult.data;
    const user = await fastify.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      include: {
        memberships: {
          include: { organisation: true },
        },
      },
    });

    if (!user || !user.isActive) {
      return reply
        .code(401)
        .send(errorResponse('Invalid email or password', 'INVALID_CREDENTIALS'));
    }

    const isMatch = verifyPassword(password, user.passwordHash);
    if (!isMatch) {
      await fastify.recordAudit({
        userId: user.id,
        action: 'AUTH_LOGIN_FAILED',
        entityType: 'User',
        entityId: user.id,
        ipAddress: request.ip,
        userAgent: request.headers['user-agent'],
      });
      return reply
        .code(401)
        .send(errorResponse('Invalid email or password', 'INVALID_CREDENTIALS'));
    }

    // Update lastLoginAt
    await fastify.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    // Record audit event
    await fastify.recordAudit({
      userId: user.id,
      action: AuditAction.AUTH_LOGIN,
      entityType: 'User',
      entityId: user.id,
      ipAddress: request.ip,
      userAgent: request.headers['user-agent'],
    });

    const token = fastify.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      organisationId: user.memberships[0]?.organisationId || null,
    });

    return reply.send(
      successResponse({
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName || `${user.firstName || ''} ${user.lastName || ''}`.trim(),
          role: user.role,
          badgeNumber: user.badgeNumber,
          memberships: user.memberships,
        },
      })
    );
  });

  // POST /api/v1/auth/register
  fastify.post('/auth/register', async (request, reply) => {
    const parseResult = RegisterSchema.safeParse(request.body);
    if (!parseResult.success) {
      return reply
        .code(400)
        .send(errorResponse('Validation error', 'VALIDATION_ERROR', parseResult.error.format()));
    }

    const { email, password, firstName, lastName, phone, role } = parseResult.data;
    const existing = await fastify.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return reply
        .code(409)
        .send(errorResponse('An account with this email already exists', 'EMAIL_IN_USE'));
    }

    const passwordHash = hashPassword(password);
    const fullName = `${firstName} ${lastName}`.trim();

    const user = await fastify.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: email.toLowerCase(),
          passwordHash,
          name: fullName,
          firstName,
          lastName,
          phone,
          role,
          isActive: true,
        },
      });

      // If registered as patient, create blank patient profile
      if (role === 'PATIENT') {
        await tx.patient.create({
          data: {
            userId: newUser.id,
            isActive: true,
          },
        });
      }

      return newUser;
    });

    await fastify.recordAudit({
      userId: user.id,
      action: 'USER_REGISTERED',
      entityType: 'User',
      entityId: user.id,
      ipAddress: request.ip,
      userAgent: request.headers['user-agent'],
    });

    const token = fastify.jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    });

    return reply.code(201).send(
      successResponse({
        token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      })
    );
  });

  // GET /api/v1/auth/me
  fastify.get(
    '/auth/me',
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      const user = await fastify.prisma.user.findUnique({
        where: { id: request.user.id },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          fullName: true,
          phone: true,
          badgeNumber: true,
          role: true,
          isActive: true,
          lastLoginAt: true,
          createdAt: true,
          memberships: {
            include: { organisation: true },
          },
          patientProfile: true,
        },
      });

      if (!user) {
        return reply.code(404).send(errorResponse('User not found', 'NOT_FOUND'));
      }

      return reply.send(successResponse({ user }));
    }
  );

  // POST /api/v1/auth/logout
  fastify.post(
    '/auth/logout',
    { preHandler: [fastify.authenticate] },
    async (request, reply) => {
      // Invalidate active sessions in the database for this user
      if (request.user?.id) {
        await fastify.prisma.session.deleteMany({
          where: { userId: request.user.id },
        });

        await fastify.recordAudit({
          userId: request.user.id,
          action: 'AUTH_LOGOUT',
          entityType: 'User',
          entityId: request.user.id,
          ipAddress: request.ip,
          userAgent: request.headers['user-agent'],
        });
      }

      return reply.send(
        successResponse({ message: 'Session successfully revoked' })
      );
    }
  );
}
