import { IsInt, Min } from 'class-validator';

export class ActualizarTopeDto {
  @IsInt()
  @Min(0)
  tope!: number;
}
