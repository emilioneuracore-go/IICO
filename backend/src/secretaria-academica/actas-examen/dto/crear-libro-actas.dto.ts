import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class CrearLibroActasDto {
  @IsString()
  @MinLength(1)
  nombre!: string;

  @IsInt()
  @Min(2000)
  anio!: number;
}
