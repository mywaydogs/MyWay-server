import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { TrainersController } from './trainers.controller';
import { TrainersService } from './trainers.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [TrainersController],
  providers: [TrainersService]
})
export class TrainersModule {}
