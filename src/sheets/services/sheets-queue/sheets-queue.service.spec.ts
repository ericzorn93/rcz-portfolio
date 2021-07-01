import { Test, TestingModule } from '@nestjs/testing';
import { SheetsQueueService } from './sheets-queue.service';

describe('SheetsQueueService', () => {
  let service: SheetsQueueService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheetsQueueService],
    }).compile();

    service = module.get<SheetsQueueService>(SheetsQueueService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
