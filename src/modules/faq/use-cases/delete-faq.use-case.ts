import { Injectable } from '@nestjs/common';
import { FaqRepository } from '../db/faq.repository';

@Injectable()
export class DeleteFaqUseCase {
  constructor(private readonly faqRepository: FaqRepository) {}
  async execute(faqId: number) {
    try {
      return this.faqRepository.deleteFaq(faqId);
    } catch (e) {
      console.log(e);
    }
  }
}
