import { Module } from '@nestjs/common';
import { LibroMatrizService } from './libro-matriz.service';
import { LibroMatrizController } from './libro-matriz.controller';

@Module({
  controllers: [LibroMatrizController],
  providers: [LibroMatrizService],
  exports: [LibroMatrizService],
})
export class LibroMatrizModule {}
