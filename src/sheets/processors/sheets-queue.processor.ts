import { GoogleSpreadsheetWorksheet } from 'google-spreadsheet';
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
import { OnModuleInit } from '@nestjs/common';

@Processor('googleSheetStockRows')
export class SheetsQueueConsumer implements OnModuleInit {
  private sheet: GoogleSpreadsheetWorksheet;

  constructor(private readonly googleApisService: GoogleApisService) {}

  public async onModuleInit(): Promise<void> {
    this.sheet = await this.googleApisService.getFirstSheet();
  }

  @Process()
  public async transcode(job: Job<IGoogleSheetQueueJobData>): Promise<JobId> {
    // Wait one second to process
    // await new Promise(res => setTimeout(res, 1000));
    console.log(this.sheet.sheetId, job.data);

    return job.id;
  }

  @OnQueueError()
  public onError(err: Error) {
    console.error(err);
  }

  @OnQueueActive()
  public onActive(job: Job): void {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueCleaned()
  public onClean(): void {
    console.log('queue cleaned');
  }

  @OnQueueStalled()
  public onStalled(): void {
    console.log('stalled');
  }

  @OnQueuePaused()
  public onPause(): void {
    console.log('Queue paused');
  }

  @OnQueueFailed()
  public fail(err: Error): void {
    console.log('failure', err);
  }
}
