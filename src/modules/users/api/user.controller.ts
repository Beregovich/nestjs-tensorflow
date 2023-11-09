import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserRepository } from '../db/user.repository';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}
  @Post('/')
  async createUser(@Body() dto: CreateUserDto) {
    const user = User.create(dto);
    return this.userRepository.save(user);
  }
  @Get('/:id')
  async findUser(@Param('id') id: number) {
    return this.userRepository.findUser(id);
  }
}
