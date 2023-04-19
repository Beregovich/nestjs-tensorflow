import { Module } from '@nestjs/common';
import { ConfigModule } from './settings/config.module';
import { VideoModule } from './modules/video/video.module';

@Module({
  imports: [ConfigModule, VideoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
