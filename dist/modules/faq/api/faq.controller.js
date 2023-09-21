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
exports.FaqController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const faq_dto_1 = require("../dto/faq.dto");
const pagination_query_dto_1 = require("../../../common/dto/pagination-query.dto");
const faq_query_repository_1 = require("../db/faq.query-repository");
const create_faq_use_case_1 = require("../use-cases/create-faq.use-case");
const update_faq_use_case_1 = require("../use-cases/update-faq.use-case");
const delete_faq_use_case_1 = require("../use-cases/delete-faq.use-case");
const get_faq_query_dto_1 = require("../dto/get-faq-query.dto");
const pagination_query_extractor_utility_1 = require("../../../utils/pagination-query-extractor.utility");
let FaqController = class FaqController {
    constructor(faqQueryRepository, createFaqUseCase, updateFaqUseCase, deleteFaqUseCase) {
        this.faqQueryRepository = faqQueryRepository;
        this.createFaqUseCase = createFaqUseCase;
        this.updateFaqUseCase = updateFaqUseCase;
        this.deleteFaqUseCase = deleteFaqUseCase;
        this.fakeCourseId = 3;
    }
    async getFaqForStudent(query) {
        const sanitizedPaginationQuery = (0, pagination_query_extractor_utility_1.sanitizePaginationData)(query);
        const courseId = this.fakeCourseId;
        return this.faqQueryRepository.getFaqByCourseId(courseId, sanitizedPaginationQuery);
    }
    async getFaqForAdmin(query) {
        const sanitizedPaginationQuery = (0, pagination_query_extractor_utility_1.sanitizePaginationData)(query);
        const filter = {
            searchTerm: query.searchTerm,
            courseId: query.courseId,
        };
        return this.faqQueryRepository.getFaqs(sanitizedPaginationQuery, filter);
    }
    async createFaq(faq) {
        return await this.createFaqUseCase.execute(faq);
    }
    async updateFaq(faqDto, faqId) {
        return this.updateFaqUseCase.execute(faqId, faqDto);
    }
    async deleteFaq(faqId, res) {
        const result = await this.deleteFaqUseCase.execute(faqId);
        if (!result.affected || result.affected < 1) {
            throw new common_1.NotFoundException();
        }
        res.status(204);
        return null;
    }
};
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'get faqs for student' }),
    (0, common_1.Get)('/student'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "getFaqForStudent", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'get faqs for admin' }),
    (0, common_1.Get)('/admin'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_faq_query_dto_1.GetFaqQueryDto]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "getFaqForAdmin", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Created',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'create faq' }),
    (0, common_1.Post)('/admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [faq_dto_1.FaqDto]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "createFaq", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Success',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'update faq' }),
    (0, common_1.Put)('/admin/:faqId'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('faqId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [faq_dto_1.FaqDto, Number]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "updateFaq", null);
__decorate([
    (0, swagger_1.ApiResponse)({
        status: 204,
        description: 'No Content',
    }),
    (0, swagger_1.ApiOperation)({
        summary: 'delete faq',
    }),
    (0, common_1.Delete)('/admin/:faqId'),
    __param(0, (0, common_1.Param)('faqId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], FaqController.prototype, "deleteFaq", null);
FaqController = __decorate([
    (0, swagger_1.ApiHeader)({ name: 'token', required: true }),
    (0, swagger_1.ApiTags)('FAQ'),
    (0, common_1.Controller)('faq'),
    __metadata("design:paramtypes", [faq_query_repository_1.FaqQueryRepository,
        create_faq_use_case_1.CreateFaqUseCase,
        update_faq_use_case_1.UpdateFaqUseCase,
        delete_faq_use_case_1.DeleteFaqUseCase])
], FaqController);
exports.FaqController = FaqController;
//# sourceMappingURL=faq.controller.js.map