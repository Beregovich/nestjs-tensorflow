import { Inject, Injectable } from '@nestjs/common';
import { FaqRepository } from '../db/faq.repository';
import { FaqDto } from '../dto/faq.dto';
import { Faq } from '../entities/faq.entity';
import { Logger } from '../../logger/logger';

@Injectable()
export class CreateFaqUseCase {
  constructor(
    private readonly faqRepository: FaqRepository,
    @Inject(Logger.name) private readonly logger: Logger,
  ) {
    logger.setSourceName(CreateFaqUseCase.name);
  }
  async execute(faqDto: FaqDto) {
    try {
      const faq = Faq.create(faqDto);
      return this.faqRepository.save(faq);
    } catch (e) {
      this.logger.error(JSON.stringify(e), 'execute');
      console.log(e);
    }
  }
}
