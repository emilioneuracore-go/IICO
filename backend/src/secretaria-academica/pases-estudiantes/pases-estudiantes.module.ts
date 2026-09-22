import { Module } from '@nestjs/common';
import { PasesEstudiantesService } from './pases-estudiantes.service';
import { PasesEstudiantesController } from './pases-estudiantes.controller';
import { LegajosAlumnosModule } from '../legajos-alumnos/legajos-alumnos.module';

@Module({
  imports: [LegajosAlumnosModule],
  controllers: [PasesEstudiantesController],
  providers: [PasesEstudiantesService],
  exports: [PasesEstudiantesService],
})
export class PasesEstudiantesModule {}
