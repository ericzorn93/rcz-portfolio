import { Injectable } from '@nestjs/common';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';

@Injectable()
export class SheetsQueueService {
  public async addRowsToSaveToQueue(
    stockRows: GoogleSpreadsheetRow[],
  ): Promise<void> {
    console.log(stockRows);
  }
}
