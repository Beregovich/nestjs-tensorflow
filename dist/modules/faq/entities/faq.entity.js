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
var Faq_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faq = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../domain/base.entity");
const user_entity_1 = require("../../users/entities/user.entity");
let Faq = Faq_1 = class Faq extends base_entity_1.BaseEntity {
    constructor() {
        super();
    }
    static create(createFaqDto) {
        const faq = new Faq_1();
        faq.title = createFaqDto.title;
        faq.content = createFaqDto.content;
        faq.priority = createFaqDto.priority;
        faq.updatedBy = createFaqDto.userId;
        return faq;
    }
    update(dto) {
    }
};
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Faq.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Faq.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Faq.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'updated_by' }),
    __metadata("design:type", Number)
], Faq.prototype, "updatedBy", void 0);
Faq = Faq_1 = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [])
], Faq);
exports.Faq = Faq;
//# sourceMappingURL=faq.entity.js.map