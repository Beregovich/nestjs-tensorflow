import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import { HttpService } from '@nestjs/axios';
import { CasbinPolicyModel } from '../models/casbin-policy-model';
import * as fs from 'fs';

@Injectable()
export class CasbinService {
  private client: AxiosInstance;

  constructor(httpService: HttpService) {
    this.client = httpService.axiosRef;
  }

  public async enforce(policies: CasbinPolicyModel[]): Promise<EnforceResult | null> {
    try {
      const response = await this.client.post<EnforceResult>('/keycloak/decision', policies);

      return response.data;
    } catch (error) {
      console.log(error);

      return null;
    }
  }

  public async generateActions() {
    try {
      const response = await this.client.get('/keycloak/generate-ts');

      fs.writeFile(`${process.cwd()}/src/casbin/actions/actions.ts`, response.data, error => {
        if (error) {
          console.error(error);
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}

// TYPES
export interface EnforceResult {
  results: AccessData[];
}

export interface AccessData {
  access: boolean;
}
