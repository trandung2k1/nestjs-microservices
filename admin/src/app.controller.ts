import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async handler() {
    //? emit -> message pattern (not return data)
    // return this.client.emit({ cmd: 'hello' }, 'Hello from RabbitMQ!');
    return this.client.emit(
      { cmd: 'hello' },
      {
        userId: '123',
        price: 1000,
      },
    );
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
    // return this.client.send(
    //   { cmd: 'hello' },
    //   {
    //     userId: '123',
    //     price: 1000,
    //   },
    // );
    // this.client
    //   .send({ cmd: 'hello' }, { data: 'Hello from RabbitMQ' })
    //   .subscribe((response) => {
    //     console.log(response);
    //   });
  }
}
