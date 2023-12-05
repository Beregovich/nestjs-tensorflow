import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PermissionsDto {
  @ApiProperty({ required: true })
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  coursesIds: number[];
}
