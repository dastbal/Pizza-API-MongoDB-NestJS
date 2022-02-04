import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true  // discard data that is not define in dtos

  }));// to activate the validator inthe dtos
  await app.listen(3000);
}
bootstrap();
