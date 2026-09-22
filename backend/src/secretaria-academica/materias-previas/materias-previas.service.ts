import { BadRequestException, Injectable } from '@nestjs/common';
import { EstadoMateriaAdeudada, ResultadoActaAlumno } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { ActasExamenService } from '../actas-examen/actas-examen.service';

// Tope de materias adeudadas vigente si no hay configuración explícita en
// `ConfiguracionAcreditacion` (ver design.md - Parametrización de reglas
// normativas; valor actual según Resolución 11/2025).
const CLAVE_TOPE_MATERIAS_ADEUDADAS = 'TOPE_MATERIAS_ADEUDADAS';
const TOPE_POR_DEFECTO = 3;

interface PlanInput {
  docenteResponsableId: string;
  modalidad: string;
}

@Injectable()
export class MateriasPreviasService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly actasExamenService: ActasExamenService,
  ) {}

  async obtenerTopeMateriasAdeudadas(): Promise<number> {
    const config = await this.prisma.configuracionAcreditacion.findUnique({
      where: { clave: CLAVE_TOPE_MATERIAS_ADEUDADAS },
    });
    return config ? Number(config.valor) : TOPE_POR_DEFECTO;
  }

  actualizarTopeMateriasAdeudadas(tope: number) {
    return this.prisma.configuracionAcreditacion.upsert({
      where: { clave: CLAVE_TOPE_MATERIAS_ADEUDADAS },
      create: { clave: CLAVE_TOPE_MATERIAS_ADEUDADAS, valor: String(tope) },
      update: { valor: String(tope) },
    });
  }

  async registrarMateriaAdeudada(
    alumnoId: string,
    materiaId: string,
    actaOrigenId: string,
    tramoAnio: number | null,
    plan?: PlanInput,
  ) {
    const existente = await this.prisma.materiaAdeudada.findFirst({
      where: { alumnoId, materiaId, tramoAnio, estado: EstadoMateriaAdeudada.ACTIVA },
    });
    if (existente) {
      return existente;
    }

    const cantidadActivas = await this.prisma.materiaAdeudada.count({
      where: { alumnoId, estado: EstadoMateriaAdeudada.ACTIVA },
    });
    const esLaTercera = cantidadActivas + 1 === 3;
    if (esLaTercera && !plan) {
      throw new BadRequestException(
        'La tercera materia adeudada del alumno requiere un plan de acompañamiento (docente responsable y modalidad)',
      );
    }

    return this.prisma.materiaAdeudada.create({
      data: {
        alumnoId,
        materiaId,
        tramoAnio,
        actaOrigenId,
        ...(plan && {
          planAcompanamiento: {
            create: { docenteResponsableId: plan.docenteResponsableId, modalidad: plan.modalidad },
          },
        }),
      },
      include: { planAcompanamiento: true },
    });
  }

  async acreditarMateriaAdeudada(alumnoId: string, materiaId: string, tramoAnio: number | null) {
    const activa = await this.prisma.materiaAdeudada.findFirst({
      where: { alumnoId, materiaId, tramoAnio, estado: EstadoMateriaAdeudada.ACTIVA },
    });
    if (!activa) {
      return null;
    }
    return this.prisma.materiaAdeudada.update({
      where: { id: activa.id },
      data: { estado: EstadoMateriaAdeudada.ACREDITADA, acreditadaAt: new Date() },
    });
  }

  async cerrarActaYSincronizar(actaId: string, planes: (PlanInput & { alumnoId: string })[] = []) {
    // Se sincronizan las materias previas ANTES de cerrar el acta: si a algún
    // alumno le falta el plan de acompañamiento de su tercera materia
    // adeudada, la operación completa falla y el acta queda sin cerrar, para
    // poder reintentarla con el plan una vez resuelto (en vez de quedar
    // cerrada con la sincronización a mitad de camino).
    const acta = await this.actasExamenService.obtenerActa(actaId);
    const planesPorAlumno = new Map(planes.map((p) => [p.alumnoId, p]));

    for (const actaAlumno of acta.alumnos) {
      if (actaAlumno.resultado === ResultadoActaAlumno.DESAPROBADO) {
        await this.registrarMateriaAdeudada(
          actaAlumno.alumnoId,
          acta.materiaId,
          acta.id,
          acta.tramoAnio,
          planesPorAlumno.get(actaAlumno.alumnoId),
        );
      } else if (actaAlumno.resultado === ResultadoActaAlumno.APROBADO) {
        await this.acreditarMateriaAdeudada(actaAlumno.alumnoId, acta.materiaId, acta.tramoAnio);
      }
    }

    return this.actasExamenService.cerrarActa(actaId);
  }

  listarMateriasAdeudadas(alumnoId: string) {
    return this.prisma.materiaAdeudada.findMany({
      where: { alumnoId, estado: EstadoMateriaAdeudada.ACTIVA },
      include: { materia: true, planAcompanamiento: true },
      orderBy: { createdAt: 'asc' },
    });
  }

  async evaluarHabilitacionPromocion(alumnoId: string) {
    const [cantidadAdeudadas, tope] = await Promise.all([
      this.prisma.materiaAdeudada.count({ where: { alumnoId, estado: EstadoMateriaAdeudada.ACTIVA } }),
      this.obtenerTopeMateriasAdeudadas(),
    ]);

    return { alumnoId, cantidadAdeudadas, tope, habilitado: cantidadAdeudadas <= tope };
  }
}
