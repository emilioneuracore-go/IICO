import { DuracionMateria, EscalaCalificacion, ModalidadAcreditacion } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { MateriasService } from './materias.service';

describe('MateriasService', () => {
  let prisma: PrismaService;
  let service: MateriasService;

  beforeAll(async () => {
    prisma = new PrismaService();
    await prisma.onModuleInit();
    service = new MateriasService(prisma);
  });

  afterEach(async () => {
    await prisma.materiaVinculo.deleteMany({});
    await prisma.materiaArea.deleteMany({});
    await prisma.materia.deleteMany({ where: { nombre: { startsWith: 'TestMateria' } } });
  });

  afterAll(async () => {
    await prisma.onModuleDestroy();
  });

  it('creates a bianual materia and keeps a single identity across its years', async () => {
    const materia = await service.crearMateria('TestMateria FAT', DuracionMateria.BIANUAL);

    const consultaAnio1 = await service.obtenerMateria(materia.id);
    const consultaAnio2 = await service.obtenerMateria(materia.id);

    expect(consultaAnio1?.id).toBe(materia.id);
    expect(consultaAnio2?.id).toBe(materia.id);
    expect(consultaAnio1?.duracion).toBe(DuracionMateria.BIANUAL);
  });

  it('configures modalidad "por tramo" for a plurianual materia', async () => {
    const materia = await service.crearMateria('TestMateria Bianual', DuracionMateria.BIANUAL);
    const actualizada = await service.configurarModalidadAcreditacion(
      materia.id,
      ModalidadAcreditacion.POR_TRAMO,
    );
    expect(actualizada.modalidadAcreditacion).toBe(ModalidadAcreditacion.POR_TRAMO);
  });

  it('configures modalidad "al final del ciclo" for a plurianual materia', async () => {
    const materia = await service.crearMateria('TestMateria Trianual', DuracionMateria.TRIANUAL);
    const actualizada = await service.configurarModalidadAcreditacion(
      materia.id,
      ModalidadAcreditacion.AL_FINAL_DEL_CICLO,
    );
    expect(actualizada.modalidadAcreditacion).toBe(ModalidadAcreditacion.AL_FINAL_DEL_CICLO);
  });

  it('rejects configuring modalidad for an anual materia', async () => {
    const materia = await service.crearMateria('TestMateria Anual', DuracionMateria.ANUAL);
    await expect(
      service.configurarModalidadAcreditacion(materia.id, ModalidadAcreditacion.POR_TRAMO),
    ).rejects.toThrow();
  });

  it('adds UTP with its three areas, each with its own docente', async () => {
    const usuarios = await Promise.all(
      ['dibujo', 'taller', 'edtec'].map((slug) =>
        prisma.usuario.create({ data: { email: `${slug}@materias-test.local`, passwordHash: 'x' } }),
      ),
    );

    const utp = await service.crearMateria('TestMateria UTP', DuracionMateria.TRIANUAL);
    await service.agregarArea(utp.id, 'Dibujo Técnico', usuarios[0].id);
    await service.agregarArea(utp.id, 'Taller', usuarios[1].id);
    await service.agregarArea(utp.id, 'Educación Tecnológica', usuarios[2].id);

    const consultada = await service.obtenerMateria(utp.id);
    expect(consultada?.areas).toHaveLength(3);
    expect(consultada?.areas.map((a) => a.nombre).sort()).toEqual(
      ['Dibujo Técnico', 'Educación Tecnológica', 'Taller'].sort(),
    );

    await prisma.usuario.deleteMany({ where: { id: { in: usuarios.map((u) => u.id) } } });
  });

  it('treats a materia without areas (FAT) as simple', async () => {
    const fat = await service.crearMateria('TestMateria FAT Simple', DuracionMateria.BIANUAL);
    const consultada = await service.obtenerMateria(fat.id);
    expect(consultada?.areas).toHaveLength(0);
  });

  it('configures cualitativa/cuantitativa scale per stage for UTP', async () => {
    const utp = await service.crearMateria('TestMateria UTP Escala', DuracionMateria.TRIANUAL);
    const actualizada = await service.configurarEscalas(
      utp.id,
      EscalaCalificacion.CUALITATIVA,
      EscalaCalificacion.CUANTITATIVA,
    );
    expect(actualizada.escalaEtapaIntermedia).toBe(EscalaCalificacion.CUALITATIVA);
    expect(actualizada.escalaCierre).toBe(EscalaCalificacion.CUANTITATIVA);
  });

  it('links two materias as a Proyecto Integrado keeping independent identities', async () => {
    const materiaA = await service.crearMateria('TestMateria Integrada A');
    const materiaB = await service.crearMateria('TestMateria Integrada B');

    await service.vincularProyectoIntegrado(materiaA.id, materiaB.id);

    const consultadaA = await service.obtenerMateria(materiaA.id);
    const consultadaB = await service.obtenerMateria(materiaB.id);
    expect(consultadaA?.id).toBe(materiaA.id);
    expect(consultadaB?.id).toBe(materiaB.id);
    expect(consultadaA?.vinculosComoA).toHaveLength(1);
  });

  it('rejects linking a materia with itself', async () => {
    const materia = await service.crearMateria('TestMateria Sola');
    await expect(service.vincularProyectoIntegrado(materia.id, materia.id)).rejects.toThrow();
  });
});
