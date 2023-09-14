import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { SettingsModule } from './settings/settings.module';
import { FaqModule } from './modules/faq/faq.module';

@Module({
  imports: [DatabaseModule, SettingsModule, FaqModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
