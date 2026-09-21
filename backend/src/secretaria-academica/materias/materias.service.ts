import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DuracionMateria, EscalaCalificacion, ModalidadAcreditacion } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MateriasService {
  constructor(private readonly prisma: PrismaService) {}

  crearMateria(nombre: string, duracion: DuracionMateria = DuracionMateria.ANUAL) {
    return this.prisma.materia.create({ data: { nombre, duracion } });
  }

  async configurarModalidadAcreditacion(materiaId: string, modalidad: ModalidadAcreditacion) {
    const materia = await this.obtenerMateriaOrThrow(materiaId);
    if (materia.duracion === DuracionMateria.ANUAL) {
      throw new BadRequestException('La modalidad de acreditación solo aplica a materias bianuales o trianuales');
    }
    return this.prisma.materia.update({
      where: { id: materiaId },
      data: { modalidadAcreditacion: modalidad },
    });
  }

  async configurarEscalas(
    materiaId: string,
    escalaEtapaIntermedia: EscalaCalificacion,
    escalaCierre: EscalaCalificacion,
  ) {
    await this.obtenerMateriaOrThrow(materiaId);
    return this.prisma.materia.update({
      where: { id: materiaId },
      data: { escalaEtapaIntermedia, escalaCierre },
    });
  }

  async agregarArea(materiaId: string, nombreArea: string, docenteUsuarioId?: string) {
    await this.obtenerMateriaOrThrow(materiaId);
    return this.prisma.materiaArea.create({
      data: { materiaId, nombre: nombreArea, docenteUsuarioId },
    });
  }

  async vincularProyectoIntegrado(materiaAId: string, materiaBId: string) {
    if (materiaAId === materiaBId) {
      throw new BadRequestException('Una materia no puede vincularse consigo misma');
    }
    await this.obtenerMateriaOrThrow(materiaAId);
    await this.obtenerMateriaOrThrow(materiaBId);
    return this.prisma.materiaVinculo.create({ data: { materiaAId, materiaBId } });
  }

  async obtenerMateria(id: string) {
    return this.prisma.materia.findUnique({
      where: { id },
      include: { areas: true, vinculosComoA: true, vinculosComoB: true },
    });
  }

  private async obtenerMateriaOrThrow(id: string) {
    const materia = await this.prisma.materia.findUnique({ where: { id } });
    if (!materia) {
      throw new NotFoundException('Materia no encontrada');
    }
    return materia;
  }
}
