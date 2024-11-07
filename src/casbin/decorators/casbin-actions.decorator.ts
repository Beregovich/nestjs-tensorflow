import { SetMetadata } from '@nestjs/common';

export const CASBIN_ACTION_KEY = 'CASBIN_ACTION';
export const CasbinAction = (action: string) => SetMetadata(CASBIN_ACTION_KEY, action);
