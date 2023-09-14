import { Injectable } from '@nestjs/common';
import { FaqRepository } from '../db/faq.repository';
import { FaqDto } from '../dto/faq.dto';
import { Faq } from '../entities/faq.entity';

@Injectable()
export class CreateFaqUseCase {
  constructor(private readonly faqRepository: FaqRepository) {}
  async execute(faqDto: FaqDto) {
    try {
      const faq = Faq.create(faqDto);
      return this.faqRepository.save(faq);
    } catch (e) {
      console.log(e);
    }
  }
}
