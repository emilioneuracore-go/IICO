import { PrismaService } from '../../prisma/prisma.service';
import { LibroMatrizService } from './libro-matriz.service';

describe('LibroMatrizService', () => {
  let prisma: PrismaService;
  let service: LibroMatrizService;
  let alumnoA: { id: string };
  let alumnoB: { id: string };
  let alumnoC: { id: string };

  beforeAll(async () => {
    prisma = new PrismaService();
    await prisma.onModuleInit();
    service = new LibroMatrizService(prisma);

    [alumnoA, alumnoB, alumnoC] = await Promise.all(
      ['a', 'b', 'c'].map((suffix) =>
        prisma.alumno.create({
          data: {
            nombre: 'Test',
            apellido: `LibroMatriz-${suffix}`,
            documento: `LM-TEST-${suffix}`,
            fechaNacimiento: new Date('2010-01-01'),
          },
        }),
      ),
    );
  });

  afterAll(async () => {
    await prisma.inscripcionLibroMatriz.deleteMany({
      where: { alumnoId: { in: [alumnoA.id, alumnoB.id, alumnoC.id] } },
    });
    await prisma.alumno.deleteMany({ where: { id: { in: [alumnoA.id, alumnoB.id, alumnoC.id] } } });
    await prisma.onModuleDestroy();
  });

  it('assigns consecutive correlative numbers within the same libro/año', async () => {
    const primera = await service.inscribir('1', 2026, alumnoA.id);
    const segunda = await service.inscribir('1', 2026, alumnoB.id);

    expect(primera.numeroCorrelativo).toBe(1);
    expect(segunda.numeroCorrelativo).toBe(primera.numeroCorrelativo + 1);
  });

  it('starts numbering independently for a different libro/año', async () => {
    const inscripcion = await service.inscribir('2', 2027, alumnoC.id);
    expect(inscripcion.numeroCorrelativo).toBe(1);
  });

  it('rejects a second active inscription for the same alumno and período', async () => {
    await service.inscribir('1', 2028, alumnoA.id);
    await expect(service.inscribir('1', 2028, alumnoA.id)).rejects.toThrow();
  });

  it('allows a new active inscription after the previous one for that período was deactivated', async () => {
    const primera = await service.inscribir('1', 2029, alumnoA.id);
    await service.desactivar(primera.id);

    const segunda = await service.inscribir('1', 2029, alumnoA.id);
    expect(segunda.activa).toBe(true);
  });

  it('lists inscriptions filtered by libro and año', async () => {
    await service.inscribir('3', 2030, alumnoA.id);
    await service.inscribir('3', 2030, alumnoB.id);

    const listado = await service.listarPorLibroYAnio('3', 2030);

    expect(listado).toHaveLength(2);
    expect(listado.map((i) => i.numeroCorrelativo)).toEqual([1, 2]);
  });
});
