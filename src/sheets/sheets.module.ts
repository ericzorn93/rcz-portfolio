import { Module } from '@nestjs/common';

import { GoogleApisService } from './services/google-apis/google-apis.service';
import { SheetsController } from './controllers/v1/sheets.controller';
import { TdAmeritradeModule } from 'src/td-ameritrade/td-ameritrade.module';

@Module({
  imports: [TdAmeritradeModule],
  providers: [GoogleApisService],
  controllers: [SheetsController],
})
export class SheetsModule {}
