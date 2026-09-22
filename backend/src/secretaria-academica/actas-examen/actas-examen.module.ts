import { Module } from '@nestjs/common';
import { ActasExamenService } from './actas-examen.service';
import { ActasExamenController } from './actas-examen.controller';

@Module({
  controllers: [ActasExamenController],
  providers: [ActasExamenService],
  exports: [ActasExamenService],
})
export class ActasExamenModule {}
