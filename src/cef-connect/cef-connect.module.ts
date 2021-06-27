import { Module } from '@nestjs/common';

import { CefConnectService } from './services/cef-connect.service';

@Module({
  providers: [CefConnectService],
})
export class CefConnectModule {}
