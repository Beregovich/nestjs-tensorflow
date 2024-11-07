import { DynamicModule, Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CasbinService } from './services/casbin.service';
import { CasbinController } from './controllers/casbin.controller';

@Global()
@Module({})
export class CasbinModule {
  static register(options: CasbinModuleOptions): DynamicModule {
    return {
      global: true,
      module: CasbinModule,
      imports: [
        HttpModule.register({
          baseURL: options.casbinRoleServiceUrl,
          headers: {
            'FRIEND-TOKEN': options.friendToken,
          },
        }),
      ],
      controllers: [CasbinController],
      providers: [CasbinService],
      exports: [CasbinService],
    };
  }
}

// TYPES

export interface CasbinModuleOptions {
  friendToken: string;
  casbinRoleServiceUrl: string;
}
