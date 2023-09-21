"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const app_settings_1 = require("../../settings/app-settings");
const faq_entity_1 = require("../faq/entities/faq.entity");
const user_entity_1 = require("../users/entities/user.entity");
const datasource = new typeorm_1.DataSource({
    type: 'postgres',
    host: app_settings_1.appSettings.database.POSTGRES_HOST,
    port: app_settings_1.appSettings.database.POSTGRES_PORT,
    username: app_settings_1.appSettings.database.POSTGRES_USER,
    password: app_settings_1.appSettings.database.POSTGRES_PASSWORD,
    database: app_settings_1.appSettings.database.POSTGRES_DATABASE,
    synchronize: false,
    migrations: ['dist/**/migrations/*.js'],
    entities: [faq_entity_1.Faq, user_entity_1.User],
    ssl: { rejectUnauthorized: false },
});
datasource.initialize();
exports.default = datasource;
//# sourceMappingURL=postgresql.datasource.js.map