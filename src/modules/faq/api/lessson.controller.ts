import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post } from '@nestjs/common';

@ApiTags('Lesson')
@Controller('lessons')
export class LessonController {
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiOperation({ summary: 'get with postgres metadata' })
  @Get('/student')
  async getQueryMetadata() {}

  @ApiOperation({ summary: 'fil table with random data' })
  @Post('/student')
  async filTable() {}
}
