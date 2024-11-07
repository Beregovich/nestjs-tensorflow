import { ObjectModel } from './object-model';

export class CasbinPolicyModel {
  constructor(
    public readonly Subject: number,
    public readonly Object: ObjectModel,
    public readonly Action: string,
  ) {}
}
