import { errorResponse } from '@maxery/shared';

/**
 * Role-Based Access Control (RBAC) middleware generator.
 * Enforces that request.user has one of the allowed roles.
 */
export function requireRole(...allowedRoles) {
  return async function (request, reply) {
    if (!request.user || !request.user.role) {
      return reply.code(401).send(errorResponse('Authentication required', 'UNAUTHORIZED'));
    }

    if (!allowedRoles.includes(request.user.role)) {
      return reply
        .code(403)
        .send(
          errorResponse(
            `Access forbidden for role ${request.user.role}. Required: ${allowedRoles.join(', ')}`,
            'FORBIDDEN'
          )
        );
    }
  };
}
