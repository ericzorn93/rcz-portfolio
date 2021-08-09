import { Test, TestingModule } from '@nestjs/testing';
import { CefConnectResolver } from './cef-connect.resolver';

describe('CefConnectResolver', () => {
  let resolver: CefConnectResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CefConnectResolver],
    }).compile();

    resolver = module.get<CefConnectResolver>(CefConnectResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
