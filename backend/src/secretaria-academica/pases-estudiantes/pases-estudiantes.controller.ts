import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../identity/guards/jwt-auth.guard';
import { RolesGuard } from '../../identity/guards/roles.guard';
import { Roles } from '../../identity/decorators/roles.decorator';
import { PasesEstudiantesService } from './pases-estudiantes.service';
import { RegistrarPaseIngresoDto } from './dto/registrar-pase-ingreso.dto';
import { RegistrarPaseEgresoDto } from './dto/registrar-pase-egreso.dto';
import { ActualizarEstadoPaseDto } from './dto/actualizar-estado-pase.dto';

@Controller('pases-estudiantes')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SecretariaAcademica', 'Direccion')
export class PasesEstudiantesController {
  constructor(private readonly pasesEstudiantesService: PasesEstudiantesService) {}

  @Post('ingresos')
  registrarIngreso(@Body() dto: RegistrarPaseIngresoDto) {
    return this.pasesEstudiantesService.registrarPaseIngreso(dto);
  }

  @Post('egresos')
  registrarEgreso(@Body() dto: RegistrarPaseEgresoDto) {
    return this.pasesEstudiantesService.registrarPaseEgreso(dto.alumnoId, dto.institucionDestino);
  }

  @Patch(':paseId/estado')
  actualizarEstado(@Param('paseId') paseId: string, @Body() dto: ActualizarEstadoPaseDto) {
    return this.pasesEstudiantesService.actualizarEstado(paseId, dto.estado);
  }

  @Get(':paseId')
  obtener(@Param('paseId') paseId: string) {
    return this.pasesEstudiantesService.obtenerPase(paseId);
  }
}
