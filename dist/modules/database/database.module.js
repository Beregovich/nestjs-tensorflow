"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const app_settings_1 = require("../../settings/app-settings");
const common_1 = require("@nestjs/common");
let DatabaseModule = class DatabaseModule {
};
DatabaseModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                useFactory: (appSettings) => ({
                    type: 'postgres',
                    host: appSettings.database.POSTGRES_HOST,
                    port: appSettings.database.POSTGRES_PORT,
                    username: appSettings.database.POSTGRES_USER,
                    password: appSettings.database.POSTGRES_PASSWORD,
                    database: appSettings.database.POSTGRES_DATABASE,
                    autoLoadEntities: true,
                    synchronize: true,
                    ssl: { rejectUnauthorized: false },
                }),
                inject: [app_settings_1.AppSettings.name],
            }),
        ],
        controllers: [],
        providers: [],
        exports: [typeorm_1.TypeOrmModule],
    })
], DatabaseModule);
exports.DatabaseModule = DatabaseModule;
//# sourceMappingURL=database.module.js.map