import { Controller, Get, Param } from '@nestjs/common';
import { TrainerDto } from './dto/trainer.dto';
import { TrainersService } from './trainers.service';

@Controller('trainers')
export class TrainersController {
  constructor(private readonly trainersService: TrainersService) {}

  @Get('')
  async findAll(): Promise<TrainerDto[]> {
    return await this.trainersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<TrainerDto> {
    return await this.trainersService.findOne(id);
  }
}
