import { IsInt, IsUUID, Min } from 'class-validator';

export class RegistrarCursadaDto {
  @IsUUID()
  alumnoId!: string;

  @IsUUID()
  materiaId!: string;

  @IsInt()
  @Min(1)
  anio!: number;
}
