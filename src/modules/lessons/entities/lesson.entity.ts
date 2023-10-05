import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../../domain/base.entity';
import { CreateLessonDto } from '../dto/create-lesson.dto';

@Entity()
export class Lesson extends BaseEntity {
  constructor() {
    super();
  }
  @Index({})
  @Column({})
  title: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  content: string;
  @Column({ default: 0 })
  priority: string;

  public static create(dto: CreateLessonDto) {
    const lesson = new Lesson();
    lesson.title = dto.title;
    lesson.description = dto.description;
    lesson.content = dto.content;
    if (dto.priority) {
      lesson.priority = dto.priority;
    }
    return lesson;
  }
}
