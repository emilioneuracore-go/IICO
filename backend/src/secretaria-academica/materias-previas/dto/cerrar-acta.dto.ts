import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { PlanAcompanamientoInputDto } from './plan-acompanamiento-input.dto';

export class CerrarActaDto {
  // Planes de acompañamiento a asociar, para los alumnos del acta cuya
  // materia adeudada resultante sea la tercera (ver requirement "Plan de
  // acompañamiento obligatorio para la tercera materia adeudada").
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PlanAcompanamientoInputDto)
  planes?: PlanAcompanamientoInputDto[];
}
