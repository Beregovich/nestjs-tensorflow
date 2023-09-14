import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from '../entities/faq.entity';
import { Brackets, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getFaqFilterType } from '../types/common.types';

@Injectable()
export class FaqQueryRepository {
  constructor(
    @InjectRepository(Faq) private readonly faqRepository: Repository<Faq>,
  ) {}
  async getFaqByCourseId(courseId: number, query: PaginationQueryDto) {
    const [faq, totalCount] = await this.faqRepository
      .createQueryBuilder('faq')
      .select([
        'faq.id',
        'faq.title',
        'faq.content',
        'faq.priority',
        'faq.updatedAt',
      ])
      .where(':courseId = ANY(faq.for_courses)', { courseId: courseId })
      .orderBy('faq.priority', 'DESC')
      .addOrderBy('faq.updatedAt', 'DESC')
      .skip((query.pageNumber - 1) * query.pageSize)
      .take(query.pageSize)
      .getManyAndCount();
    return { faq, totalCount };
  }

  async getFaqs(query: PaginationQueryDto, filter: getFaqFilterType) {
    const queryBuilder = this.faqRepository
      .createQueryBuilder('faq')
      .where('1=1')
      .select([
        'faq.id',
        'faq.title',
        'faq.content',
        'faq.priority',
        'faq.forCourses',
        'faq.updatedAt',
      ]);
    if (filter.courseId) {
      //queryBuilder.andWhere(`review.course_id = :courseId`, {
      queryBuilder.andWhere(':courseId = ANY(faq.for_courses)', {
        courseId: filter.courseId,
      });
    }
    if (filter.searchTerm) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('LOWER(faq.title) like LOWER(:title)', {
            title: `%${filter.searchTerm}%`,
          });
        }),
      );
    }
    const [faq, totalCount] = await queryBuilder
      .orderBy('faq.priority', 'DESC')
      .addOrderBy('faq.updatedAt', 'DESC')
      .skip((query.pageNumber - 1) * query.pageSize)
      .take(query.pageSize)
      .getManyAndCount();

    return { faq, totalCount };
  }
}
