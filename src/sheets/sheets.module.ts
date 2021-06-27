import { Module } from '@nestjs/common';

import { GoogleApisService } from './services/google-apis.service';
import { SheetsController } from './controllers/v1/sheets.controller';

@Module({
  providers: [GoogleApisService],
  controllers: [SheetsController],
})
export class SheetsModule {}
