import { Controller, Get } from '@nestjs/common';

import { GoogleApisService } from 'src/sheets/services/google-apis.service';

@Controller('v1/sheets')
export class SheetsController {
  constructor(private readonly googleApisService: GoogleApisService) {}

  @Get('')
  public async getSheet(): Promise<void> {
    return this.googleApisService.getSheet();
  }
}
