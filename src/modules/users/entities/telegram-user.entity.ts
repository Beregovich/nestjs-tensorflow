import { Column, Entity } from 'typeorm';
import { BaseDomainEntity } from '../../../domain/base-domain.entity';
@Entity()
export class TelegramUser extends BaseDomainEntity {
  @Column({ name: 'telegram_id' })
  telegramId: number;
  @Column({ name: 'is_bot' })
  isBot: boolean;
  @Column({ name: 'first_name' })
  firstName: string;
  @Column({ name: 'last_name', default: null })
  lastName: string;
  @Column({ name: 'is_premium', default: null })
  isPremium: boolean;
  @Column({ name: 'added_to_attachment_menu', default: null })
  addedToAttachmentMenu: string | null;
}
