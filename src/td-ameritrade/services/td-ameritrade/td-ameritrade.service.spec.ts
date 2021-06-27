import { Test, TestingModule } from '@nestjs/testing';
import { TdAmeritradeService } from './td-ameritrade.service';

describe('TdAmeritradeService', () => {
  let service: TdAmeritradeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TdAmeritradeService],
    }).compile();

    service = module.get<TdAmeritradeService>(TdAmeritradeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
