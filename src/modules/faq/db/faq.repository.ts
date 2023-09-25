import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from '../entities/faq.entity';
import { In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FaqDto } from '../dto/faq.dto';

@Injectable()
export class FaqRepository {
  constructor(
    @InjectRepository(Faq) private readonly faqRepository: Repository<Faq>,
  ) {}
  async save(faq: Faq) {
    return this.faqRepository.save(faq);
  }

  async updateFaq(faqId: number, faqDto: FaqDto) {
    const faq = await this.faqRepository.findOneBy({ id: faqId });
    faq.title = faqDto.title;
    faq.content = faqDto.content;
    faq.priority = faqDto.priority;
    return this.save(faq);
  }

  async deleteFaq(faqId: number) {
    return await this.faqRepository.delete({ id: faqId });
  }
}
