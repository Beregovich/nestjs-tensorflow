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
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { sanitizePaginationData } from '../../../utils/pagination-query-extractor.utility';
import { FaqDto } from '../dto/faq.dto';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { studentRequestType } from '../../code-review/types/common.types';
import { User } from '../../../decorators/user.decorator';
import { FaqQueryRepository } from '../db/faq.query-repository';
import { CheckStudentGuard } from '../../../guards/check-student.guard';
import { CheckAdminGuard } from '../../../guards/check-admin.guard';
import { CreateFaqUseCase } from '../use-cases/create-faq.use-case';
import { UpdateFaqUseCase } from '../use-cases/update-faq.use-case';
import { DeleteFaqUseCase } from '../use-cases/delete-faq.use-case';
import { GetFaqQueryDto } from '../dto/get-faq-query.dto';

@ApiHeader({ name: 'token', required: true })
@ApiTags('FAQ')
@Controller('faq')
export class FaqController {
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
  @UseGuards(CheckStudentGuard)
  @Get('/student')
  async getFaqForStudent(
    @Query() query: PaginationQueryDto,
    @User() user: studentRequestType,
  ) {
    const sanitizedPaginationQuery = sanitizePaginationData(query);
    const courseId = user.selectedCourse.courseId;
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
  @UseGuards(CheckAdminGuard)
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
  @UseGuards(CheckAdminGuard)
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
