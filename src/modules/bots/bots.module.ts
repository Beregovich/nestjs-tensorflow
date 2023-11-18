import { Module } from '@nestjs/common';
import { TelegramBot } from './models/telegram.bot';
import { TypeOrmModule } from '@nestjs/typeorm';

const repositories = [];

const useCases = [];
@Module({
  imports: [TypeOrmModule],
  controllers: [],
  providers: [...useCases, ...repositories, TelegramBot],
  exports: [],
})
export class BotsModule {}
