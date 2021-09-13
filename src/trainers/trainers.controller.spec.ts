import { Test, TestingModule } from '@nestjs/testing';
import { TrainersController } from './trainers.controller';

describe('TrainersController', () => {
  let controller: TrainersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrainersController],
    }).compile();

    controller = module.get<TrainersController>(TrainersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
