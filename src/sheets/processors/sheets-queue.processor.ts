import {
  GoogleSpreadsheetWorksheet,
  GoogleSpreadsheetRow,
} from 'google-spreadsheet';
import { Logger, OnModuleInit } from '@nestjs/common';
import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueError,
  OnQueueStalled,
  OnQueuePaused,
  OnQueueFailed,
  OnQueueCleaned,
} from '@nestjs/bull';
import { Job, JobId } from 'bull';

import { IGoogleSheetQueueJobData } from './../types/sheetQueue.types';
import { GoogleApisService } from '../services/google-apis/google-apis.service';

@Processor('googleSheetStockRows')
export class SheetsQueueConsumer implements OnModuleInit {
  private readonly logger = new Logger('SheetsQueueConsumer');
  private sheet: GoogleSpreadsheetWorksheet;
  private sheetRows: GoogleSpreadsheetRow[];

  constructor(private readonly googleApisService: GoogleApisService) {}

  public async onModuleInit(): Promise<void> {
    const originalTime = Date.now();
    this.logger.debug(`Starting Google Sheets Queue Connections`);
    this.sheet = await this.googleApisService.getFirstSheet();
    this.sheetRows = await this.sheet.getRows();

    // Loads all cells on initial module mount
    await this.sheet.loadCells();

    // Mark when queue and server are ready
    const timePassed = Date.now() - originalTime;
    this.logger.debug(`Google Sheets Queue Ready in time=${timePassed}ms`);
  }

  @Process()
  public async transcode(job: Job<IGoogleSheetQueueJobData>): Promise<JobId> {
    // Wait one second to process
    // await new Promise(res => setTimeout(res, 1500));
    const cell = await this.sheet.getCellByA1(job.data.a1Range);
    const row = this.sheetRows[cell.rowIndex];

    // Save updated row to google spreasheet
    await row.save();

    this.logger.log(`Row ${cell.a1Address} updated`);

    return job.id;
  }

  @OnQueueError()
  public onError(err: Error) {
    console.error(err);
  }

  @OnQueueActive()
  public onActive(job: Job): void {
    this.logger.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueCleaned()
  public onClean(): void {
    this.logger.log('queue cleaned');
  }

  @OnQueueStalled()
  public onStalled(): void {
    this.logger.log('stalled');
  }

  @OnQueuePaused()
  public onPause(): void {
    this.logger.log('Queue paused');
  }

  @OnQueueFailed()
  public fail(err: Error): void {
    this.logger.log(err);
  }
}
