import { Module } from '@nestjs/common';
import { LegajosAlumnosService } from './legajos-alumnos.service';
import { LegajosAlumnosController } from './legajos-alumnos.controller';

@Module({
  controllers: [LegajosAlumnosController],
  providers: [LegajosAlumnosService],
  exports: [LegajosAlumnosService],
})
export class LegajosAlumnosModule {}
