import { Test, TestingModule } from '@nestjs/testing';
import { GoogleApisService } from './google-apis.service';

describe('GoogleApisService', () => {
  let service: GoogleApisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleApisService],
    }).compile();

    service = module.get<GoogleApisService>(GoogleApisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
