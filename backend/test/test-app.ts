import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/identity/auth/auth.service';
import { PrismaService } from '../src/prisma/prisma.service';

export async function createTestApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();
  return app;
}

export async function createUserAndToken(
  app: INestApplication,
  email: string,
  roles: string[],
  password = 'test-password',
): Promise<string> {
  const authService = app.get(AuthService);
  const prisma = app.get(PrismaService);
  const existente = await prisma.usuario.findUnique({ where: { email } });
  if (existente) {
    await prisma.registroAuditoria.deleteMany({ where: { usuarioId: existente.id } });
    await prisma.usuarioRol.deleteMany({ where: { usuarioId: existente.id } });
    await prisma.usuario.delete({ where: { id: existente.id } });
  }
  await authService.createUsuario(email, password, roles);
  const { accessToken } = await authService.login(email, password);
  return accessToken;
}
