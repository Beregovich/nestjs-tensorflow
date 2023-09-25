import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './db/user.repository';
import { UserController } from './api/user.controller';

const repositories = [UserRepository];

const useCases = [];
@Module({
  imports: [TypeOrmModule, TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [...useCases, ...repositories],
  exports: [],
})
export class UserModule {}
