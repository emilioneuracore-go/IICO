import { DuracionMateria, ModalidadAcreditacion } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ActasExamenService } from './actas-examen.service';

describe('ActasExamenService', () => {
  let prisma: PrismaService;
  let service: ActasExamenService;
  let docente: { id: string };
  let alumnoA: { id: string };
  let alumnoB: { id: string };
  let libro: { id: string };
  let materiaAnual: { id: string };
  let materiaPorTramo: { id: string };
  let materiaAlFinalDelCiclo: { id: string };

  beforeAll(async () => {
    prisma = new PrismaService();
    await prisma.onModuleInit();
    service = new ActasExamenService(prisma);

    docente = await prisma.usuario.create({
      data: { email: 'docente@actas-test.local', passwordHash: 'x' },
    });
    [alumnoA, alumnoB] = await Promise.all(
      ['a', 'b'].map((suffix) =>
        prisma.alumno.create({
          data: {
            nombre: 'Test',
            apellido: `Actas-${suffix}`,
            documento: `ACTAS-TEST-${suffix}`,
            fechaNacimiento: new Date('2010-01-01'),
          },
        }),
      ),
    );
    libro = await service.crearLibroActas('TestLibroActas', 2026);
    materiaAnual = await prisma.materia.create({ data: { nombre: 'TestMateria Actas Anual' } });
    materiaPorTramo = await prisma.materia.create({
      data: {
        nombre: 'TestMateria Actas Tramo',
        duracion: DuracionMateria.BIANUAL,
        modalidadAcreditacion: ModalidadAcreditacion.POR_TRAMO,
      },
    });
    materiaAlFinalDelCiclo = await prisma.materia.create({
      data: {
        nombre: 'TestMateria Actas Ciclo',
        duracion: DuracionMateria.TRIANUAL,
        modalidadAcreditacion: ModalidadAcreditacion.AL_FINAL_DEL_CICLO,
      },
    });
  });

  afterAll(async () => {
    await prisma.actaAlumno.deleteMany({ where: { alumno: { documento: { startsWith: 'ACTAS-TEST-' } } } });
    await prisma.actaDocente.deleteMany({ where: { usuarioId: docente.id } });
    await prisma.cursadaMateria.deleteMany({ where: { alumno: { documento: { startsWith: 'ACTAS-TEST-' } } } });
    await prisma.acta.deleteMany({ where: { libroActasId: libro.id } });
    await prisma.libroActas.deleteMany({ where: { id: libro.id } });
    await prisma.materia.deleteMany({ where: { nombre: { startsWith: 'TestMateria Actas' } } });
    await prisma.alumno.deleteMany({ where: { id: { in: [alumnoA.id, alumnoB.id] } } });
    await prisma.usuario.deleteMany({ where: { id: docente.id } });
    await prisma.onModuleDestroy();
  });

  it('creates an acta with materia, fecha, docentes and alumnos inscriptos', async () => {
    const acta = await service.crearActa({
      libroActasId: libro.id,
      materiaId: materiaAnual.id,
      fecha: '2026-11-10',
      docenteIds: [docente.id],
      alumnoIds: [alumnoA.id, alumnoB.id],
    });

    expect(acta.materiaId).toBe(materiaAnual.id);
    expect(acta.docentes).toHaveLength(1);
    expect(acta.alumnos).toHaveLength(2);
    expect(acta.alumnos.every((a) => a.nota === null)).toBe(true);
  });

  it('scopes an acta to a single tramo for a "por tramo" materia', async () => {
    const acta = await service.crearActa({
      libroActasId: libro.id,
      materiaId: materiaPorTramo.id,
      fecha: '2026-11-10',
      docenteIds: [docente.id],
      alumnoIds: [alumnoA.id],
      tramoAnio: 1,
    });

    expect(acta.alcance).toBe('TRAMO');
    expect(acta.tramoAnio).toBe(1);
  });

  it('rejects an acta for the ciclo completo if the alumno has years left to cursar', async () => {
    await expect(
      service.crearActa({
        libroActasId: libro.id,
        materiaId: materiaAlFinalDelCiclo.id,
        fecha: '2026-11-10',
        docenteIds: [docente.id],
        alumnoIds: [alumnoA.id],
      }),
    ).rejects.toThrow();
  });

  it('admits an acta for the ciclo completo once the alumno cursó every year', async () => {
    await service.registrarCursada(alumnoB.id, materiaAlFinalDelCiclo.id, 1);
    await service.registrarCursada(alumnoB.id, materiaAlFinalDelCiclo.id, 2);
    await service.registrarCursada(alumnoB.id, materiaAlFinalDelCiclo.id, 3);

    const acta = await service.crearActa({
      libroActasId: libro.id,
      materiaId: materiaAlFinalDelCiclo.id,
      fecha: '2026-11-10',
      docenteIds: [docente.id],
      alumnoIds: [alumnoB.id],
    });

    expect(acta.alcance).toBe('CICLO_COMPLETO');
    expect(acta.tramoAnio).toBeNull();
  });

  it('marks the materia as acreditada when the nota is at or above the mínima de aprobación', async () => {
    const acta = await service.crearActa({
      libroActasId: libro.id,
      materiaId: materiaAnual.id,
      fecha: '2026-11-11',
      docenteIds: [docente.id],
      alumnoIds: [alumnoA.id],
    });

    const calificacion = await service.cargarCalificacion(acta.id, alumnoA.id, 6);
    expect(calificacion.resultado).toBe('APROBADO');
  });

  it('marks the materia as no acreditada when the nota is below the mínima de aprobación', async () => {
    const acta = await service.crearActa({
      libroActasId: libro.id,
      materiaId: materiaAnual.id,
      fecha: '2026-11-12',
      docenteIds: [docente.id],
      alumnoIds: [alumnoA.id],
    });

    const calificacion = await service.cargarCalificacion(acta.id, alumnoA.id, 5);
    expect(calificacion.resultado).toBe('DESAPROBADO');
  });

  it('rejects closing an acta with calificaciones still pending', async () => {
    const acta = await service.crearActa({
      libroActasId: libro.id,
      materiaId: materiaAnual.id,
      fecha: '2026-11-13',
      docenteIds: [docente.id],
      alumnoIds: [alumnoA.id, alumnoB.id],
    });
    await service.cargarCalificacion(acta.id, alumnoA.id, 7);

    await expect(service.cerrarActa(acta.id)).rejects.toThrow();
  });

  it('rejects direct edition of a calificación once the acta is cerrada', async () => {
    const acta = await service.crearActa({
      libroActasId: libro.id,
      materiaId: materiaAnual.id,
      fecha: '2026-11-14',
      docenteIds: [docente.id],
      alumnoIds: [alumnoA.id],
    });
    await service.cargarCalificacion(acta.id, alumnoA.id, 8);
    await service.cerrarActa(acta.id);

    await expect(service.cargarCalificacion(acta.id, alumnoA.id, 9)).rejects.toThrow();
  });

  it('lists the actas historial for an alumno', async () => {
    const historial = await service.listarPorAlumno(alumnoA.id);
    expect(historial.length).toBeGreaterThan(0);
    expect(historial.every((h) => h.alumnoId === alumnoA.id)).toBe(true);
    expect(historial[0].acta.materia).toBeDefined();
  });

  it('lists the actas historial for a materia', async () => {
    const historial = await service.listarPorMateria(materiaAnual.id);
    expect(historial.length).toBeGreaterThan(0);
    expect(historial.every((h) => h.materiaId === materiaAnual.id)).toBe(true);
  });
});
