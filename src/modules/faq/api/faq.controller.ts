import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FaqDto } from '../dto/faq.dto';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { FaqQueryRepository } from '../db/faq.query-repository';
import { CreateFaqUseCase } from '../use-cases/create-faq.use-case';
import { UpdateFaqUseCase } from '../use-cases/update-faq.use-case';
import { DeleteFaqUseCase } from '../use-cases/delete-faq.use-case';
import { GetFaqQueryDto } from '../dto/get-faq-query.dto';
import { sanitizePaginationData } from '../../../utils/pagination-query-extractor.utility';

@ApiHeader({ name: 'token', required: true })
@ApiTags('FAQ')
@Controller('faq')
export class FaqController {
  fakeCourseId = 3;
  constructor(
    private readonly faqQueryRepository: FaqQueryRepository,
    private readonly createFaqUseCase: CreateFaqUseCase,
    private readonly updateFaqUseCase: UpdateFaqUseCase,
    private readonly deleteFaqUseCase: DeleteFaqUseCase,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiOperation({ summary: 'get faqs for student' })
  @Get('/student')
  async getFaqForStudent(@Query() query: PaginationQueryDto) {
    const sanitizedPaginationQuery = sanitizePaginationData(query);
    const courseId = this.fakeCourseId;
    return this.faqQueryRepository.getFaqByCourseId(
      courseId,
      sanitizedPaginationQuery,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiOperation({ summary: 'get faqs for admin' })
  @Get('/admin')
  async getFaqForAdmin(@Query() query: GetFaqQueryDto) {
    const sanitizedPaginationQuery = sanitizePaginationData(query);
    const filter = {
      searchTerm: query.searchTerm,
      courseId: query.courseId,
    };
    return this.faqQueryRepository.getFaqs(sanitizedPaginationQuery, filter);
  }

  @ApiResponse({
    status: 201,
    description: 'Created',
  })
  @ApiOperation({ summary: 'create faq' })
  @Post('/admin')
  async createFaq(@Body() faq: FaqDto) {
    return await this.createFaqUseCase.execute(faq);
  }

  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiOperation({ summary: 'update faq' })
  @Put('/admin/:faqId')
  async updateFaq(
    @Body() faqDto: FaqDto,
    @Param('faqId', ParseIntPipe) faqId: number,
  ) {
    return this.updateFaqUseCase.execute(faqId, faqDto);
  }

  @ApiResponse({
    status: 204,
    description: 'No Content',
  })
  @ApiOperation({
    summary: 'delete faq',
  })
  @Delete('/admin/:faqId')
  async deleteFaq(
    @Param('faqId', ParseIntPipe) faqId: number,
    @Res({ passthrough: true }) res,
  ) {
    const result = await this.deleteFaqUseCase.execute(faqId);
    if (!result.affected || result.affected < 1) {
      throw new NotFoundException();
    }
    res.status(204);
    return null;
  }
}
