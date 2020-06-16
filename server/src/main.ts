import {config as dotenvConfig} from 'dotenv';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

// config dotenv
dotenvConfig();

const port = process.env.PORT || 6000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(port);
  Logger.log(`Server is running on port: ${port}`, 'Bootstrap');
}
bootstrap();
