import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { RolesService } from './roles.service';

@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  @Roles('Direccion', 'SecretariaAcademica')
  listar() {
    return this.rolesService.listarRoles();
  }

  @Post()
  @Roles('Direccion', 'SecretariaAcademica')
  crear(@Body('nombre') nombre: string) {
    return this.rolesService.crearRol(nombre);
  }
}
