import { Inject } from '@nestjs/common';
import { Logger } from '../../logger/logger';
import { FfprobeData } from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import { AppSettings } from '../../../settings/app-settings';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

export type videoPropertiesType = {
  resolution: string | null;
  duration: number;
};
export class FfmpegService {
  constructor(
    @Inject('Logger') private readonly logger: Logger,
    @Inject(AppSettings.name) private readonly appSettings: AppSettings,
  ) {
    logger.setSourceName(FfmpegService.name);
  }

  /**
   * Склейщик видеофайлов
   * @param inputFilesPaths Массив путей к загруженным в FS видеофайлам
   * @param combinedRecordsFullPath Полный путь склеенного файла, включая имя.mp4
   * */
  async combineVideos(
    inputFilesPaths: string[],
    combinedRecordsFullPath: string,
  ): Promise<string | null> {
    try {
      const result = new Promise<any>((resolve, reject) => {
        const combiner = new ffmpeg()
          .format('mp4')
          .filterGraph('-vf scale=1920:-1');
        for (let i = 0; i < inputFilesPaths.length; i++) {
          combiner.addInput(inputFilesPaths[i]);
          console.log(`Combiner add input video: ${inputFilesPaths[i]}`);
        }
        combiner
          .on('error', (err: any) => {
            this.logger.error(JSON.stringify(err), 'combineVideos');
            console.log('Ffmpeg error occurred: ' + err.message);
            reject(err.message);
          })
          .on('end', () => {
            console.log('Processing finished!');
            this.logger.info('Video records combined', 'combineVideos');
            resolve(combinedRecordsFullPath);
          })
          // .on('progress', function (progress) {
          //   console.log('Processing: ' + progress.percent + '% done');
          // })
          .mergeToFile(combinedRecordsFullPath);
      });
      return result;
    } catch (err) {
      this.logger.error(JSON.stringify(err), 'combineVideos');
      console.log('Combiner error occurred: ' + err.message);
      return null;
    }
  }

  async getVideoDuration(videoFileFullPath: string): Promise<number> {
    return new Promise((res, rej) => {
      ffmpeg.ffprobe(videoFileFullPath, (err: any, metadata: FfprobeData) => {
        if (err) return rej(err);
        res(metadata.format.duration);
      });
    });
  }

  async checkVideoFileValid(videoFileFullPath: string): Promise<boolean> {
    return new Promise((res, rej) => {
      ffmpeg.ffprobe(videoFileFullPath, (err: any, metadata: FfprobeData) => {
        if (err) return res(false);
        res(true);
      });
    });
  }

  async getVideoProperties(
    videoFileFullPath: string,
  ): Promise<videoPropertiesType> {
    const metadata = await this.getVideoMetadata(videoFileFullPath);
    for (const stream of metadata.streams) {
      if (stream.hasOwnProperty('width') && stream.hasOwnProperty('height')) {
        return {
          resolution: `${stream.width}:${stream.height}`,
          duration: metadata.format.duration,
        };
      }
    }
    return {
      resolution: null,
      duration: metadata.format.duration,
    };
  }
  private async getVideoMetadata(
    videoFileFullPath: string,
  ): Promise<FfprobeData> {
    return new Promise((res, rej) => {
      ffmpeg.ffprobe(videoFileFullPath, (err: any, metadata: FfprobeData) => {
        if (err) return rej(err);
        res(metadata);
      });
    });
  }

  async combineVideosWithoutMerging(
    inputFilesPaths: string[],
    combinedRecordsFullPath: string,
  ) {
    let textFileContent = '';
    //Будем передавать вход через файлик txt
    const listFileNames = 'list.txt';
    const listFileNamesFullPath = path.join(
      this.appSettings.api.DOWNLOAD_VIDEO_DIR,
      listFileNames,
    );
    //Лог чтоб продебажить прод
    const logMessage = 'list.txt full path: ' + listFileNamesFullPath;
    console.log(logMessage);
    this.logger.info(logMessage, 'combineVideosWithoutMerging');
    try {
      const result = new Promise<string>((resolve, reject) => {
        //Готовим содержимое файлика
        inputFilesPaths.forEach((path) => {
          textFileContent = textFileContent + `file '${path}' \n`;
        });
        fs.writeFileSync(listFileNamesFullPath, textFileContent);
        const combiner = new ffmpeg();
        combiner
          .input(listFileNamesFullPath)
          .inputOptions(['-f concat', '-safe 0'])
          .outputOptions(['-c copy'])
          //Позволяет видеть команду запуска ffmpeg
          //.on('start', (cmdline: any) => console.log(cmdline))
          .on('error', (err: any) => {
            reject(err.message);
          })
          .on('end', () => {
            resolve(combinedRecordsFullPath);
          })
          // .on('progress', function (progress: any) {
          //   console.log('Processing: ' + progress.percent + '% done');
          // })
          .save(combinedRecordsFullPath);
      });
      return result;
    } catch (err) {
      this.logger.error(JSON.stringify(err), 'combineVideosWithoutMerging');
      console.log('Combiner error occurred: ' + err.message);
      return null;
    }
  }
}
