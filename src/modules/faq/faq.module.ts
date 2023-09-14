import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateFaqUseCase } from './use-cases/create-faq.use-case';
import { UpdateFaqUseCase } from './use-cases/update-faq.use-case';
import { FaqRepository } from './db/faq.repository';
import { FaqController } from './api/faq.controller';
import { Faq } from './entities/faq.entity';
import { FaqQueryRepository } from './db/faq.query-repository';
import { DeleteFaqUseCase } from './use-cases/delete-faq.use-case';

const repositories = [FaqRepository, FaqQueryRepository];

const useCases = [CreateFaqUseCase, UpdateFaqUseCase, DeleteFaqUseCase];
@Module({
  imports: [TypeOrmModule, TypeOrmModule.forFeature([Faq])],
  controllers: [FaqController],
  providers: [...useCases, ...repositories],
  exports: [],
})
export class FaqModule {}
