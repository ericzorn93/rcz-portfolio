import { Test, TestingModule } from '@nestjs/testing';
import { CefConnectService } from './cef-connect.service';

describe('CefConnectService', () => {
  let service: CefConnectService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CefConnectService],
    }).compile();

    service = module.get<CefConnectService>(CefConnectService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
