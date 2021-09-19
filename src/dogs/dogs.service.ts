import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { APICreateResult } from 'src/dto/api/api-create-result.dto';
import { getConnection, InsertResult, Repository } from 'typeorm';
import { CreateDogDto } from './dto/create-dog.dto';
import { CreateTrainingGoalTaskDto } from './dto/create-training-goal-task.dto';
import { CreateTrainingGoalDto } from './dto/create-training-goal.dto';
import { FindAllQueryDto } from './dto/find-all.query.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { UpdateTraininggoalTaskDto } from './dto/update-training-goal-task.dto';
import { UpdateTrainingGoalDto } from './dto/update-training-goal.dto';
import { Dog } from './entities/dog.entity';
import { TrainingGoalTask } from './entities/training-goal-task.entity';
import { TrainingGoal } from './entities/training-goal.entity';

@Injectable()
export class DogsService {
  constructor(
    @InjectRepository(Dog) private readonly dogsRepository: Repository<Dog>,
    @InjectRepository(TrainingGoal)
    private readonly trainingGoalsRepository: Repository<TrainingGoal>,
    @InjectRepository(TrainingGoalTask)
    private readonly trainingGoalTasksRepository: Repository<TrainingGoalTask>,
  ) {}

  async create(createDogDto: CreateDogDto): Promise<APICreateResult> {
    const { ageYears, ageMonths, ...rest } = createDogDto;

    let res: InsertResult = await this.dogsRepository.insert({
      ...rest,
      birthDate: this.calculateBirthDate(ageYears, ageMonths),
    });

    return res.identifiers[0] as APICreateResult;
  }

  async findAll(userId: number, findAllQueryDto: FindAllQueryDto) {
    return await getConnection()
      .createQueryBuilder(Dog, 'dog')
      .innerJoinAndSelect(
        'dog.customer',
        'customer',
        'customer.userId = :userId',
        { userId },
      )
      .where(findAllQueryDto)
      .getMany();
  }

  async findOne(id: number): Promise<Dog> {
    return await this.dogsRepository.findOne(id);
  }

  async update(id: number, updateDogDto: UpdateDogDto): Promise<void> {
    const { ageYears, ageMonths, ...rest } = updateDogDto;
    await this.dogsRepository.update(id, {
      ...rest,
      birthDate: this.calculateBirthDate(ageYears, ageMonths),
    });
  }

  remove(id: number) {
    return `This action removes a #${id} dog`;
  }

  private calculateBirthDate(age_years: number, age_months: number): Date {
    if (!age_years && !age_months) {
      return null;
    }
    const date: Date = new Date();
    if (age_months) {
      date.setMonth(date.getMonth() - age_months);
    }
    if (age_years) {
      date.setFullYear(date.getFullYear() - age_years);
    }
    return date;
  }

  async findAllTrainingGoals(userId: number, dogId: number) {
    return await this.trainingGoalsRepository.find({
      relations: ['tasks'],
      where: { dogId },
    });
  }

  async createTrainingGoal(
    dogId: number,
    createTrainingGoalDto: CreateTrainingGoalDto,
  ): Promise<void> {
    await this.trainingGoalsRepository.insert({
      ...createTrainingGoalDto,
      tasks: [],
      dogId,
    });
  }

  async updateTrainingGoal(
    goalId: number,
    updateTrainingGoalDto: UpdateTrainingGoalDto,
  ): Promise<void> {
    await this.trainingGoalsRepository.update(
      { id: goalId },
      updateTrainingGoalDto,
    );
  }

  async createTrainingGoalTask(
    dogId: number,
    goalId: number,
    createTrainingGoalTaskDto: CreateTrainingGoalTaskDto,
  ): Promise<void> {
    await this.trainingGoalTasksRepository.insert({
      ...createTrainingGoalTaskDto,
      goalId,
    });
  }

  async findTrainingGoalTask(taskId: number): Promise<TrainingGoalTask> {
    return await this.trainingGoalTasksRepository.findOne({ id: taskId });
  }

  async updateTrainingGoalTask(
    taskId: number,
    updateTrainingGoalTaskDto: UpdateTraininggoalTaskDto,
  ): Promise<void> {
    await this.trainingGoalTasksRepository.update(
      { id: taskId },
      updateTrainingGoalTaskDto,
    );
  }
}
