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

@Processor('googleSheetStockRows')
export class SheetsQueueConsumer {
  @Process()
  public async transcode(job: Job<IGoogleSheetQueueJobData>): Promise<JobId> {
    console.log(job.data);

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
