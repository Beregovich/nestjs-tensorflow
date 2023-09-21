import { FaqDto } from '../dto/faq.dto';
import { BaseEntity } from '../../../domain/base.entity';
export declare class Faq extends BaseEntity {
    constructor();
    title: string;
    content: string;
    priority: number;
    updatedBy: number;
    static create(createFaqDto: FaqDto): Faq;
    update(dto: any): void;
}
