import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../identity/guards/jwt-auth.guard';
import { RolesGuard } from '../../identity/guards/roles.guard';
import { Roles } from '../../identity/decorators/roles.decorator';
import { MateriasService } from './materias.service';
import { CrearMateriaDto } from './dto/crear-materia.dto';

@Controller('materias')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MateriasController {
  constructor(private readonly materiasService: MateriasService) {}

  @Post()
  @Roles('SecretariaAcademica', 'Direccion')
  crear(@Body() dto: CrearMateriaDto) {
    return this.materiasService.crearMateria(dto.nombre, dto.duracion);
  }

  @Get(':id')
  @Roles('SecretariaAcademica', 'Direccion', 'Docente')
  obtener(@Param('id') id: string) {
    return this.materiasService.obtenerMateria(id);
  }
}
