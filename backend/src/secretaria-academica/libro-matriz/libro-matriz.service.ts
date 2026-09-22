import { ConflictException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class LibroMatrizService {
  constructor(private readonly prisma: PrismaService) {}

  async inscribir(libro: string, anio: number, alumnoId: string) {
    const claveUnicidadActiva = `${alumnoId}:${anio}`;

    try {
      return await this.prisma.$transaction(async (tx) => {
        const ultima = await tx.inscripcionLibroMatriz.findFirst({
          where: { libro, anio },
          orderBy: { numeroCorrelativo: 'desc' },
        });
        const numeroCorrelativo = (ultima?.numeroCorrelativo ?? 0) + 1;

        return tx.inscripcionLibroMatriz.create({
          data: { libro, anio, numeroCorrelativo, alumnoId, claveUnicidadActiva },
        });
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002' &&
        (error.meta?.target as string[] | undefined)?.includes('claveUnicidadActiva')
      ) {
        throw new ConflictException(
          `El alumno ya tiene una inscripción activa en el libro matriz para el período ${anio}`,
        );
      }
      throw error;
    }
  }

  async desactivar(id: string) {
    return this.prisma.inscripcionLibroMatriz.update({
      where: { id },
      data: { activa: false, claveUnicidadActiva: null },
    });
  }

  async listarPorLibroYAnio(libro: string, anio: number) {
    return this.prisma.inscripcionLibroMatriz.findMany({
      where: { libro, anio },
      orderBy: { numeroCorrelativo: 'asc' },
      include: { alumno: { select: { id: true, nombre: true, apellido: true, documento: true } } },
    });
  }
}
