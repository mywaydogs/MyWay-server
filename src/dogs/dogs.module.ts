import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';
import { TrainingGoal } from './entities/training-goal.entity';
import { TrainingGoalTask } from './entities/training-goal-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dog, TrainingGoal, TrainingGoalTask])],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
