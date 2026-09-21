import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let prisma: PrismaService;
  let authService: AuthService;

  beforeAll(async () => {
    prisma = new PrismaService();
    await prisma.onModuleInit();
    const jwtService = new JwtService({ secret: 'test-secret' });
    authService = new AuthService(prisma, jwtService);
  });

  afterEach(async () => {
    await prisma.usuarioRol.deleteMany({});
    await prisma.usuario.deleteMany({ where: { email: { contains: '@auth-test.local' } } });
    await prisma.rol.deleteMany({ where: { nombre: { startsWith: 'TestRol' } } });
  });

  afterAll(async () => {
    await prisma.onModuleDestroy();
  });

  it('authenticates a user with valid credentials', async () => {
    await authService.createUsuario('valid@auth-test.local', 'correct-password', ['TestRolDocente']);

    const result = await authService.login('valid@auth-test.local', 'correct-password');

    expect(result.accessToken).toBeDefined();
    expect(result.user.email).toBe('valid@auth-test.local');
    expect(result.user.roles).toContain('TestRolDocente');
  });

  it('rejects a login attempt with invalid credentials', async () => {
    await authService.createUsuario('invalid@auth-test.local', 'correct-password');

    await expect(authService.login('invalid@auth-test.local', 'wrong-password')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('rejects a login attempt for a non-existent user', async () => {
    await expect(authService.login('nobody@auth-test.local', 'whatever')).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
