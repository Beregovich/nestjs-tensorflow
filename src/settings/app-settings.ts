//базовые настройки env переменных
//по умолчанию переменные беруться сначала из ENV илм смотрят всегда на staging
//для подстановки локальных значений переменных использовать исключительно локальные env файлы env.development.local
//при необзодимости добавляем сюда нужные приложению переменные

export type EnvironmentVariable = { [key: string]: string | undefined };
export type EnvironmentsTypes =
  | 'DEVELOPMENT'
  | 'STAGING'
  | 'PRODUCTION'
  | 'TEST';
export class EnvironmentSettings {
  constructor(private env: EnvironmentsTypes) {}
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

class APISettings {
  public readonly GET_SESSION_CODE_URL: string;
  constructor(private envVariables: EnvironmentVariable) {
    this.GET_SESSION_CODE_URL = envVariables.GET_SESSION_CODE_URL || 'http';
  }
}

class AuthSettings {
  public readonly BASE_AUTH_HEADER: string;
  constructor(private envVariables: EnvironmentVariable) {
    this.BASE_AUTH_HEADER =
      envVariables.BASE_AUTH_HEADER || 'Basic YWRtaW46cXdlcnR5';
  }
}

export class DatabaseSettings {
  public readonly MONGO_URI: string;
  constructor(private envVariables: EnvironmentVariable) {
    this.MONGO_URI = envVariables.MONGO_URL || 'mongodb://';
  }
}

export class S3Settings {
  public S3_API_ENDPOINT;
  public S3_KEY_ID;
  public S3_SECRET_KEY;
  constructor(private envVariables: EnvironmentVariable) {
    this.S3_API_ENDPOINT =
      this.envVariables.S3_API_ENDPOINT || 'https://bucket.yandexcloud.net';
    this.S3_KEY_ID = this.envVariables.S3_KEY_ID || '123';
    this.S3_SECRET_KEY = this.envVariables.S3_SECRET_KEY || '123';
  }
}

export class AppSettings {
  constructor(
    public env: EnvironmentSettings,
    public api: APISettings,
    public auth: AuthSettings,
    public database: DatabaseSettings,
    public s3: S3Settings,
  ) {}
}
const env = new EnvironmentSettings(
  (process.env.ENV || 'DEVELOPMENT') as EnvironmentsTypes,
);
const api = new APISettings(process.env);
const database = new DatabaseSettings(process.env);
const auth = new AuthSettings(process.env);
const s3 = new S3Settings(process.env);
export const appSettings = new AppSettings(env, api, auth, database, s3);
