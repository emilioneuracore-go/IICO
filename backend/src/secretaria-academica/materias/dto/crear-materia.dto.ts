import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { DuracionMateria } from '@prisma/client';

export class CrearMateriaDto {
  @IsString()
  @MinLength(1)
  nombre!: string;

  @IsOptional()
  @IsEnum(DuracionMateria)
  duracion?: DuracionMateria;
}
