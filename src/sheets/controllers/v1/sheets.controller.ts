import { Controller, Get, Patch } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdatedStockResponse } from 'src/sheets/dto/updated.stock.response';

import { GoogleApisService } from 'src/sheets/services/google-apis/google-apis.service';

@ApiTags('v1/sheets')
@Controller('v1/sheets')
export class SheetsController {
  constructor(private readonly googleApisService: GoogleApisService) {}

  @ApiOkResponse({
    type: 'string',
    isArray: true,
    description: 'All stock symbols from Google Sheet',
  })
  @ApiInternalServerErrorResponse({
    description: 'Cannot find stock ticker symbols from Google Sheets',
  })
  @Get('')
  public async getStockSymbols(): Promise<string[]> {
    return this.googleApisService.getStockSymbols();
  }

  @ApiOkResponse({
    type: 'boolean',
    description:
      'Fetches the updated stock data from the TD Ameritrade API and updates the spreadsheet, based on the symbols provided in the column of the sheet.',
  })
  @Patch('update-stock-data')
  public async getStockData(): Promise<UpdatedStockResponse[]> {
    return this.googleApisService.getStockData();
  }
}
