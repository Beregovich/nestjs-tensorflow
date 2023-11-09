import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nickName: string;
  firstName: string | null;
  lastName: string | null;
  @IsNumber()
  telegramId: number;
}
