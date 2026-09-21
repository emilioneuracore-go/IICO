import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from '../../identity/guards/jwt-auth.guard';
import { RolesGuard } from '../../identity/guards/roles.guard';
import { Roles } from '../../identity/decorators/roles.decorator';
import { RequestUser } from '../../identity/guards/jwt-auth.guard';
import { AuditService } from '../../identity/audit/audit.service';
import { LegajosAlumnosService } from './legajos-alumnos.service';
import { CrearLegajoDto } from './dto/crear-legajo.dto';
import { ActualizarLegajoDto } from './dto/actualizar-legajo.dto';
import { AgregarResponsableDto } from './dto/agregar-responsable.dto';

const ROLES_SECRETARIA = ['SecretariaAcademica', 'Direccion'];

@Controller('legajos-alumnos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class LegajosAlumnosController {
  constructor(
    private readonly legajosService: LegajosAlumnosService,
    private readonly auditService: AuditService,
  ) {}

  @Post()
  @Roles(...ROLES_SECRETARIA)
  crear(@Body() dto: CrearLegajoDto) {
    return this.legajosService.crearLegajo(dto);
  }

  @Get(':id')
  @Roles(...ROLES_SECRETARIA)
  async obtener(@Param('id') id: string, @Req() req: Request & { user: RequestUser }) {
    const legajo = await this.legajosService.obtenerLegajo(id);
    await this.auditService.registrar(req.user.id, 'CONSULTA_LEGAJO', 'Alumno', id);
    return legajo;
  }

  @Patch(':id')
  @Roles(...ROLES_SECRETARIA)
  async actualizar(
    @Param('id') id: string,
    @Body() dto: ActualizarLegajoDto,
    @Req() req: Request & { user: RequestUser },
  ) {
    const actualizado = await this.legajosService.actualizarLegajo(id, dto, req.user.id);
    await this.auditService.registrar(req.user.id, 'EDICION_LEGAJO', 'Alumno', id);
    return actualizado;
  }

  @Post(':id/responsables')
  @Roles(...ROLES_SECRETARIA)
  agregarResponsable(@Param('id') id: string, @Body() dto: AgregarResponsableDto) {
    return this.legajosService.agregarResponsable(id, dto);
  }
}
