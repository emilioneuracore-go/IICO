import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { VinculoResponsable } from '@prisma/client';

export class AgregarResponsableDto {
  @IsString()
  @MinLength(1)
  nombre!: string;

  @IsString()
  @MinLength(1)
  apellido!: string;

  @IsEnum(VinculoResponsable)
  vinculo!: VinculoResponsable;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
