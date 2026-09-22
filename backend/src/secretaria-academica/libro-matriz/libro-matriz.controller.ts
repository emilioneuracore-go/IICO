import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../identity/guards/jwt-auth.guard';
import { RolesGuard } from '../../identity/guards/roles.guard';
import { Roles } from '../../identity/decorators/roles.decorator';
import { LibroMatrizService } from './libro-matriz.service';
import { InscribirDto } from './dto/inscribir.dto';

@Controller('libro-matriz')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SecretariaAcademica', 'Direccion')
export class LibroMatrizController {
  constructor(private readonly libroMatrizService: LibroMatrizService) {}

  @Post('inscripciones')
  inscribir(@Body() dto: InscribirDto) {
    return this.libroMatrizService.inscribir(dto.libro, dto.anio, dto.alumnoId);
  }

  @Get('inscripciones')
  listar(@Query('libro') libro: string, @Query('anio') anio: string) {
    return this.libroMatrizService.listarPorLibroYAnio(libro, Number(anio));
  }
}
