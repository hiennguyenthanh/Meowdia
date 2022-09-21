import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // ignore excluded properties
  await app.listen(3000);
}
bootstrap();

// Problem: userId of post is  post id
// user isn't show in post entity
