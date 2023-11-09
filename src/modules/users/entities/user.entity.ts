import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../domain/base.entity';
import { Faq } from '../../faq/entities/faq.entity';
import { CreateUserDto } from '../dto/create-user.dto';

export enum UserStatusEnum {
  NEW = 'NEW',
  CONFIRMED = 'CONFIRMED',
  REMOVED = 'REMOVED',
  BANNED = 'BANNED',
}

@Entity()
export class User extends BaseEntity {
  constructor() {
    super();
  }
  @Column({ name: 'first_name' })
  firstName: string | null;
  @Column({ name: 'last_name', nullable: true })
  lastName: string;
  @Column({ name: 'nick_name', nullable: true })
  nickName: string;
  @Column({ name: 'nick_name', nullable: true })
  telegramId: number;
  @Column({ name: 'status', default: UserStatusEnum.NEW, enum: UserStatusEnum })
  status: string;

  @OneToMany(() => Faq, (faq) => faq.updatedBy)
  faq: Faq[];

  public static create(dto: CreateUserDto) {
    const user = new User();
    user.status = UserStatusEnum.NEW;
    user.nickName = dto.nickName;
    user.telegramId = dto.telegramId;
    if (dto.firstName) {
      user.firstName = dto.firstName;
    }
    if (dto.lastName) {
      user.lastName = dto.lastName;
    }
    return user;
  }
}
