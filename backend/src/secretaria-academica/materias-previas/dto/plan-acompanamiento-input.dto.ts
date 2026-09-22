import { IsString, IsUUID, MinLength } from 'class-validator';

export class PlanAcompanamientoInputDto {
  @IsUUID()
  alumnoId!: string;

  @IsUUID()
  docenteResponsableId!: string;

  @IsString()
  @MinLength(1)
  modalidad!: string;
}
