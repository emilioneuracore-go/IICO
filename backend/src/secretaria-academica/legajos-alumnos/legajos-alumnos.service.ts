import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CrearLegajoDto } from './dto/crear-legajo.dto';
import { ActualizarLegajoDto } from './dto/actualizar-legajo.dto';
import { AgregarResponsableDto } from './dto/agregar-responsable.dto';

@Injectable()
export class LegajosAlumnosService {
  constructor(private readonly prisma: PrismaService) {}

  async crearLegajo(dto: CrearLegajoDto) {
    const existente = await this.prisma.alumno.findUnique({ where: { documento: dto.documento } });
    if (existente) {
      throw new ConflictException('Ya existe un legajo con ese documento');
    }
    return this.prisma.alumno.create({
      data: {
        nombre: dto.nombre,
        apellido: dto.apellido,
        documento: dto.documento,
        fechaNacimiento: new Date(dto.fechaNacimiento),
        domicilio: dto.domicilio,
        telefono: dto.telefono,
      },
    });
  }

  async actualizarLegajo(id: string, dto: ActualizarLegajoDto, usuarioId: string) {
    const alumno = await this.obtenerLegajoOrThrow(id);

    const cambios: { campo: string; valorAnterior: string | null; valorNuevo: string | null }[] = [];
    (['domicilio', 'telefono'] as const).forEach((campo) => {
      if (dto[campo] !== undefined && dto[campo] !== alumno[campo]) {
        cambios.push({ campo, valorAnterior: alumno[campo] ?? null, valorNuevo: dto[campo] ?? null });
      }
    });

    if (cambios.length === 0) {
      return alumno;
    }

    const [actualizado] = await this.prisma.$transaction([
      this.prisma.alumno.update({ where: { id }, data: dto }),
      ...cambios.map((cambio) =>
        this.prisma.legajoHistorialCambio.create({
          data: { alumnoId: id, usuarioId, ...cambio },
        }),
      ),
    ]);

    return actualizado;
  }

  async agregarResponsable(alumnoId: string, dto: AgregarResponsableDto) {
    await this.obtenerLegajoOrThrow(alumnoId);
    const responsable = await this.prisma.responsable.create({
      data: { nombre: dto.nombre, apellido: dto.apellido, telefono: dto.telefono, email: dto.email },
    });
    return this.prisma.alumnoResponsable.create({
      data: { alumnoId, responsableId: responsable.id, vinculo: dto.vinculo },
      include: { responsable: true },
    });
  }

  async obtenerLegajo(id: string) {
    return this.obtenerLegajoOrThrow(id);
  }

  async obtenerHistorialCambios(alumnoId: string) {
    return this.prisma.legajoHistorialCambio.findMany({
      where: { alumnoId },
      orderBy: { fecha: 'asc' },
    });
  }

  private async obtenerLegajoOrThrow(id: string) {
    const alumno = await this.prisma.alumno.findUnique({
      where: { id },
      include: { responsables: { include: { responsable: true } } },
    });
    if (!alumno) {
      throw new NotFoundException('Legajo no encontrado');
    }
    return alumno;
  }
}
