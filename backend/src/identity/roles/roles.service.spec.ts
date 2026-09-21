import { PrismaService } from '../../prisma/prisma.service';
import { RolesService } from './roles.service';

describe('RolesService', () => {
  let prisma: PrismaService;
  let rolesService: RolesService;

  beforeAll(async () => {
    prisma = new PrismaService();
    await prisma.onModuleInit();
    rolesService = new RolesService(prisma);
  });

  afterEach(async () => {
    await prisma.rol.deleteMany({ where: { nombre: { startsWith: 'TestRolesSvc' } } });
  });

  afterAll(async () => {
    await prisma.onModuleDestroy();
  });

  it('adding a new role does not alter permissions of existing roles', async () => {
    const existente = await rolesService.crearRol('TestRolesSvcExistente');
    await prisma.permiso.upsert({
      where: { nombre: 'TestRolesSvcPermisoBase' },
      create: { nombre: 'TestRolesSvcPermisoBase' },
      update: {},
    });
    const permiso = await prisma.permiso.findUniqueOrThrow({
      where: { nombre: 'TestRolesSvcPermisoBase' },
    });
    await prisma.rolPermiso.create({ data: { rolId: existente.id, permisoId: permiso.id } });

    await rolesService.crearRol('TestRolesSvcNuevo');

    const existenteLuego = await prisma.rol.findUniqueOrThrow({
      where: { id: existente.id },
      include: { permisos: true },
    });
    expect(existenteLuego.permisos).toHaveLength(1);
    expect(existenteLuego.permisos[0].permisoId).toBe(permiso.id);

    await prisma.rolPermiso.deleteMany({ where: { rolId: existente.id } });
    await prisma.permiso.deleteMany({ where: { nombre: 'TestRolesSvcPermisoBase' } });
  });

  it('rejects creating a role that already exists', async () => {
    await rolesService.crearRol('TestRolesSvcDuplicado');
    await expect(rolesService.crearRol('TestRolesSvcDuplicado')).rejects.toThrow();
  });
});
