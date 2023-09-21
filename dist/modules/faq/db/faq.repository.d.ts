import { Faq } from '../entities/faq.entity';
import { Repository } from 'typeorm';
import { FaqDto } from '../dto/faq.dto';
export declare class FaqRepository {
    private readonly faqRepository;
    constructor(faqRepository: Repository<Faq>);
    save(faq: Faq): Promise<Faq>;
    updateFaq(faqId: number, faqDto: FaqDto): Promise<Faq>;
    deleteFaq(faqId: number): Promise<import("typeorm").DeleteResult>;
}
