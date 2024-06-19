import { Controller, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  ClientProxy,
  EventPattern,
  MessagePattern,
} from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @EventPattern({ cmd: 'hello' })
  async hello(data: any) {
    this.authClient
      .send('get_user', { userId: data.userId })
      .subscribe((user) => {
        console.log(user);
      });
  }

  // @MessagePattern({ cmd: 'hello' })
  // async get(data: any) {
  //   console.log(data);
  //   return data;
  // }
}
