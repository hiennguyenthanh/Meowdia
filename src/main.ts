import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // ignore excluded properties
  console.log(process.env.STAGE);
  await app.listen(3000);
}
bootstrap();

// Problem: comment(role guards on edit), test get all posts from 1 user
