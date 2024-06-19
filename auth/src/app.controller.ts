import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  private readonly users: any[] = [
    {
      userId: '123',
      stripUserId: '43234',
    },
    {
      userId: '345',
      stripUserId: '27279',
    },
  ];
  constructor(private readonly appService: AppService) {}
  @MessagePattern('get_user')
  getUser(data: any) {
    return this.users.find((user) => user.userId === data.userId);
  }
}
