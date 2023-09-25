import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async save(user: User) {
    return this.userRepository.save(user);
  }

  async findUser(id: number) {
    return this.userRepository.find({ relations: { faq: true } });
  }
}
