import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { FaqDto } from '../dto/faq.dto';
import { User } from '../../users/entities/user.entity';
import { BaseDomainEntity } from '../../../domain/base-domain.entity';

@Entity({})
export class Faq extends BaseDomainEntity {
  constructor() {
    super();
  }
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  priority: number;
  @ManyToOne(() => User, {}) //necessary
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
