import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { GoogleSpreadsheetRow } from 'google-spreadsheet';

@Injectable()
export class SheetsQueueService {
  private readonly logger = new Logger('SheetsQueueService');

  constructor(
    @InjectQueue('googleSheetStockRows')
    private readonly googleSheetStockRowsQueue: Queue,
  ) {}

  /**
   * Accepts the mutated stock rows and adds them to the queue
   * for later saving to the Google Sheets
   *
   * @param {GoogleSpreadsheetRow[]} stockRows All rows to save
   * @return {Promise<void>}  {Promise<void>}
   * @memberof SheetsQueueService
   */
  public async addRowsToSaveToQueue(
    stockRows: GoogleSpreadsheetRow[],
  ): Promise<void> {
    try {
      // Adds each fow to the queue
      stockRows.forEach(async row => {
        this.logger.debug(
          `date=${Date.now()} adding stockRow ${row.rowIndex} with symbol ${
            row['Stock Symbol']
          }`,
        );

        const job = await this.googleSheetStockRowsQueue.add(row.a1Range, {});
        this.logger.debug(
          `date=${Date.now()} added jobId=${
            job.id
          } for adding stock symbol updates`,
        );
      });
    } catch (err) {
      this.logger.error(err);
    }
  }
}
