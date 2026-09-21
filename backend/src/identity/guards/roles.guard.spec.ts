import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from './roles.guard';

function buildContext(user: { roles: string[] } | undefined, requiredRoles: string[]) {
  const reflector = { getAllAndOverride: () => requiredRoles } as unknown as Reflector;
  const context = {
    getHandler: () => ({}),
    getClass: () => ({}),
    switchToHttp: () => ({
      getRequest: () => ({ user }),
    }),
  } as unknown as ExecutionContext;
  return { context, reflector };
}

describe('RolesGuard', () => {
  it('allows access when the user has one of the required roles', () => {
    const { context, reflector } = buildContext({ roles: ['SecretariaAcademica'] }, ['SecretariaAcademica']);
    const guard = new RolesGuard(reflector);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('denies access when the user does not have the required role', () => {
    const { context, reflector } = buildContext({ roles: ['Familia'] }, ['SecretariaAcademica']);
    const guard = new RolesGuard(reflector);
    expect(() => guard.canActivate(context)).toThrow(ForbiddenException);
  });

  it('allows access when no roles are required for the route', () => {
    const { context, reflector } = buildContext(undefined, []);
    const guard = new RolesGuard(reflector);
    expect(guard.canActivate(context)).toBe(true);
  });
});
