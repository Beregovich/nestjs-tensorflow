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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFaqUseCase = void 0;
const common_1 = require("@nestjs/common");
const faq_repository_1 = require("../db/faq.repository");
const faq_entity_1 = require("../entities/faq.entity");
let CreateFaqUseCase = class CreateFaqUseCase {
    constructor(faqRepository) {
        this.faqRepository = faqRepository;
    }
    async execute(faqDto) {
        try {
            const faq = faq_entity_1.Faq.create(faqDto);
            return this.faqRepository.save(faq);
        }
        catch (e) {
            console.log(e);
        }
    }
};
CreateFaqUseCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [faq_repository_1.FaqRepository])
], CreateFaqUseCase);
exports.CreateFaqUseCase = CreateFaqUseCase;
//# sourceMappingURL=create-faq.use-case.js.map