"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSettings = exports.AppSettings = exports.EnvironmentSettings = void 0;
const dotenv = require("dotenv");
dotenv.config();
class EnvironmentSettings {
    constructor(env) {
        this.env = env;
    }
    getEnv() {
        return this.env;
    }
    isProduction() {
        return this.env === 'PRODUCTION';
    }
    isStaging() {
        return this.env === 'STAGING';
    }
    isDevelopment() {
        return this.env === 'DEVELOPMENT';
    }
    isTesting() {
        return this.env === 'TEST';
    }
}
exports.EnvironmentSettings = EnvironmentSettings;
class AppSettings {
    constructor(env, api, database, logger) {
        this.env = env;
        this.api = api;
        this.database = database;
        this.logger = logger;
    }
}
exports.AppSettings = AppSettings;
class APISettings {
}
class DatabaseSettings {
    constructor(envVariables) {
        this.envVariables = envVariables;
        this.POSTGRES_HOST =
            envVariables.POSTGRES_HOST || 'hattie.db.elephantsql.com';
        this.POSTGRES_DATABASE = envVariables.POSTGRES_DATABASE || 'eyhiploi';
        this.POSTGRES_PORT = +envVariables.POSTGRES_PORT || 5432;
        this.POSTGRES_USER = envVariables.POSTGRES_USER || 'eyhiploi';
        this.POSTGRES_PASSWORD =
            envVariables.POSTGRES_PASSWORD || 'zzJXENF6Rd99G-9Nqt6do6h2UvAi-Z5z';
    }
}
class LoggerSettings {
    constructor(envVariables) {
        this.envVariables = envVariables;
        this.HOST = envVariables.LOGGER_HOST || 'default';
        this.URL_PATH = envVariables.LOGGER_URL_PATH || 'default';
    }
}
const env = new EnvironmentSettings((process.env.ENV || 'DEVELOPMENT'));
const api = new APISettings();
const database = new DatabaseSettings(process.env);
const logger = new LoggerSettings(process.env);
exports.appSettings = new AppSettings(env, api, database, logger);
//# sourceMappingURL=app-settings.js.map