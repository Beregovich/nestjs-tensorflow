import { FaqDto } from '../dto/faq.dto';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
import { FaqQueryRepository } from '../db/faq.query-repository';
import { CreateFaqUseCase } from '../use-cases/create-faq.use-case';
import { UpdateFaqUseCase } from '../use-cases/update-faq.use-case';
import { DeleteFaqUseCase } from '../use-cases/delete-faq.use-case';
import { GetFaqQueryDto } from '../dto/get-faq-query.dto';
export declare class FaqController {
    private readonly faqQueryRepository;
    private readonly createFaqUseCase;
    private readonly updateFaqUseCase;
    private readonly deleteFaqUseCase;
    fakeCourseId: number;
    constructor(faqQueryRepository: FaqQueryRepository, createFaqUseCase: CreateFaqUseCase, updateFaqUseCase: UpdateFaqUseCase, deleteFaqUseCase: DeleteFaqUseCase);
    getFaqForStudent(query: PaginationQueryDto): Promise<{
        faq: import("../entities/faq.entity").Faq[];
        totalCount: number;
    }>;
    getFaqForAdmin(query: GetFaqQueryDto): Promise<{
        faq: import("../entities/faq.entity").Faq[];
        totalCount: number;
    }>;
    createFaq(faq: FaqDto): Promise<import("../entities/faq.entity").Faq>;
    updateFaq(faqDto: FaqDto, faqId: number): Promise<import("../entities/faq.entity").Faq>;
    deleteFaq(faqId: number, res: any): Promise<any>;
}
