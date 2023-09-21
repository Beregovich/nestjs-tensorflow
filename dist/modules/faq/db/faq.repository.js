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
exports.FaqRepository = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const faq_entity_1 = require("../entities/faq.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
let FaqRepository = class FaqRepository {
    constructor(faqRepository) {
        this.faqRepository = faqRepository;
    }
    async save(faq) {
        return this.faqRepository.save(faq);
    }
    async updateFaq(faqId, faqDto) {
        const faq = await this.faqRepository.findOneBy({ id: faqId });
        faq.title = faqDto.title;
        faq.content = faqDto.content;
        faq.priority = faqDto.priority;
        return this.save(faq);
    }
    async deleteFaq(faqId) {
        return await this.faqRepository.delete({ id: faqId });
    }
};
FaqRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(faq_entity_1.Faq)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FaqRepository);
exports.FaqRepository = FaqRepository;
//# sourceMappingURL=faq.repository.js.map