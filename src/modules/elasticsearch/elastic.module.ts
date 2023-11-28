import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule } from '../../settings/config.module';
import { AppSettings } from '../../settings/domain/app-settings';
import { Global, Inject, Module, OnModuleInit } from '@nestjs/common';
import { CreateIndexUseCase } from './use-cases/create-index.useCase';
import { ElasticAdapter } from './adapters/elastic.adapter';

@Global()
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (appSettings: AppSettings) => ({
        node: appSettings.elastic.ELASTICSEARCH_NODE,
        maxRetries: 10,
        requestTimeout: 60000,
        auth: {
          password: appSettings.elastic.ELASTICSEARCH_PASSWORD,
          username: appSettings.elastic.ELASTICSEARCH_USERNAME,
        },
      }),
      inject: [AppSettings.name],
    }),
  ],
  providers: [ElasticAdapter, CreateIndexUseCase],
  exports: [ElasticAdapter, ElasticsearchModule],
})
export class ElasticModule implements OnModuleInit {
  constructor(
    private readonly createIndexUseCase: CreateIndexUseCase,
    @Inject(AppSettings.name) private readonly appSettings: AppSettings,
  ) {}
  async onModuleInit() {
    if (!this.appSettings.env.isDevelopment()) {
      await this.createIndexUseCase.execute();
    } else {
      await this.createIndexUseCase.execute();
    }
  }
}
