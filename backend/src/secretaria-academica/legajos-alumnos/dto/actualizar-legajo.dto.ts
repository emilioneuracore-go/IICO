import { IsOptional, IsString } from 'class-validator';

export class ActualizarLegajoDto {
  @IsOptional()
  @IsString()
  domicilio?: string;

  @IsOptional()
  @IsString()
  telefono?: string;
}
