import { EstadoPase } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { LegajosAlumnosService } from '../legajos-alumnos/legajos-alumnos.service';
import { PasesEstudiantesService } from './pases-estudiantes.service';

describe('PasesEstudiantesService', () => {
  let prisma: PrismaService;
  let legajosAlumnosService: LegajosAlumnosService;
  let service: PasesEstudiantesService;
  let alumnoExistente: { id: string; documento: string };

  beforeAll(async () => {
    prisma = new PrismaService();
    await prisma.onModuleInit();
    legajosAlumnosService = new LegajosAlumnosService(prisma);
    service = new PasesEstudiantesService(prisma, legajosAlumnosService);

    alumnoExistente = await prisma.alumno.create({
      data: {
        nombre: 'Test',
        apellido: 'Pases-Existente',
        documento: 'PASES-TEST-existente',
        fechaNacimiento: new Date('2010-01-01'),
      },
    });
  });

  afterAll(async () => {
    await prisma.paseEstudiante.deleteMany({ where: { alumno: { documento: { startsWith: 'PASES-TEST-' } } } });
    await prisma.alumno.deleteMany({ where: { documento: { startsWith: 'PASES-TEST-' } } });
    await prisma.onModuleDestroy();
  });

  it('registers a pase de ingreso vinculando un legajo existente', async () => {
    const pase = await service.registrarPaseIngreso({
      alumnoId: alumnoExistente.id,
      institucionOrigen: 'Escuela Técnica N°1',
      documentacionOrigen: 'Boletín y certificado de buena conducta',
    });

    expect(pase.tipo).toBe('INGRESO');
    expect(pase.alumnoId).toBe(alumnoExistente.id);
    expect(pase.estado).toBe(EstadoPase.PENDIENTE);
  });

  it('registers a pase de ingreso creando un legajo nuevo', async () => {
    const pase = await service.registrarPaseIngreso({
      datosAlumnoNuevo: {
        nombre: 'Test',
        apellido: 'Pases-Nuevo',
        documento: 'PASES-TEST-nuevo',
        fechaNacimiento: '2011-05-05',
      },
      institucionOrigen: 'Escuela Técnica N°2',
      documentacionOrigen: 'Legajo completo remitido por la institución de origen',
    });

    const legajoCreado = await legajosAlumnosService.obtenerLegajo(pase.alumnoId);
    expect(legajoCreado.documento).toBe('PASES-TEST-nuevo');
    expect(pase.tipo).toBe('INGRESO');
  });

  it('rejects a pase de ingreso without alumnoId or datosAlumnoNuevo', async () => {
    await expect(
      service.registrarPaseIngreso({
        institucionOrigen: 'Escuela Técnica N°3',
        documentacionOrigen: 'x',
      }),
    ).rejects.toThrow();
  });

  it('generates documentación de pase for a pase de egreso', async () => {
    const pase = await service.registrarPaseEgreso(alumnoExistente.id, 'Escuela Técnica N°4');

    expect(pase.tipo).toBe('EGRESO');
    expect(pase.documentacionPase).toBeTruthy();
    const documentacion = JSON.parse(pase.documentacionPase as string);
    expect(documentacion.institucionDestino).toBe('Escuela Técnica N°4');
    expect(documentacion.alumno.documento).toBe(alumnoExistente.documento);
  });

  it('tracks and reports the estado of a pase en trámite', async () => {
    const pase = await service.registrarPaseEgreso(alumnoExistente.id, 'Escuela Técnica N°5');

    const consultaInicial = await service.obtenerPase(pase.id);
    expect(consultaInicial.estado).toBe(EstadoPase.PENDIENTE);

    await service.actualizarEstado(pase.id, EstadoPase.EN_PROCESO);
    const consultaEnProceso = await service.obtenerPase(pase.id);
    expect(consultaEnProceso.estado).toBe(EstadoPase.EN_PROCESO);

    await service.actualizarEstado(pase.id, EstadoPase.COMPLETO);
    const consultaCompleta = await service.obtenerPase(pase.id);
    expect(consultaCompleta.estado).toBe(EstadoPase.COMPLETO);
    expect(consultaCompleta.completadoAt).not.toBeNull();
  });
});
