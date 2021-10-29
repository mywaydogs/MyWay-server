import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtRefreshModule } from './jwt-refresh/jwt-refresh.module';
import { JwtAccessModule } from './jwt-access/jwt-access.module';
import { CustomersModule } from './customers/customers.module';
import { DogsModule } from './dogs/dogs.module';
import { TrainersModule } from './trainers/trainers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(3001),
        DATABASE_URL: Joi.string().default(
          'postgres://postgres:postgres@localhost/myway',
        )
      }),
    }),
    UsersModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: 'postgres',
        url: `${configService.get('DATABASE_URL')}${
          configService.get('NODE_ENV') === 'development'
            ? ''
            : '?sslmode=require'
        }`,
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize:
          configService.get('NODE_ENV') === 'development' ? true : false,
      }),
    }),
    JwtRefreshModule,
    JwtAccessModule,
    CustomersModule,
    DogsModule,
    TrainersModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule {}
