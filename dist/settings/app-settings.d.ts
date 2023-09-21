export type EnvironmentVariable = {
    [key: string]: string | undefined;
};
export type EnvironmentsTypes = 'DEVELOPMENT' | 'STAGING' | 'PRODUCTION' | 'TEST';
export declare class EnvironmentSettings {
    private env;
    constructor(env: EnvironmentsTypes);
    getEnv(): EnvironmentsTypes;
    isProduction(): boolean;
    isStaging(): boolean;
    isDevelopment(): boolean;
    isTesting(): boolean;
}
export declare class AppSettings {
    env: EnvironmentSettings;
    api: APISettings;
    database: DatabaseSettings;
    logger: LoggerSettings;
    constructor(env: EnvironmentSettings, api: APISettings, database: DatabaseSettings, logger: LoggerSettings);
}
declare class APISettings {
}
declare class DatabaseSettings {
    private envVariables;
    readonly POSTGRES_HOST: string;
    readonly POSTGRES_DATABASE: string;
    readonly POSTGRES_PORT: number;
    readonly POSTGRES_USER: string;
    readonly POSTGRES_PASSWORD: string;
    constructor(envVariables: EnvironmentVariable);
}
declare class LoggerSettings {
    private envVariables;
    readonly HOST: string;
    readonly URL_PATH: string;
    constructor(envVariables: EnvironmentVariable);
}
export declare const appSettings: AppSettings;
export {};
