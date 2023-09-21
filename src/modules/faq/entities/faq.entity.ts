import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FaqDto } from '../dto/faq.dto';
import { BaseEntity } from '../../../domain/base.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Faq extends BaseEntity {
  constructor() {
    super();
  }
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  priority: number;
  @ManyToOne(() => User) //necessary
  @JoinColumn({ name: 'updated_by' })
  updatedBy: number;

  public static create(createFaqDto: FaqDto) {
    const faq = new Faq();
    faq.title = createFaqDto.title;
    faq.content = createFaqDto.content;
    faq.priority = createFaqDto.priority;
    faq.updatedBy = createFaqDto.userId;
    return faq;
  }

  public update(dto: any) {
    /////,,,,,
  }
}
