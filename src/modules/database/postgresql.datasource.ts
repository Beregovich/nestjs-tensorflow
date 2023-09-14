import { DataSource } from 'typeorm';
import { appSettings } from '../../settings/app-settings';
import { Feedback } from '../code-review/entities/feedback.entity';
import { Mentor } from '../code-review/entities/mentor.entity';
import { Review } from '../code-review/entities/review.entity';
import { Student } from '../code-review/entities/student.entity';
import { Faq } from '../info-content/entities/faq.entity';

const datasource = new DataSource({
  type: 'postgres' as const,
  host: appSettings.database.POSTGRES_HOST,
  port: appSettings.database.POSTGRES_PORT,
  username: appSettings.database.POSTGRES_USER,
  password: appSettings.database.POSTGRES_PASSWORD,
  database: appSettings.database.POSTGRES_DATABASE,
  synchronize: false,
  migrations: ['dist/**/migrations/*.js'],
  entities: [Review, Feedback, Mentor, Student, Faq],
  ssl: { rejectUnauthorized: false },
});
datasource.initialize();
export default datasource;
