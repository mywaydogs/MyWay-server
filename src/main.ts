import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { config } from './config/config';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { json } from 'body-parser';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api');

  app.enableCors({ credentials: true });

  app.use(cookieParser(config.cookie_secret));

  app.use(json({ limit: '5mb' }));

  await app.listen(3001);
}
bootstrap();
