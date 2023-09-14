import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [DatabaseModule, SettingsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
