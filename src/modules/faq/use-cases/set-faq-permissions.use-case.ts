// import { Injectable } from '@nestjs/common';
// import { FaqRepository } from '../db/faq.repository';
// import { FaqPermission } from '../entities/faq-permission.entity';
//
// @Injectable()
// export class SetFaqPermissionsUseCase {
//   constructor(private readonly faqRepository: FaqRepository) {}
//   async execute(faqId: number, courseIds: number[]) {
//     try {
//       const addCourseIds = [];
//       const removeCourseIds = [];
//       //Забираем текущие доступы для faq
//       const existingPermissions =
//         await this.faqRepository.getPermissionsByFaqId(faqId);
//       //Забираем Id курсов для которых есть доступ сейчас
//       const existingPermissionsCoursesIds = existingPermissions.map(
//         (permission) => permission.courseId,
//       );
//       //Если пришедшего id нет в бд - добавляем в массив к сохранению.
//       courseIds.forEach((courseId) => {
//         if (!existingPermissionsCoursesIds.includes(courseId)) {
//           addCourseIds.push(courseId);
//         }
//       });
//       //Если в существующих в бд courseId нет какого-либо из пришедших id
//       //Добавляем в массив id к удалению.
//       existingPermissionsCoursesIds.forEach((courseId) => {
//         if (!courseIds.includes(courseId)) {
//           removeCourseIds.push(courseId);
//         }
//       });
//       if (addCourseIds.length > 0) {
//         const permissions: FaqPermission[] = [];
//         addCourseIds.forEach((CourseId) => {
//           permissions.push(FaqPermission.create(faqId, CourseId));
//         });
//         await this.faqRepository.savePermissions(permissions);
//       }
//       if (removeCourseIds.length > 0) {
//         await this.faqRepository.removePermissionsForFaq(
//           faqId,
//           removeCourseIds,
//         );
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }
// }
