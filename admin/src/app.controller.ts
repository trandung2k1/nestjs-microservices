import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async getHello() {
    //? emit -> message pattern (not return data)
    // return this.client.emit({ cmd: 'hello' }, 'Hello from RabbitMQ!');
    //! send -> event pattern (return data)
    // const data = await this.client
    //   .send(
    //     { cmd: 'hello' },
    //     {
    //       data: 'Hello from RabbitMQ',
    //     },
    //   )
    //   .toPromise();
    // return data;
    return this.client.send({ cmd: 'hello' }, 'Hello from RabbitMQ!');
    // this.client
    //   .send({ cmd: 'hello' }, { data: 'Hello from RabbitMQ' })
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
  }
}
