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
    //? emit -> message pattern
    this.client.emit('hello', 'Hello from RabbitMQ!');

    //! send -> event pattern
    // return const data =  this.client.send('hello', 'Hello from RabbitMQ!');
    // const data = this.client
    //   .send('hello', {
    //     data: 'Hello from RabbitMQ',
    //   })
    //   .toPromise();
    // const rs = await data;
    // return rs;
    // this.client
    //   .send('hello', { data: 'Hello from RabbitMQ' })
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
  }
}
