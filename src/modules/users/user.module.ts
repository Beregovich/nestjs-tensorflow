import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './db/user.repository';
import { UserController } from './api/user.controller';
import { TelegramUser } from './entities/telegram-user.entity';

const repositories = [UserRepository];

const useCases = [];
@Module({
  imports: [TypeOrmModule, TypeOrmModule.forFeature([User, TelegramUser])],
  controllers: [UserController],
  providers: [...useCases, ...repositories],
  exports: [],
})
export class UserModule {}
