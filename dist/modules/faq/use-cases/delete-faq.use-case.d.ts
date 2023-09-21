import { FaqRepository } from '../db/faq.repository';
export declare class DeleteFaqUseCase {
    private readonly faqRepository;
    constructor(faqRepository: FaqRepository);
    execute(faqId: number): Promise<import("typeorm").DeleteResult>;
}
