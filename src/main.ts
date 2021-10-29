import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { config } from './config/config';
import { TransformInterceptor } from './interceptors/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  app.useGlobalInterceptors(new TransformInterceptor());

  app.setGlobalPrefix('api');

  app.enableCors({ credentials: true });

  app.use(cookieParser(config.cookie_secret));

  app.use(json({ limit: '5mb' }));

  await app.listen(configService.get('PORT'));
}
bootstrap();
