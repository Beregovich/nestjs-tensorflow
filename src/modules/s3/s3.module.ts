// import { Module, Scope } from '@nestjs/common';
// import { S3StorageAdapter } from './adapters/s3-storage.adapter';
// import { S3Client } from '@aws-sdk/client-s3';
// import { AppSettings } from '../../settings/app-settings';
// import { ConfigModule } from '../../settings/config.module';
//
// @Module({
//   imports: [],
//   controllers: [],
//   providers: [
//     S3StorageAdapter,
//     {
//       provide: 'S3Client',
//       useFactory: (appSettings: AppSettings) => {
//         console.log(appSettings.s3.S3_SECRET_KEY);
//         console.log(appSettings.s3.S3_KEY_ID);
//         return new S3Client({
//           credentials: {
//             secretAccessKey: appSettings.s3.S3_SECRET_KEY,
//             accessKeyId: appSettings.s3.S3_KEY_ID,
//           },
//           region: 'ru-central1',
//           endpoint: appSettings.s3.S3_API_ENDPOINT,
//         });
//       },
//       inject: [AppSettings.name],
//       scope: Scope.DEFAULT,
//     },
//   ],
//   exports: [S3StorageAdapter],
// })
// export class S3Module {}
