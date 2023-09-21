import { TypeOrmModule } from '@nestjs/typeorm';
import { AppSettings } from '../../settings/app-settings';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (appSettings: AppSettings) => ({
        type: 'postgres' as const,
        host: appSettings.database.POSTGRES_HOST,
        port: appSettings.database.POSTGRES_PORT,
        username: appSettings.database.POSTGRES_USER,
        password: appSettings.database.POSTGRES_PASSWORD,
        database: appSettings.database.POSTGRES_DATABASE,
        autoLoadEntities: true,
        synchronize: true,
        ssl: { rejectUnauthorized: false },
      }),
      inject: [AppSettings.name],
    }),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
