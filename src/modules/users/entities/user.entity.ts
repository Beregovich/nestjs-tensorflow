import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../domain/base.entity';
import { Faq } from '../../faq/entities/faq.entity';

@Entity()
export class User extends BaseEntity {
  constructor() {
    super();
  }
  @Column({ name: 'full_name' })
  fullName: string;
  @Column({ name: 'first_name' })
  firstName: string;
  @Column({ name: 'last_name' })
  lastName: string;

  @OneToMany(() => Faq, (faq) => faq.updatedBy)
  faq: Faq[];

  public static create(name: string) {
    const user = new User();
    user.fullName = name;
    return user;
  }
}
