import { Content } from './content.entity';
import { Column, Entity } from 'typeorm';
import { FaqDto } from '../dto/faq.dto';

@Entity()
export class Faq extends Content {
  constructor() {
    super();
  }
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  priority: number;
  @Column({ type: 'integer', array: true, name: 'for_courses' })
  forCourses: number[];

  public static create(createFaqDto: FaqDto) {
    const faq = new Faq();
    faq.title = createFaqDto.title;
    faq.content = createFaqDto.content;
    faq.priority = createFaqDto.priority;
    faq.forCourses = createFaqDto.forCourses;
    return faq;
  }
}
