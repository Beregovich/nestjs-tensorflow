import { BaseEntity } from '../../../domain/base.entity';
import { Faq } from '../../faq/entities/faq.entity';
export declare class User extends BaseEntity {
    constructor();
    fullName: string;
    faq: Faq[];
    static create(name: string): User;
}
