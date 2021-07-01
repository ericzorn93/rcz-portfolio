import { GoogleSpreadsheetRow } from 'google-spreadsheet';
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('googleSheetStockRows')
export class SheetsQueueConsumer {
  @Process()
  public async transcode(job: Job<GoogleSpreadsheetRow>): Promise<any> {
    let status = await job.getState();
    console.log(status, job.data);
    status = await job.getState();
    console.log(status);

    return job.data;
  }
}
