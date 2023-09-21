import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { SettingsModule } from './settings/settings.module';
import { FaqModule } from './modules/faq/faq.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [DatabaseModule, SettingsModule, FaqModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
