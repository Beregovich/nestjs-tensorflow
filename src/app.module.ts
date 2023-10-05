import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { SettingsModule } from './settings/settings.module';
import { FaqModule } from './modules/faq/faq.module';
import { UserModule } from './modules/users/user.module';
import { LessonsModule } from './modules/lessons/lessons.module';

@Module({
  imports: [
    DatabaseModule,
    SettingsModule,
    FaqModule,
    UserModule,
    LessonsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
