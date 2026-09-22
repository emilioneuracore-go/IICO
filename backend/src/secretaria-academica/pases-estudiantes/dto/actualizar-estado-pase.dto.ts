import { IsEnum } from 'class-validator';
import { EstadoPase } from '@prisma/client';

export class ActualizarEstadoPaseDto {
  @IsEnum(EstadoPase)
  estado!: EstadoPase;
}
