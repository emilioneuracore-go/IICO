import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestApp, createUserAndToken } from '../../../test/test-app';
import { PrismaService } from '../../prisma/prisma.service';

describe('LegajosAlumnosController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let tokenSecretaria: string;
  let tokenSinPermiso: string;

  beforeAll(async () => {
    app = await createTestApp();
    prisma = app.get(PrismaService);
    tokenSecretaria = await createUserAndToken(app, 'secretaria@legajos-test.local', ['SecretariaAcademica']);
    tokenSinPermiso = await createUserAndToken(app, 'familia@legajos-test.local', ['Familia']);
  });

  afterAll(async () => {
    await prisma.legajoHistorialCambio.deleteMany({});
    await prisma.alumnoResponsable.deleteMany({});
    await prisma.responsable.deleteMany({});
    await prisma.alumno.deleteMany({ where: { documento: { startsWith: 'TEST-' } } });
    const usuarios = await prisma.usuario.findMany({ where: { email: { contains: '@legajos-test.local' } } });
    const usuarioIds = usuarios.map((u) => u.id);
    await prisma.registroAuditoria.deleteMany({ where: { usuarioId: { in: usuarioIds } } });
    // No se borran las filas de Rol ('SecretariaAcademica', 'Familia'): son
    // nombres de rol reales y compartidos (no exclusivos de este test), y
    // borrarlas en cascada arrastra el UsuarioRol de cualquier otro usuario
    // del sistema que tenga ese rol.
    await prisma.usuarioRol.deleteMany({ where: { usuarioId: { in: usuarioIds } } });
    await prisma.usuario.deleteMany({ where: { email: { contains: '@legajos-test.local' } } });
    await app.close();
  });

  it('creates a legajo with all required fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/legajos-alumnos')
      .set('Authorization', `Bearer ${tokenSecretaria}`)
      .send({
        nombre: 'Juan',
        apellido: 'Pérez',
        documento: 'TEST-001',
        fechaNacimiento: '2010-05-10',
      });

    expect(response.status).toBe(201);
    expect(response.body.documento).toBe('TEST-001');
  });

  it('rejects creating a legajo with missing required fields', async () => {
    const response = await request(app.getHttpServer())
      .post('/legajos-alumnos')
      .set('Authorization', `Bearer ${tokenSecretaria}`)
      .send({ nombre: 'Sin Apellido' });

    expect(response.status).toBe(400);
  });

  it('updates a legajo and records who and when it changed', async () => {
    const alumno = await prisma.alumno.create({
      data: { nombre: 'Ana', apellido: 'Gómez', documento: 'TEST-002', fechaNacimiento: new Date('2011-01-01') },
    });

    const response = await request(app.getHttpServer())
      .patch(`/legajos-alumnos/${alumno.id}`)
      .set('Authorization', `Bearer ${tokenSecretaria}`)
      .send({ telefono: '351-000-0000' });

    expect(response.status).toBe(200);
    const historial = await prisma.legajoHistorialCambio.findMany({ where: { alumnoId: alumno.id } });
    expect(historial).toHaveLength(1);
    expect(historial[0].campo).toBe('telefono');
    expect(historial[0].valorNuevo).toBe('351-000-0000');
  });

  it('allows a legajo to have more than one responsable', async () => {
    const alumno = await prisma.alumno.create({
      data: { nombre: 'Luis', apellido: 'Díaz', documento: 'TEST-003', fechaNacimiento: new Date('2012-01-01') },
    });

    await request(app.getHttpServer())
      .post(`/legajos-alumnos/${alumno.id}/responsables`)
      .set('Authorization', `Bearer ${tokenSecretaria}`)
      .send({ nombre: 'Marta', apellido: 'Díaz', vinculo: 'MADRE' })
      .expect(201);

    await request(app.getHttpServer())
      .post(`/legajos-alumnos/${alumno.id}/responsables`)
      .set('Authorization', `Bearer ${tokenSecretaria}`)
      .send({ nombre: 'Pedro', apellido: 'Díaz', vinculo: 'PADRE' })
      .expect(201);

    const response = await request(app.getHttpServer())
      .get(`/legajos-alumnos/${alumno.id}`)
      .set('Authorization', `Bearer ${tokenSecretaria}`);

    expect(response.body.responsables).toHaveLength(2);
  });

  it('denies access to a legajo for a user without an authorized role', async () => {
    const alumno = await prisma.alumno.create({
      data: { nombre: 'Sin', apellido: 'Permiso', documento: 'TEST-004', fechaNacimiento: new Date('2013-01-01') },
    });

    const response = await request(app.getHttpServer())
      .get(`/legajos-alumnos/${alumno.id}`)
      .set('Authorization', `Bearer ${tokenSinPermiso}`);

    expect(response.status).toBe(403);
  });
});
