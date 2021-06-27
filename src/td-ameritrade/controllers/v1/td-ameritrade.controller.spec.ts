import { Test, TestingModule } from '@nestjs/testing';
import { TdAmeritradeController } from './td-ameritrade.controller';

describe('TdAmeritradeController', () => {
  let controller: TdAmeritradeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TdAmeritradeController],
    }).compile();

    controller = module.get<TdAmeritradeController>(TdAmeritradeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
