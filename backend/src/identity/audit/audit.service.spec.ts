import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from './audit.service';

describe('AuditService', () => {
  let prisma: PrismaService;
  let auditService: AuditService;
  let usuarioId: string;

  beforeAll(async () => {
    prisma = new PrismaService();
    await prisma.onModuleInit();
    auditService = new AuditService(prisma);
    const usuario = await prisma.usuario.create({
      data: { email: 'auditor@audit-test.local', passwordHash: 'x' },
    });
    usuarioId = usuario.id;
  });

  afterAll(async () => {
    await prisma.registroAuditoria.deleteMany({ where: { usuarioId } });
    await prisma.usuario.deleteMany({ where: { id: usuarioId } });
    await prisma.onModuleDestroy();
  });

  it('persists an access to a legajo and retrieves it in its history', async () => {
    await auditService.registrar(usuarioId, 'CONSULTA_LEGAJO', 'Legajo', 'legajo-123');

    const historial = await auditService.historialDe('Legajo', 'legajo-123');

    expect(historial).toHaveLength(1);
    expect(historial[0].accion).toBe('CONSULTA_LEGAJO');
    expect(historial[0].usuarioId).toBe(usuarioId);
  });
});
