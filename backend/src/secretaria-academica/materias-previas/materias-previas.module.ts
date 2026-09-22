import { Module } from '@nestjs/common';
import { MateriasPreviasService } from './materias-previas.service';
import { MateriasPreviasController } from './materias-previas.controller';
import { ActasExamenModule } from '../actas-examen/actas-examen.module';

@Module({
  imports: [ActasExamenModule],
  controllers: [MateriasPreviasController],
  providers: [MateriasPreviasService],
  exports: [MateriasPreviasService],
})
export class MateriasPreviasModule {}
