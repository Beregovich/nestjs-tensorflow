import { Column, Entity, OneToMany } from 'typeorm';
import { Faq } from '../../faq/entities/faq.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { BaseDomainEntity } from '../../../domain/base-domain.entity';

export enum UserStatusEnum {
  NEW = 'NEW',
  CONFIRMED = 'CONFIRMED',
  REMOVED = 'REMOVED',
  BANNED = 'BANNED',
}

@Entity()
export class User extends BaseDomainEntity {
  constructor() {
    super();
  }
  @Column({ name: 'first_name' })
  firstName: string | null;
  @Column({ name: 'last_name', nullable: true })
  lastName: string;
  @Column({ name: 'login', nullable: true })
  login: string;
  @Column({ name: 'telegram_id', nullable: true })
  telegramId: string;
  @Column({ name: 'status', default: UserStatusEnum.NEW, enum: UserStatusEnum })
  status: string;

  @OneToMany(() => Faq, (faq) => faq.updatedBy)
  faq: Faq[];

  public static create(dto: CreateUserDto) {
    const user = new User();
    user.status = UserStatusEnum.NEW;
    user.login = dto.login;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
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
