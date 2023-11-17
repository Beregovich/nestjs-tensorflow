import { Module } from '@nestjs/common';
import { TelegramBot } from './models/telegram.bot';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppSettings } from '../../settings/app-settings';

const repositories = [];

const useCases = [];
@Module({
  imports: [
    TypeOrmModule,
    // TelegrafModule.forRootAsync({
    //   useFactory: (appSettings: AppSettings) => ({
    //     botName: appSettings.telegram.botName,
    //   }),
    //   inject: [AppSettings.name],
    // }),
  ],
  controllers: [],
  providers: [...useCases, ...repositories, TelegramBot],
  exports: [],
})
export class BotsModule {}
