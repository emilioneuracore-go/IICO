import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { AlcanceActa, DuracionMateria, EstadoActa, ModalidadAcreditacion, ResultadoActaAlumno } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

// Las actas de examen (mesas de examen/finales) siempre califican en escala
// numérica 1-10, independientemente de la escala cualitativa/cuantitativa
// configurada por etapa en `Materia` (esa escala aplica a la libreta de
// calificaciones periódicas, no a las actas de examen).
const NOTA_MINIMA_APROBACION = 6;

const DURACION_A_ANIOS: Record<DuracionMateria, number> = {
  [DuracionMateria.ANUAL]: 1,
  [DuracionMateria.BIANUAL]: 2,
  [DuracionMateria.TRIANUAL]: 3,
};

interface CrearActaInput {
  libroActasId: string;
  materiaId: string;
  fecha: string;
  docenteIds: string[];
  alumnoIds: string[];
  tramoAnio?: number;
}

@Injectable()
export class ActasExamenService {
  constructor(private readonly prisma: PrismaService) {}

  crearLibroActas(nombre: string, anio: number) {
    return this.prisma.libroActas.create({ data: { nombre, anio } });
  }

  async crearActa(input: CrearActaInput) {
    const materia = await this.prisma.materia.findUnique({ where: { id: input.materiaId } });
    if (!materia) {
      throw new NotFoundException('Materia no encontrada');
    }

    const { alcance, tramoAnio } = await this.determinarAlcance(materia, input.alumnoIds, input.tramoAnio);

    return this.prisma.$transaction(async (tx) => {
      const acta = await tx.acta.create({
        data: {
          libroActasId: input.libroActasId,
          materiaId: input.materiaId,
          fecha: new Date(input.fecha),
          alcance,
          tramoAnio,
        },
      });

      await tx.actaDocente.createMany({
        data: input.docenteIds.map((usuarioId) => ({ actaId: acta.id, usuarioId })),
      });
      await tx.actaAlumno.createMany({
        data: input.alumnoIds.map((alumnoId) => ({ actaId: acta.id, alumnoId })),
      });

      return tx.acta.findUniqueOrThrow({
        where: { id: acta.id },
        include: { docentes: true, alumnos: true },
      });
    });
  }

  private async determinarAlcance(
    materia: { id: string; duracion: DuracionMateria; modalidadAcreditacion: ModalidadAcreditacion | null },
    alumnoIds: string[],
    tramoAnioInput?: number,
  ): Promise<{ alcance: AlcanceActa; tramoAnio: number | null }> {
    const anios = DURACION_A_ANIOS[materia.duracion];

    if (materia.duracion === DuracionMateria.ANUAL) {
      return { alcance: AlcanceActa.CICLO_COMPLETO, tramoAnio: null };
    }

    if (!materia.modalidadAcreditacion) {
      throw new BadRequestException('La materia no tiene una modalidad de acreditación configurada');
    }

    if (materia.modalidadAcreditacion === ModalidadAcreditacion.POR_TRAMO) {
      if (!tramoAnioInput || tramoAnioInput < 1 || tramoAnioInput > anios) {
        throw new BadRequestException(`tramoAnio debe estar entre 1 y ${anios} para esta materia`);
      }
      return { alcance: AlcanceActa.TRAMO, tramoAnio: tramoAnioInput };
    }

    await this.verificarCursadaCompleta(materia.id, alumnoIds, anios);
    return { alcance: AlcanceActa.CICLO_COMPLETO, tramoAnio: null };
  }

  private async verificarCursadaCompleta(materiaId: string, alumnoIds: string[], anios: number) {
    for (const alumnoId of alumnoIds) {
      const cursadas = await this.prisma.cursadaMateria.findMany({
        where: { alumnoId, materiaId },
        select: { anio: true },
      });
      const aniosCursados = new Set(cursadas.map((c) => c.anio));
      const faltantes = Array.from({ length: anios }, (_, i) => i + 1).filter((anio) => !aniosCursados.has(anio));

      if (faltantes.length > 0) {
        throw new BadRequestException(
          `El alumno ${alumnoId} no cursó todos los años del ciclo (faltan: ${faltantes.join(', ')})`,
        );
      }
    }
  }

  registrarCursada(alumnoId: string, materiaId: string, anio: number) {
    return this.prisma.cursadaMateria.upsert({
      where: { alumnoId_materiaId_anio: { alumnoId, materiaId, anio } },
      create: { alumnoId, materiaId, anio },
      update: {},
    });
  }

  async cargarCalificacion(actaId: string, alumnoId: string, nota: number) {
    const acta = await this.prisma.acta.findUnique({ where: { id: actaId } });
    if (!acta) {
      throw new NotFoundException('Acta no encontrada');
    }
    if (acta.estado === EstadoActa.CERRADA) {
      throw new ConflictException('No se puede editar directamente un acta cerrada');
    }

    const actaAlumno = await this.prisma.actaAlumno.findUnique({
      where: { actaId_alumnoId: { actaId, alumnoId } },
    });
    if (!actaAlumno) {
      throw new NotFoundException('El alumno no está inscripto en esta acta');
    }

    const resultado = nota >= NOTA_MINIMA_APROBACION ? ResultadoActaAlumno.APROBADO : ResultadoActaAlumno.DESAPROBADO;

    return this.prisma.actaAlumno.update({
      where: { actaId_alumnoId: { actaId, alumnoId } },
      data: { nota, resultado },
    });
  }

  async cerrarActa(actaId: string) {
    const acta = await this.prisma.acta.findUnique({
      where: { id: actaId },
      include: { alumnos: true },
    });
    if (!acta) {
      throw new NotFoundException('Acta no encontrada');
    }
    if (acta.estado === EstadoActa.CERRADA) {
      throw new ConflictException('El acta ya está cerrada');
    }
    if (acta.alumnos.some((a) => a.nota === null)) {
      throw new BadRequestException('Faltan calificaciones por cargar antes de cerrar el acta');
    }

    return this.prisma.acta.update({
      where: { id: actaId },
      data: { estado: EstadoActa.CERRADA, cerradaAt: new Date() },
    });
  }

  listarPorAlumno(alumnoId: string) {
    return this.prisma.actaAlumno.findMany({
      where: { alumnoId },
      include: { acta: { include: { materia: true } } },
      orderBy: { acta: { fecha: 'asc' } },
    });
  }

  listarPorMateria(materiaId: string) {
    return this.prisma.acta.findMany({
      where: { materiaId },
      include: { alumnos: true },
      orderBy: { fecha: 'asc' },
    });
  }
}
