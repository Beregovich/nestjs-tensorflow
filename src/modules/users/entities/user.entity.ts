import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../domain/base.entity';
import { Faq } from '../../faq/entities/faq.entity';

@Entity()
export class User extends BaseEntity {
  constructor() {
    super();
  }
  @Column({ name: 'first_name', nullable: true })
  firstName: string | null;
  @Column({ name: 'last_name' })
  lastName: string;
  @Column({ name: 'nick_name', default: 'fake' })
  nickName: string;

  @OneToMany(() => Faq, (faq) => faq.updatedBy)
  faq: Faq[];

  public static create(name: string) {
    const user = new User();
    user.firstName = name;
    return user;
  }
}
