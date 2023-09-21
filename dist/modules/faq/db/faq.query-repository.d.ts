import { Faq } from '../entities/faq.entity';
import { Repository } from 'typeorm';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { getFaqFilterType } from '../types/common.types';
export declare class FaqQueryRepository {
    private readonly faqRepository;
    constructor(faqRepository: Repository<Faq>);
    getFaqByCourseId(courseId: number, query: PaginationQueryDto): Promise<{
        faq: Faq[];
        totalCount: number;
    }>;
    getFaqs(query: PaginationQueryDto, filter: getFaqFilterType): Promise<{
        faq: Faq[];
        totalCount: number;
    }>;
}
