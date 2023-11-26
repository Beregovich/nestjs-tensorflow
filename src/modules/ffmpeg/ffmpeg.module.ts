import { Module } from '@nestjs/common';
import { FfmpegService } from './services/ffmpeg.service';

@Module({
  imports: [],
  controllers: [],
  providers: [FfmpegService],
  exports: [FfmpegService],
})
export class FfmpegModule {}
