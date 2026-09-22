import { IsInt, Max, Min } from 'class-validator';

export class CargarCalificacionDto {
  @IsInt()
  @Min(1)
  @Max(10)
  nota!: number;
}
