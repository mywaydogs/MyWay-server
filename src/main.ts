import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {json} from 'body-parser';
import * as cookieParser from 'cookie-parser';
import {AppModule} from './app.module';
import {config} from './config/config';
import {TransformInterceptor} from './interceptors/transform.interceptor';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);

    app.useGlobalInterceptors(new TransformInterceptor());

    app.setGlobalPrefix('api');

    app.enableCors({credentials: true});

    app.use(cookieParser(config.cookie_secret));

    app.use(json({limit: '5mb'}));

    Logger.log(`DOMAIN=${configService.get('DOMAIN')}`);

    const swaggerConfig = new DocumentBuilder()
        .setTitle('MyWay')
        .setDescription('The MyWay API description')
        .setVersion('0.1')
        .addTag('MyWay')
        .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('swagger', app, document);

    await app.listen(configService.get('PORT'));
}

// noinspection JSIgnoredPromiseFromCall
bootstrap();
