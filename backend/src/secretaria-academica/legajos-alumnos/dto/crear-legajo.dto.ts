import { IsDateString, IsOptional, IsString, MinLength } from 'class-validator';

export class CrearLegajoDto {
  @IsString()
  @MinLength(1)
  nombre!: string;

  @IsString()
  @MinLength(1)
  apellido!: string;

  @IsString()
  @MinLength(1)
  documento!: string;

  @IsDateString()
  fechaNacimiento!: string;

  @IsOptional()
  @IsString()
  domicilio?: string;

  @IsOptional()
  @IsString()
  telefono?: string;
}
