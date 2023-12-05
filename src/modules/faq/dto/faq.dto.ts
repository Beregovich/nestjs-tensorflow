import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class FaqDto {
  @ApiProperty({ required: true })
  @IsString()
  @Length(10, 500)
  title: string;
  @ApiProperty({ required: true })
  @IsString()
  @Length(10, 10000)
  content: string;
  @ApiProperty({ required: true })
  @Type(() => Number)
  @IsInt()
  priority: number;
  @Type(() => Number)
  userId: number;
}
