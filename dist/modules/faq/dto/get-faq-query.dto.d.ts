import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';
export declare class GetFaqQueryDto extends PaginationQueryDto {
    searchTerm?: string;
    courseId?: number;
}
