"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqQueryRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const faq_entity_1 = require("../entities/faq.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
let FaqQueryRepository = class FaqQueryRepository {
    constructor(faqRepository) {
        this.faqRepository = faqRepository;
    }
    async getFaqByCourseId(courseId, query) {
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
    async getFaqs(query, filter) {
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
            queryBuilder.andWhere(':courseId = ANY(faq.for_courses)', {
                courseId: filter.courseId,
            });
        }
        if (filter.searchTerm) {
            queryBuilder.andWhere(new typeorm_2.Brackets((qb) => {
                qb.where('LOWER(faq.title) like LOWER(:title)', {
                    title: `%${filter.searchTerm}%`,
                });
            }));
        }
        const [faq, totalCount] = await queryBuilder
            .orderBy('faq.priority', 'DESC')
            .addOrderBy('faq.updatedAt', 'DESC')
            .skip((query.pageNumber - 1) * query.pageSize)
            .take(query.pageSize)
            .getManyAndCount();
        return { faq, totalCount };
    }
};
FaqQueryRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(faq_entity_1.Faq)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FaqQueryRepository);
exports.FaqQueryRepository = FaqQueryRepository;
//# sourceMappingURL=faq.query-repository.js.map