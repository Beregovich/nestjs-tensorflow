import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ObjectModel } from '../models/object-model';
import { CasbinPolicyModel } from '../models/casbin-policy-model';
import { CASBIN_OBJECT_KEY } from '../decorators/casbin-object.decorator';
import { CasbinService, EnforceResult } from '../services/casbin.service';
import { CASBIN_ACTION_KEY } from '../decorators/casbin-actions.decorator';

@Injectable()
export class CasbinActionGuard implements CanActivate {
  constructor(private reflector: Reflector, private casbinService: CasbinService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const casbinObject = this.reflector.get<ObjectModel>(CASBIN_OBJECT_KEY, context.getClass());

    const casbinAction = this.reflector.get<string>(CASBIN_ACTION_KEY, context.getHandler());

    if (!casbinObject) throw new Error('Set casbin object');

    if (!casbinAction) throw new Error('Set casbin action');

    const request = context.switchToHttp().getRequest();

    const currentUserId = request.user?.id;

    const casbinPolicy = new CasbinPolicyModel(
      currentUserId ?? 0,
      casbinObject,
      casbinAction.toString(),
    );

    const enforceResult: EnforceResult | null = await this.casbinService.enforce([casbinPolicy]);

    if (enforceResult == null || !enforceResult.results[0].access) {
      throw new ForbiddenException();
    }

    return true;
  }
}
