import { Controller, Get } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { GoogleApisService } from 'src/sheets/services/google-apis/google-apis.service';

@ApiTags('v1/sheets')
@Controller('v1/sheets')
export class SheetsController {
  constructor(private readonly googleApisService: GoogleApisService) {}

  @ApiOkResponse({
    type: () => [String],
    description: 'All stock symbols from Google Sheet',
  })
  @ApiInternalServerErrorResponse({
    description: 'Cannot find stock ticker symbols from Google Sheets',
  })
  @Get('')
  public async getStockSymbols(): Promise<string[]> {
    return this.googleApisService.getStockSymbols();
  }

  @Get('stock-data')
  public async getStockData() {
    return this.googleApisService.getStockData();
  }
}
