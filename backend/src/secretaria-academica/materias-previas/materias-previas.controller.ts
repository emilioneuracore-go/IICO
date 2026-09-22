import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../identity/guards/jwt-auth.guard';
import { RolesGuard } from '../../identity/guards/roles.guard';
import { Roles } from '../../identity/decorators/roles.decorator';
import { MateriasPreviasService } from './materias-previas.service';
import { CerrarActaDto } from './dto/cerrar-acta.dto';
import { ActualizarTopeDto } from './dto/actualizar-tope.dto';

@Controller('materias-previas')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SecretariaAcademica', 'Direccion')
export class MateriasPreviasController {
  constructor(private readonly materiasPreviasService: MateriasPreviasService) {}

  @Post('actas/:actaId/cerrar')
  cerrarActa(@Param('actaId') actaId: string, @Body() dto: CerrarActaDto) {
    return this.materiasPreviasService.cerrarActaYSincronizar(actaId, dto.planes ?? []);
  }

  @Get('alumnos/:alumnoId')
  listar(@Param('alumnoId') alumnoId: string) {
    return this.materiasPreviasService.listarMateriasAdeudadas(alumnoId);
  }

  @Get('alumnos/:alumnoId/habilitacion')
  habilitacion(@Param('alumnoId') alumnoId: string) {
    return this.materiasPreviasService.evaluarHabilitacionPromocion(alumnoId);
  }

  @Post('configuracion/tope')
  actualizarTope(@Body() dto: ActualizarTopeDto) {
    return this.materiasPreviasService.actualizarTopeMateriasAdeudadas(dto.tope);
  }
}
