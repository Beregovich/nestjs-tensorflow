import { Inject, Injectable } from '@nestjs/common';
import { FaqRepository } from '../db/faq.repository';
import { FaqDto } from '../dto/faq.dto';
import { Logger } from '../../logger/logger';

@Injectable()
export class UpdateFaqUseCase {
  constructor(
    private readonly faqRepository: FaqRepository,
    @Inject(Logger.name) private readonly logger: Logger,
  ) {
    logger.setSourceName(UpdateFaqUseCase.name);
  }
  async execute(faqId: number, faqDto: FaqDto) {
    try {
      return this.faqRepository.updateFaq(faqId, faqDto);
    } catch (e) {
      this.logger.error(JSON.stringify(e), 'execute');
      console.log(e);
    }
  }
}
