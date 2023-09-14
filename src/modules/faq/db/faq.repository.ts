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

  // async savePermissions(faqPermissions: FaqPermission[]) {
  //   return this.faqPermissionRepository.save(faqPermissions);
  // }
  async updateFaq(faqId: number, faqDto: FaqDto) {
    const faq = await this.faqRepository.findOneBy({ id: faqId });
    faq.title = faqDto.title;
    faq.content = faqDto.content;
    faq.forCourses = faqDto.forCourses;
    faq.priority = faqDto.priority;
    return this.save(faq);
  }

  async deleteFaq(faqId: number) {
    return await this.faqRepository.delete({ id: faqId });
  }

  // async getPermissionsByFaqId(faqId: number) {
  //   return this.faqPermissionRepository.findBy({ faqId: faqId });
  // }
  //
  // async removePermissionsForFaq(faqId: number, coursesIds: number[]) {
  //   const permissions = await this.faqPermissionRepository.find({
  //     where: { faqId: In(coursesIds) },
  //   });
  //   return this.faqPermissionRepository.remove(permissions);
  // }
}
