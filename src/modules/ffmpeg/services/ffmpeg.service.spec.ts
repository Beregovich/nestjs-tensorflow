import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as path from 'path';
import { WinstonLoggerModule } from '../../logger/winston-logger.module';
import { HttpModule } from '@nestjs/axios';
import { FfmpegService } from './ffmpeg.service';
import { ConfigModule } from '../../../settings/config.module';
import { combinedSupportMeetingsTestDirPath } from '../../../../test/temporaryTestVideos/combinedSupportMeetings/combinedSupportMeetingsTestDirPath';
import * as fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

jest.setTimeout(600 * 1000);

describe('execute', () => {
  let ffmpegService: FfmpegService;
  let app: INestApplication;
  const invalidVideoFilePath = '\\yarn-error.log';
  const validFilePath = 'test/video-samples/MPEGSolution_jurassic.mp4';
  let outputFileFullPath;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [WinstonLoggerModule, HttpModule, ConfigModule],
      providers: [FfmpegService],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
    ffmpegService = moduleFixture.get<FfmpegService>(FfmpegService);
  });
  afterAll(() => {
    if (outputFileFullPath) {
      fs.promises.unlink(outputFileFullPath);
      console.log('afterAll');
      fs.unlink(outputFileFullPath, (err) => {
        if (err) throw err;
        console.log('file unlinked');
      });
    }
  });
  // it('Should combine two records and save', async () => {
  //   const combinedVideo = await ffmpegService.combineVideos(
  //     records,
  //     path.join(combinedVideosTestDirPath, 'ffmpegServiceTest.mp4'),
  //   );
  //   const combinedMeetingDuration = await ffmpegService.getVideoDuration(
  //     combinedVideo,
  //   );
  //   let videosTotalDuration = 0;
  //   for await (const record of records) {
  //     console.log('get Duration for: ' + record);
  //     videosTotalDuration += await ffmpegService.getVideoDuration(record);
  //   }
  //   expect(
  //     Math.abs(videosTotalDuration - combinedMeetingDuration),
  //   ).toBeLessThan(1);
  // });
  it('Should return false if file not valid', async () => {
    let isFileValid = await ffmpegService.checkVideoFileValid(
      invalidVideoFilePath,
    );
    expect(isFileValid).toBe(false);
    isFileValid = await ffmpegService.checkVideoFileValid(validFilePath);
    expect(isFileValid).toBe(true);
  });

  it('Should combine videos ', async () => {
    const inputFiles = [validFilePath, validFilePath, validFilePath];
    const inputVideoDuration = await ffmpegService.getVideoDuration(
      validFilePath,
    );
    const outputFileFullPath = path.join(
      combinedSupportMeetingsTestDirPath,
      `${Math.random() * 10000}.mp4`,
    );
    const mergedFilePath = await ffmpegService.combineVideosWithoutMerging(
      inputFiles,
      outputFileFullPath,
    );
    expect(mergedFilePath).toBeDefined();
    const mergedFileDuration = await ffmpegService.getVideoDuration(
      mergedFilePath,
    );
    expect(
      mergedFileDuration - inputVideoDuration * inputFiles.length,
    ).toBeLessThan(1);
    await sleep(5000);
    await fs.promises.unlink(outputFileFullPath);
  });
});

const sleep = (milliseconds) => {
  return new Promise((res, rej) => {
    setTimeout(res, milliseconds);
  });
};
