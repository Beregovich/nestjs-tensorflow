import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FaqRepository } from '../db/faq.repository';
import { Logger } from '../../logger/logger';

@Injectable()
export class DeleteFaqUseCase {
  constructor(
    private readonly faqRepository: FaqRepository,
    @Inject(Logger.name) private readonly logger: Logger,
  ) {
    logger.setSourceName(DeleteFaqUseCase.name);
  }
  async execute(faqId: number) {
    try {
      return this.faqRepository.deleteFaq(faqId);
    } catch (e) {
      this.logger.error(JSON.stringify(e), 'execute');
      console.log(e);
    }
  }
}
