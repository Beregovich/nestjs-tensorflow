import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { LessonController } from './api/lessson.controller';

const repositories = [];

const useCases = [];
@Module({
  imports: [TypeOrmModule, TypeOrmModule.forFeature([Lesson])],
  controllers: [LessonController],
  providers: [...useCases, ...repositories],
  exports: [],
})
export class LessonsModule {}
