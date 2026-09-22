import { IsInt, IsString, IsUUID, Min, MinLength } from 'class-validator';

export class InscribirDto {
  @IsString()
  @MinLength(1)
  libro!: string;

  @IsInt()
  @Min(2000)
  anio!: number;

  @IsUUID()
  alumnoId!: string;
}
