import {
  Controller,
  Get,
  Header,
  HttpStatus,
  Param,
  Res,
  Headers,
  Req,
  StreamableFile,
  InternalServerErrorException,
} from '@nestjs/common';
import { createReadStream, statSync } from 'fs';
import { Response, Request } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { mainPage } from '../../../static/mainPage';
import { S3StorageAdapter } from '../../s3/adapters/s3-storage.adapter';
import { GetObjectCommandOutput } from '@aws-sdk/client-s3';

@Controller()
export class VideoController {
  constructor(private s3StorageAdapter: S3StorageAdapter) {}
  @Get('s3/:key')
  async getS3Video(
    @Param() fileKey: string,
    @Headers() headers,
    @Res() res: Response,
  ) {
    const s3SdkOutput: GetObjectCommandOutput =
      await this.s3StorageAdapter.getFileByKey('1.mp4');
    if (!s3SdkOutput) throw new InternalServerErrorException();
    const videoRange = headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      // const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
      // const chunksize = end - start + 1;
      // const readStreamfile = createReadStream(videoPath, {
      //   start,
      //   end,
      //   highWaterMark: 60,
      // });
      // const head = {
      //   'Content-Range': `bytes ${start}-${end}/${size}`,
      //   'Content-Length': chunksize,
      // };
      // res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
      // readStreamfile.pipe(res);
    } else {
      // const head = {
      //   'Content-Length': size,
      // };
      // res.writeHead(HttpStatus.OK, head); //200
      //res.write(s3SdkOutput.Body.transformToWebStream());
      s3SdkOutput.Body.transformToWebStream()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .pipeTo(res)
        .then((result) => {
          return res.sendStatus(200);
        });
    }
  }

  @Get()
  async getStatic(@Res() res: Response, @Req() req: Request) {
    const mainPageHtml = await fs.promises.readFile('./src/static/index.html');
    //return res.sendFile(path.resolve('../static/index.html'), {root: __dirname, });
    const page = await mainPage.get(1, req.get('host'));
    console.log(page);
    return res.send(page);
  }

  @Get('video/stream/:id')
  @Header('Accept-Ranges', 'bytes')
  @Header('Content-Type', 'video/mp4')
  async getStreamVideo(
    @Param('id') id: string,
    @Headers() headers,
    @Res() res: Response,
  ) {
    const videoPath = `./src/assets/${id}.mp4`;
    console.log(videoPath);
    const { size } = statSync(videoPath);
    console.log(size);
    const videoRange = headers.range;
    if (videoRange) {
      const parts = videoRange.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : size - 1;
      const chunksize = end - start + 1;
      const readStreamfile = createReadStream(videoPath, {
        start,
        end,
        highWaterMark: 60,
      });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${size}`,
        'Content-Length': chunksize,
      };
      res.writeHead(HttpStatus.PARTIAL_CONTENT, head); //206
      readStreamfile.pipe(res);
    } else {
      const head = {
        'Content-Length': size,
      };
      res.writeHead(HttpStatus.OK, head); //200
      createReadStream(videoPath).pipe(res);
    }
  }

  // @Get()
  // findAll() {
  //     return this.videoService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //     return this.videoService.findOne(+id);
  // }
}
