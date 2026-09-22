import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Alumno, EstadoPase, TipoPase } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { LegajosAlumnosService } from '../legajos-alumnos/legajos-alumnos.service';
import { CrearLegajoDto } from '../legajos-alumnos/dto/crear-legajo.dto';

interface RegistrarPaseIngresoInput {
  alumnoId?: string;
  datosAlumnoNuevo?: CrearLegajoDto;
  institucionOrigen: string;
  documentacionOrigen: string;
}

@Injectable()
export class PasesEstudiantesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly legajosAlumnosService: LegajosAlumnosService,
  ) {}

  async registrarPaseIngreso(input: RegistrarPaseIngresoInput) {
    let alumnoId: string;
    if (input.alumnoId) {
      const legajo = await this.legajosAlumnosService.obtenerLegajo(input.alumnoId);
      alumnoId = legajo.id;
    } else if (input.datosAlumnoNuevo) {
      const legajo = await this.legajosAlumnosService.crearLegajo(input.datosAlumnoNuevo);
      alumnoId = legajo.id;
    } else {
      throw new BadRequestException('Se requiere alumnoId (legajo existente) o datosAlumnoNuevo (legajo nuevo)');
    }

    return this.prisma.paseEstudiante.create({
      data: {
        tipo: TipoPase.INGRESO,
        alumnoId,
        institucionOrigen: input.institucionOrigen,
        documentacionOrigen: input.documentacionOrigen,
      },
    });
  }

  async registrarPaseEgreso(alumnoId: string, institucionDestino: string) {
    const alumno = await this.legajosAlumnosService.obtenerLegajo(alumnoId);
    const documentacionPase = this.generarDocumentacionPase(alumno, institucionDestino);

    return this.prisma.paseEstudiante.create({
      data: {
        tipo: TipoPase.EGRESO,
        alumnoId,
        institucionDestino,
        documentacionPase,
      },
    });
  }

  private generarDocumentacionPase(alumno: Alumno, institucionDestino: string): string {
    return JSON.stringify({
      alumno: { nombre: alumno.nombre, apellido: alumno.apellido, documento: alumno.documento },
      institucionDestino,
      fechaEmision: new Date().toISOString(),
    });
  }

  async actualizarEstado(paseId: string, estado: EstadoPase) {
    const pase = await this.obtenerPaseOrThrow(paseId);
    return this.prisma.paseEstudiante.update({
      where: { id: paseId },
      data: { estado, completadoAt: estado === EstadoPase.COMPLETO ? new Date() : pase.completadoAt },
    });
  }

  async obtenerPase(paseId: string) {
    const pase = await this.obtenerPaseOrThrow(paseId);
    const documentacionPendiente =
      pase.tipo === TipoPase.INGRESO ? !pase.documentacionOrigen : !pase.documentacionPase;
    return { ...pase, documentacionPendiente };
  }

  private async obtenerPaseOrThrow(paseId: string) {
    const pase = await this.prisma.paseEstudiante.findUnique({ where: { id: paseId } });
    if (!pase) {
      throw new NotFoundException('Pase no encontrado');
    }
    return pase;
  }
}
