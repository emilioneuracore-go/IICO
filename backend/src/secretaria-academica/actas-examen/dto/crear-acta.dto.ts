import { ArrayMinSize, IsDateString, IsInt, IsOptional, IsUUID, Min } from 'class-validator';

export class CrearActaDto {
  @IsUUID()
  libroActasId!: string;

  @IsUUID()
  materiaId!: string;

  @IsDateString()
  fecha!: string;

  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  docenteIds!: string[];

  @IsUUID('4', { each: true })
  @ArrayMinSize(1)
  alumnoIds!: string[];

  // Año del ciclo evaluado (1..duración de la materia). Requerido solo
  // cuando la materia es plurianual y su modalidad es "por tramo".
  @IsOptional()
  @IsInt()
  @Min(1)
  tramoAnio?: number;
}
