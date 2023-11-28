import { Inject, Injectable } from '@nestjs/common';
import { AppSettings } from '../../../settings/domain/app-settings';
import Logger from '../../logger/logger';
import { ElasticAdapter } from '../adapters/elastic.adapter';

@Injectable()
export class CreateIndexUseCase {
  index: string;
  constructor(
    private readonly elasticAdapter: ElasticAdapter,
    @Inject(AppSettings.name) private readonly appSettings: AppSettings,
    @Inject('Logger') private readonly logger: Logger,
  ) {
    this.index = appSettings.elastic.ELASTICSEARCH_INDEX;
    this.logger.setSourceName(CreateIndexUseCase.name);
  }
  async execute() {
    try {
      return this.elasticAdapter.checkAndCreateIndexIfNotExist(this.index);
    } catch (err) {
      console.log(JSON.stringify(err));
      this.logger.error(JSON.stringify(err), 'execute');
    }
  }
}
