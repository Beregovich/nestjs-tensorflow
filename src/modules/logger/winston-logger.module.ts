import { Global, Module, Scope } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Logger } from './logger';
import { AppSettings } from '../../settings/app-settings';
import { ConfigModule } from '../../settings/config.module';

const asyncLocalStorage = new AsyncLocalStorage();

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: 'Logger',
      useFactory: (
        asyncLocalStorage: AsyncLocalStorage<Map<string, string>>,
        appSettings: AppSettings,
      ) =>
        new Logger(
          'zoom_youtube_vimeo_integrator',
          asyncLocalStorage,
          appSettings,
        ),
      scope: Scope.TRANSIENT,
      inject: ['AsyncStorage', AppSettings.name],
    },
    {
      provide: 'AsyncStorage',
      useValue: asyncLocalStorage,
    },
  ],
  exports: ['Logger'],
})
export class WinstonLoggerModule {}
