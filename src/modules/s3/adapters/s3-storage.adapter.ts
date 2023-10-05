// import { Inject, Injectable } from '@nestjs/common';
// import {
//   S3Client,
//   AbortMultipartUploadCommand,
//   GetObjectCommand,
// } from '@aws-sdk/client-s3';
// import { bucketParamsType } from '../type/s3.types';
//
// @Injectable()
// export class S3StorageAdapter {
//   constructor(@Inject('S3Client') private s3Client: S3Client) {}
//   async getFileByKey(fileKey: string) {
//     try {
//       const bucketParams = {
//         Bucket: 'investigations-bucket',
//         Key: fileKey,
//         bucket_location: 'ru-central1',
//       };
//       const command = new GetObjectCommand(bucketParams);
//       const result = await this.s3Client.send(command);
//       return result;
//     } catch (e) {
//       //dd
//       console.error(e);
//     }
//   }
// }
