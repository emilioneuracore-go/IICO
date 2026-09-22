import { DuracionMateria, ModalidadAcreditacion } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ActasExamenService } from '../actas-examen/actas-examen.service';
import { MateriasPreviasService } from './materias-previas.service';

describe('MateriasPreviasService', () => {
  let prisma: PrismaService;
  let actasExamenService: ActasExamenService;
  let service: MateriasPreviasService;
  let docente: { id: string };
  let libro: { id: string };
  let materiaAnual: { id: string };
  let materiaPorTramo: { id: string };
  let materiaAlFinalDelCiclo: { id: string };
  let alumnos: { id: string }[];

  const crearAlumno = (suffix: string) =>
    prisma.alumno.create({
      data: {
        nombre: 'Test',
        apellido: `Previas-${suffix}`,
        documento: `PREVIAS-TEST-${suffix}`,
        fechaNacimiento: new Date('2010-01-01'),
      },
    });

  beforeAll(async () => {
    prisma = new PrismaService();
    await prisma.onModuleInit();
    actasExamenService = new ActasExamenService(prisma);
    service = new MateriasPreviasService(prisma, actasExamenService);

    docente = await prisma.usuario.create({
      data: { email: 'docente@previas-test.local', passwordHash: 'x' },
    });
    libro = await actasExamenService.crearLibroActas('TestLibroActasPrevias', 2026);
    materiaAnual = await prisma.materia.create({ data: { nombre: 'TestMateria Previas Anual' } });
    materiaPorTramo = await prisma.materia.create({
      data: {
        nombre: 'TestMateria Previas Tramo',
        duracion: DuracionMateria.BIANUAL,
        modalidadAcreditacion: ModalidadAcreditacion.POR_TRAMO,
      },
    });
    materiaAlFinalDelCiclo = await prisma.materia.create({
      data: {
        nombre: 'TestMateria Previas Ciclo',
        duracion: DuracionMateria.TRIANUAL,
        modalidadAcreditacion: ModalidadAcreditacion.AL_FINAL_DEL_CICLO,
      },
    });
    alumnos = await Promise.all(['a', 'b', 'c', 'd', 'e'].map(crearAlumno));
  });

  afterAll(async () => {
    await prisma.planAcompanamiento.deleteMany({ where: { docenteResponsableId: docente.id } });
    await prisma.materiaAdeudada.deleteMany({
      where: { alumno: { documento: { startsWith: 'PREVIAS-TEST-' } } },
    });
    await prisma.actaAlumno.deleteMany({ where: { alumno: { documento: { startsWith: 'PREVIAS-TEST-' } } } });
    await prisma.actaDocente.deleteMany({ where: { usuarioId: docente.id } });
    await prisma.cursadaMateria.deleteMany({ where: { alumno: { documento: { startsWith: 'PREVIAS-TEST-' } } } });
    await prisma.acta.deleteMany({ where: { libroActasId: libro.id } });
    await prisma.libroActas.deleteMany({ where: { id: libro.id } });
    await prisma.configuracionAcreditacion.deleteMany({ where: { clave: 'TOPE_MATERIAS_ADEUDADAS' } });
    await prisma.materia.deleteMany({ where: { nombre: { startsWith: 'TestMateria Previas' } } });
    await prisma.alumno.deleteMany({ where: { id: { in: alumnos.map((a) => a.id) } } });
    await prisma.usuario.deleteMany({ where: { id: docente.id } });
    await prisma.onModuleDestroy();
  });

  async function cerrarActaConResultado(materiaId: string, alumnoId: string, nota: number, tramoAnio?: number) {
    const acta = await actasExamenService.crearActa({
      libroActasId: libro.id,
      materiaId,
      fecha: '2026-11-10',
      docenteIds: [docente.id],
      alumnoIds: [alumnoId],
      tramoAnio,
    });
    await actasExamenService.cargarCalificacion(acta.id, alumnoId, nota);
    return acta;
  }

  it('registers a materia adeudada when an acta closes with a not-acreditada result', async () => {
    const acta = await cerrarActaConResultado(materiaAnual.id, alumnos[0].id, 4);
    await service.cerrarActaYSincronizar(acta.id);

    const adeudadas = await service.listarMateriasAdeudadas(alumnos[0].id);
    expect(adeudadas.map((m) => m.materiaId)).toContain(materiaAnual.id);
  });

  it('registers the materia adeudada for the specific tramo without blocking the next tramo', async () => {
    const actaTramo1 = await cerrarActaConResultado(materiaPorTramo.id, alumnos[1].id, 3, 1);
    await service.cerrarActaYSincronizar(actaTramo1.id);

    // No haber acreditado el tramo 1 no debe bloquear rendir el tramo 2.
    const actaTramo2 = await cerrarActaConResultado(materiaPorTramo.id, alumnos[1].id, 8, 2);
    await service.cerrarActaYSincronizar(actaTramo2.id);

    const adeudadas = await service.listarMateriasAdeudadas(alumnos[1].id);
    const delTramo1 = adeudadas.find((m) => m.materiaId === materiaPorTramo.id && m.tramoAnio === 1);
    const delTramo2 = adeudadas.find((m) => m.materiaId === materiaPorTramo.id && m.tramoAnio === 2);
    expect(delTramo1).toBeDefined();
    expect(delTramo2).toBeUndefined();
  });

  it('does not generate a materia adeudada for an intermediate year of an "al final del ciclo" materia', async () => {
    await prisma.cursadaMateria.create({ data: { alumnoId: alumnos[2].id, materiaId: materiaAlFinalDelCiclo.id, anio: 1 } });

    const adeudadas = await service.listarMateriasAdeudadas(alumnos[2].id);
    expect(adeudadas.map((m) => m.materiaId)).not.toContain(materiaAlFinalDelCiclo.id);
  });

  it('applies an updated tope without a code change', async () => {
    expect(await service.obtenerTopeMateriasAdeudadas()).toBe(3);
    await service.actualizarTopeMateriasAdeudadas(5);
    expect(await service.obtenerTopeMateriasAdeudadas()).toBe(5);
    await service.actualizarTopeMateriasAdeudadas(3);
  });

  it('evaluates promoción habilitada within the configured tope', async () => {
    const evaluacion = await service.evaluarHabilitacionPromocion(alumnos[3].id);
    expect(evaluacion.cantidadAdeudadas).toBe(0);
    expect(evaluacion.habilitado).toBe(true);
  });

  it('evaluates promoción no habilitada beyond the configured tope', async () => {
    const materiasExtra = await Promise.all(
      ['x', 'y', 'z', 'w'].map((suffix) =>
        prisma.materia.create({ data: { nombre: `TestMateria Previas Extra-${suffix}` } }),
      ),
    );

    for (const materia of materiasExtra) {
      const acta = await cerrarActaConResultado(materia.id, alumnos[3].id, 2);
      const plan = { alumnoId: alumnos[3].id, docenteResponsableId: docente.id, modalidad: 'Apoyo semanal' };
      await service.cerrarActaYSincronizar(acta.id, [plan]);
    }

    const evaluacion = await service.evaluarHabilitacionPromocion(alumnos[3].id);
    expect(evaluacion.cantidadAdeudadas).toBe(4);
    expect(evaluacion.habilitado).toBe(false);
  });

  it('requires a plan de acompañamiento when a materia adeudada is the third for the alumno', async () => {
    const materiasExtra = await Promise.all(
      ['p', 'q', 'r'].map((suffix) => prisma.materia.create({ data: { nombre: `TestMateria Previas Tercera-${suffix}` } })),
    );

    const acta1 = await cerrarActaConResultado(materiasExtra[0].id, alumnos[4].id, 4);
    await service.cerrarActaYSincronizar(acta1.id);
    const acta2 = await cerrarActaConResultado(materiasExtra[1].id, alumnos[4].id, 4);
    await service.cerrarActaYSincronizar(acta2.id);

    const acta3 = await cerrarActaConResultado(materiasExtra[2].id, alumnos[4].id, 4);
    await expect(service.cerrarActaYSincronizar(acta3.id)).rejects.toThrow();

    const plan = { alumnoId: alumnos[4].id, docenteResponsableId: docente.id, modalidad: 'Tutoría individual' };
    const acta3Reintento = await service.cerrarActaYSincronizar(acta3.id, [plan]);
    expect(acta3Reintento).toBeDefined();

    const adeudadas = await service.listarMateriasAdeudadas(alumnos[4].id);
    const tercera = adeudadas.find((m) => m.materiaId === materiasExtra[2].id);
    expect(tercera?.planAcompanamiento).toBeDefined();
  });

  it('removes a materia adeudada once a later acta acredita the materia', async () => {
    const actaDesaprueba = await cerrarActaConResultado(materiaAnual.id, alumnos[0].id, 4);
    await service.cerrarActaYSincronizar(actaDesaprueba.id);
    expect((await service.listarMateriasAdeudadas(alumnos[0].id)).map((m) => m.materiaId)).toContain(
      materiaAnual.id,
    );

    const actaAprueba = await cerrarActaConResultado(materiaAnual.id, alumnos[0].id, 8);
    await service.cerrarActaYSincronizar(actaAprueba.id);

    expect((await service.listarMateriasAdeudadas(alumnos[0].id)).map((m) => m.materiaId)).not.toContain(
      materiaAnual.id,
    );
  });
});
