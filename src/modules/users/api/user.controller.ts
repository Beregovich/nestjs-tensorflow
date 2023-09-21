import { Controller, Get, Param, Post } from '@nestjs/common';
import { UserRepository } from '../db/user.repository';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}
  @Post('/:name')
  async createFaq(@Param('name') name: string) {
    const user = User.create(name);
    return this.userRepository.save(user);
  }
  @Get('/:id')
  async findUser(@Param('id') id: number) {
    return this.userRepository.findUser(id);
  }
}
