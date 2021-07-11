import { Test, TestingModule } from '@nestjs/testing';
import { CefConnectV1Controller } from './cef-connect-v1.controller';

describe('CefConnectV1Controller', () => {
  let controller: CefConnectV1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CefConnectV1Controller],
    }).compile();

    controller = module.get<CefConnectV1Controller>(CefConnectV1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
