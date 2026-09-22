import { IsString, IsUUID, MinLength } from 'class-validator';

export class RegistrarPaseEgresoDto {
  @IsUUID()
  alumnoId!: string;

  @IsString()
  @MinLength(1)
  institucionDestino!: string;
}
