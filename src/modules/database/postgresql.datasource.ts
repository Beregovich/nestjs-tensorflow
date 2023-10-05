import { DataSource } from 'typeorm';
import { appSettings } from '../../settings/app-settings';
import { Faq } from '../faq/entities/faq.entity';
import { User } from '../users/entities/user.entity';
import { Lesson } from '../lessons/entities/lesson.entity';

const datasource = new DataSource({
  type: 'postgres' as const,
  host: appSettings.database.POSTGRES_HOST,
  port: appSettings.database.POSTGRES_PORT,
  username: appSettings.database.POSTGRES_USER,
  password: appSettings.database.POSTGRES_PASSWORD,
  database: appSettings.database.POSTGRES_DATABASE,
  synchronize: false,
  migrations: ['dist/**/migrations/*.js'],
  entities: [Faq, User, Lesson],
  ssl: false,
  // ssl: { rejectUnauthorized: false },
});
datasource.initialize();
export default datasource;
