import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegramBot } from './entities/telegram-bot.entity';

const repositories = [];

const useCases = [];
@Module({
  imports: [TypeOrmModule],
  controllers: [],
  providers: [...useCases, ...repositories, TelegramBot],
  exports: [],
})
export class TelegramModule {}
