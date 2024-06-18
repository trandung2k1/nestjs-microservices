import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
const port = process.env.PORT || 4000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Config microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();

  await app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
}
bootstrap();
