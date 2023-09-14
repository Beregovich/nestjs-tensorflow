import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNumber, IsString, Length } from 'class-validator';
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
  @ApiProperty({ required: true })
  @Type(() => Number)
  @IsArray()
  @IsNumber({}, { each: true })
  forCourses: number[];
}
