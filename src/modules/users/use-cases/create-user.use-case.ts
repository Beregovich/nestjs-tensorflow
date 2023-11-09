import { CreateUserDto } from '../dto/create-user.dto';
import { CommandHandler } from '@nestjs/cqrs';

export class CreateUserCommand {
  constructor(readonly createUserDto: CreateUserDto) {}
}

@CommandHandler(CreateUserCommand)
export class CreateUserUseCase {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async execute(command: CreateUserCommand) {}
}
