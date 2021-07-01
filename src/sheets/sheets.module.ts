import { Module } from '@nestjs/common';

import { GoogleApisService } from './services/google-apis/google-apis.service';
import { SheetsController } from './controllers/v1/sheets.controller';
import { TdAmeritradeModule } from 'src/td-ameritrade/td-ameritrade.module';
import { CefConnectModule } from 'src/cef-connect/cef-connect.module';
import { SheetsQueueService } from './services/sheets-queue/sheets-queue.service';

@Module({
  imports: [TdAmeritradeModule, CefConnectModule],
  providers: [GoogleApisService, SheetsQueueService],
  controllers: [SheetsController],
})
export class SheetsModule {}
