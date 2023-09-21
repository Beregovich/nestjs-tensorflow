import { FaqRepository } from '../db/faq.repository';
import { FaqDto } from '../dto/faq.dto';
import { Faq } from '../entities/faq.entity';
export declare class CreateFaqUseCase {
    private readonly faqRepository;
    constructor(faqRepository: FaqRepository);
    execute(faqDto: FaqDto): Promise<Faq>;
}
