import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  login: string;
  firstName: string | null;
  lastName: string | null;
  @IsNotEmpty()
  @IsNumber()
  telegramId: number;
}
