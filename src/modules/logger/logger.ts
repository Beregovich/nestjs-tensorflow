import * as winston from 'winston';
import { AsyncLocalStorage } from 'async_hooks';
import { Inject } from '@nestjs/common';
import { AppSettings } from '../../settings/app-settings';

const customLevels = {
  levels: {
    trace: 5,
    debug: 4,
    info: 3,
    warn: 2,
    error: 1,
    fatal: 0,
  },
};

export class Logger {
  private logger: winston.Logger;
  private sourceName: string;
  constructor(
    private readonly serviceName: string,
    private readonly asyncLocalStorage: AsyncLocalStorage<Map<string, string>>,
    @Inject(AppSettings.name) private readonly appSettings: AppSettings,
  ) {
    const transport = new winston.transports.Http({
      host: appSettings.logger.HOST,
      path: appSettings.logger.URL_PATH,
      //headers: { 'friend-token': appSettings.api.FRIEND_TOKEN },
      ssl: true,
    });

    this.logger = winston.createLogger({
      format: winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      level: 'trace',
      levels: customLevels.levels,
      transports: [transport],
      defaultMeta: { serviceName },
    });
  }

  setSourceName(name: string) {
    this.sourceName = name;
  }

  private getRequestId(): string {
    return this.asyncLocalStorage.getStore()?.get('requestId');
  }

  trace(msg: string, functionName: string) {
    const requestId = this.getRequestId();
    this.logger.log('trace', msg, {
      functionName,
      sourceName: this.sourceName,
      requestId,
    });
  }

  debug(msg: string, functionName: string) {
    const requestId = this.getRequestId();
    this.logger.debug(msg, {
      functionName,
      sourceName: this.sourceName,
      requestId,
    });
  }

  info(msg: string, functionName: string) {
    try {
      const requestId = this.getRequestId();
      this.logger.info(msg, {
        functionName,
        sourceName: this.sourceName,
        requestId,
      });
    } catch (e) {
      console.log('Logger error: ' + e);
    }
  }

  warn(msg: string, functionName: string) {
    const requestId = this.getRequestId();
    this.logger.warn(msg, {
      functionName,
      sourceName: this.sourceName,
      requestId,
    });
  }

  error(msg: string, functionName: string) {
    const requestId = this.getRequestId();
    this.logger.error(msg, { functionName, sourceName: this.sourceName });
  }

  fatal(msg: string, functionName: string) {
    const requestId = this.getRequestId();
    this.logger.log('fatal', msg, {
      functionName,
      sourceName: this.sourceName,
      requestId,
    });
  }
}
