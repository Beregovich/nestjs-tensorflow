import { Controller, Post } from '@nestjs/common';
import { CasbinService } from '../services/casbin.service';

@Controller('casbin')
export class CasbinController {
  constructor(private readonly casbinService: CasbinService) {}

  @Post('generate')
  async generateActions(): Promise<void> {
    await this.casbinService.generateActions();

    return;
  }
}
