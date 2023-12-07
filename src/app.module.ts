import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { FaqModule } from './modules/faq/faq.module';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from './settings/config.module';

@Module({
  imports: [DatabaseModule, ConfigModule, FaqModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
