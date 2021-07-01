import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { GoogleApisService } from './services/google-apis/google-apis.service';
import { SheetsController } from './controllers/v1/sheets.controller';
import { TdAmeritradeModule } from 'src/td-ameritrade/td-ameritrade.module';
import { CefConnectModule } from 'src/cef-connect/cef-connect.module';
import { SheetsQueueService } from './services/sheets-queue/sheets-queue.service';
import { SheetsQueueConsumer } from './processors/sheets-queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'googleSheetStockRows',
      defaultJobOptions: {
        delay: 1500, // 1.5 Seconds
        removeOnComplete: true,
        attempts: 3,
      },
    }),
    TdAmeritradeModule,
    CefConnectModule,
  ],
  providers: [GoogleApisService, SheetsQueueService, SheetsQueueConsumer],
  controllers: [SheetsController],
})
export class SheetsModule {}
