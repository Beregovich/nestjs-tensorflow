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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../domain/base.entity");
const faq_entity_1 = require("../../faq/entities/faq.entity");
let User = User_1 = class User extends base_entity_1.BaseEntity {
    constructor() {
        super();
    }
    static create(name) {
        const user = new User_1();
        user.fullName = name;
        return user;
    }
};
__decorate([
    (0, typeorm_1.Column)({ name: 'full_name' }),
    __metadata("design:type", String)
], User.prototype, "fullName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => faq_entity_1.Faq, (faq) => faq.updatedBy),
    __metadata("design:type", Array)
], User.prototype, "faq", void 0);
User = User_1 = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [])
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map