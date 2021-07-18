import { Test, TestingModule } from '@nestjs/testing';
import { CefCalculationsService } from './cef-calculations.service';

describe('CefCalculationsService', () => {
  let service: CefCalculationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CefCalculationsService],
    }).compile();

    service = module.get<CefCalculationsService>(CefCalculationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
