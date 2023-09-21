import { FaqRepository } from '../db/faq.repository';
import { FaqDto } from '../dto/faq.dto';
export declare class UpdateFaqUseCase {
    private readonly faqRepository;
    constructor(faqRepository: FaqRepository);
    execute(faqId: number, faqDto: FaqDto): Promise<import("../entities/faq.entity").Faq>;
}
