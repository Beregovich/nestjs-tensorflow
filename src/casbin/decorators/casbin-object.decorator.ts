import { SetMetadata } from '@nestjs/common';
import { ObjectModel } from '../models/object-model';

export const CASBIN_OBJECT_KEY = 'CASBIN_OBJECT';
export const CasbinObject = (objectType: string) =>
  SetMetadata(CASBIN_OBJECT_KEY, new ObjectModel(objectType, null));
