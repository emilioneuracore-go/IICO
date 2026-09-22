import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../identity/guards/jwt-auth.guard';
import { RolesGuard } from '../../identity/guards/roles.guard';
import { Roles } from '../../identity/decorators/roles.decorator';
import { ActasExamenService } from './actas-examen.service';
import { CrearLibroActasDto } from './dto/crear-libro-actas.dto';
import { CrearActaDto } from './dto/crear-acta.dto';
import { CargarCalificacionDto } from './dto/cargar-calificacion.dto';
import { RegistrarCursadaDto } from './dto/registrar-cursada.dto';

@Controller('actas-examen')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SecretariaAcademica', 'Direccion')
export class ActasExamenController {
  constructor(private readonly actasExamenService: ActasExamenService) {}

  @Post('libros')
  crearLibroActas(@Body() dto: CrearLibroActasDto) {
    return this.actasExamenService.crearLibroActas(dto.nombre, dto.anio);
  }

  @Post('cursadas')
  registrarCursada(@Body() dto: RegistrarCursadaDto) {
    return this.actasExamenService.registrarCursada(dto.alumnoId, dto.materiaId, dto.anio);
  }

  @Post('actas')
  crearActa(@Body() dto: CrearActaDto) {
    return this.actasExamenService.crearActa(dto);
  }

  @Patch('actas/:actaId/alumnos/:alumnoId')
  cargarCalificacion(
    @Param('actaId') actaId: string,
    @Param('alumnoId') alumnoId: string,
    @Body() dto: CargarCalificacionDto,
  ) {
    return this.actasExamenService.cargarCalificacion(actaId, alumnoId, dto.nota);
  }

  @Post('actas/:actaId/cerrar')
  cerrarActa(@Param('actaId') actaId: string) {
    return this.actasExamenService.cerrarActa(actaId);
  }

  @Get('historial/alumno/:alumnoId')
  historialPorAlumno(@Param('alumnoId') alumnoId: string) {
    return this.actasExamenService.listarPorAlumno(alumnoId);
  }

  @Get('historial/materia/:materiaId')
  historialPorMateria(@Param('materiaId') materiaId: string) {
    return this.actasExamenService.listarPorMateria(materiaId);
  }
}
