import { Controller, Get, SetMetadata, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/decorators/public.decorator';
import { ApiKeyGuard } from './auth/guards/api-key.guard';

@UseGuards(ApiKeyGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/')
  //@SetMetadata('isPublic', true)  without own decorator
  home() {
    return this.appService.getHello();
  }
  
  @Get('/tasks')
  @Public()
  tasks() {
    return this.appService.getTasks();
  }
}
