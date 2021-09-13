import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { TrainerDto } from './dto/trainer.dto';

@Injectable()
export class TrainersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<TrainerDto[]> {
    return await this.usersRepository.find({
      select: ['id', 'firstName', 'lastName', 'aboutMe'],
    });
  }

  async findOne(id: number): Promise<TrainerDto> {
    return this.usersRepository.findOne(id, {
      select: ['id', 'firstName', 'lastName', 'aboutMe'],
    });
  }
}
