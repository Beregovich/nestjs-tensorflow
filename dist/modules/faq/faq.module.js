"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FaqModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const create_faq_use_case_1 = require("./use-cases/create-faq.use-case");
const update_faq_use_case_1 = require("./use-cases/update-faq.use-case");
const faq_repository_1 = require("./db/faq.repository");
const faq_controller_1 = require("./api/faq.controller");
const faq_entity_1 = require("./entities/faq.entity");
const faq_query_repository_1 = require("./db/faq.query-repository");
const delete_faq_use_case_1 = require("./use-cases/delete-faq.use-case");
const user_entity_1 = require("../users/entities/user.entity");
const repositories = [faq_repository_1.FaqRepository, faq_query_repository_1.FaqQueryRepository];
const useCases = [create_faq_use_case_1.CreateFaqUseCase, update_faq_use_case_1.UpdateFaqUseCase, delete_faq_use_case_1.DeleteFaqUseCase];
let FaqModule = class FaqModule {
};
FaqModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule, typeorm_1.TypeOrmModule.forFeature([faq_entity_1.Faq, user_entity_1.User])],
        controllers: [faq_controller_1.FaqController],
        providers: [...useCases, ...repositories],
        exports: [],
    })
], FaqModule);
exports.FaqModule = FaqModule;
//# sourceMappingURL=faq.module.js.map