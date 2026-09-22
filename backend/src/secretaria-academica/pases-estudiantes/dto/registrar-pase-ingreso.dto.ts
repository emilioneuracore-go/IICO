import { Type } from 'class-transformer';
import { IsOptional, IsString, IsUUID, MinLength, ValidateNested } from 'class-validator';
import { CrearLegajoDto } from '../../legajos-alumnos/dto/crear-legajo.dto';

export class RegistrarPaseIngresoDto {
  // Provisto cuando el pase vincula un legajo ya existente.
  @IsOptional()
  @IsUUID()
  alumnoId?: string;

  // Provisto cuando el pase crea un legajo nuevo (se requiere alumnoId o
  // datosAlumnoNuevo, no ambos).
  @IsOptional()
  @ValidateNested()
  @Type(() => CrearLegajoDto)
  datosAlumnoNuevo?: CrearLegajoDto;

  @IsString()
  @MinLength(1)
  institucionOrigen!: string;

  @IsString()
  @MinLength(1)
  documentacionOrigen!: string;
}
