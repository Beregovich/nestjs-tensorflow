import { Injectable } from '@nestjs/common';
import { FaqRepository } from '../db/faq.repository';
import { FaqDto } from '../dto/faq.dto';

@Injectable()
export class UpdateFaqUseCase {
  constructor(private readonly faqRepository: FaqRepository) {}
  async execute(faqId: number, faqDto: FaqDto) {
    try {
      return this.faqRepository.updateFaq(faqId, faqDto);
    } catch (e) {
      console.log(e);
    }
  }
}
