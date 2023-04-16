import { Module } from '@nestjs/common';
import {VideoModule} from "./modules/video/video.module";

@Module({
  imports: [VideoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
