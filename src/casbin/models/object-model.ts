import { CasbinPolicyData } from './casbin-policy-data';

export class ObjectModel {
  constructor(public readonly Type: string, public readonly Data: CasbinPolicyData | null = null) {}
}
