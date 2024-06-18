import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('hello')
  async hello(@Payload() data: any) {
    console.log(data);
    return data;
  }

  @MessagePattern('hello')
  async get(@Payload() data: any) {
    console.log(data);
  }
}
