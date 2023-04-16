import { Module } from '@nestjs/common';
import {VideoService} from "./service/video.service";
import {VideoController} from "./api/video.controller";


@Module({
    imports: [],
    controllers: [VideoController],
    providers: [VideoService],
})
export class VideoModule {}