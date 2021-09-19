import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { APICreateResult } from 'src/dto/api/api-create-result.dto';
import { JwtAccessGuard } from 'src/jwt-access/jwt-access.guard';
import { User } from 'src/users/entities/user.entity';
import { UserDec } from 'src/users/user.decorator';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { CreateTrainingGoalTaskDto } from './dto/create-training-goal-task.dto';
import { CreateTrainingGoalDto } from './dto/create-training-goal.dto';
import { FindAllQueryDto } from './dto/find-all.query.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { UpdateTraininggoalTaskDto } from './dto/update-training-goal-task.dto';
import { UpdateTrainingGoalDto } from './dto/update-training-goal.dto';
import { Dog } from './entities/dog.entity';
import { TrainingGoalTask } from './entities/training-goal-task.entity';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  async create(@Body() createDogDto: CreateDogDto): Promise<APICreateResult> {
    return await this.dogsService.create(createDogDto);
  }

  @UseGuards(JwtAccessGuard)
  @Get()
  async findAll(
    @UserDec() user: User,
    @Query() findAllQueryDto: FindAllQueryDto,
  ): Promise<Dog[]> {
    return await this.dogsService.findAll(user.id, findAllQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.dogsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDogDto: UpdateDogDto,
  ): Promise<void> {
    return this.dogsService.update(+id, updateDogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogsService.remove(+id);
  }

  @UseGuards(JwtAccessGuard)
  @Get(':id/training-goals')
  async findAllTrainingGoals(@UserDec() user: User, @Param('id') id: number) {
    return await this.dogsService.findAllTrainingGoals(user.id, id);
  }

  @UseGuards(JwtAccessGuard)
  @Post(':id/training-goals')
  async createTrainingGoal(
    @Param('id') id: number,
    @Body() createTrainingGoalDto: CreateTrainingGoalDto,
  ): Promise<void> {
    await this.dogsService.createTrainingGoal(id, createTrainingGoalDto);
  }

  @UseGuards(JwtAccessGuard)
  @Post(':dogId/training-goals/:goalId/tasks')
  async createTrainingGoalTask(
    @Param('dogId') dogId: number,
    @Param('goalId') goalId: number,
    @Body() createTrainingGoalTaskDto: CreateTrainingGoalTaskDto,
  ): Promise<void> {
    await this.dogsService.createTrainingGoalTask(
      dogId,
      goalId,
      createTrainingGoalTaskDto,
    );
  }

  @UseGuards(JwtAccessGuard)
  @Patch(':dogId/training-goals/:goalId')
  async updateTrainingGoal(
    @Param('goalId') goalId: number,
    @Body() updateTrainingGoalDto: UpdateTrainingGoalDto,
  ): Promise<void> {
    await this.dogsService.updateTrainingGoal(goalId, updateTrainingGoalDto);
  }

  @UseGuards(JwtAccessGuard)
  @Get(':dogId/training-goals/:goalId/tasks/:taskId')
  async findTrainingGoalTask(
    @Param('taskId') taskId: number,
  ): Promise<TrainingGoalTask> {
    return await this.dogsService.findTrainingGoalTask(taskId);
  }

  @UseGuards(JwtAccessGuard)
  @Put(':dogId/training-goals/:goalId/tasks/:taskId')
  async updateTrainingGoalTask(
    @Param('taskId') taskId: number,
    @Body() updateTrainingGoalTaskDto: UpdateTraininggoalTaskDto,
  ) {
    await this.dogsService.updateTrainingGoalTask(
      taskId,
      updateTrainingGoalTaskDto,
    );
  }
}
