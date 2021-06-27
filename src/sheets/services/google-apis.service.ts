import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleSpreadsheet } from 'google-spreadsheet';

@Injectable()
export class GoogleApisService {
  private readonly logger = new Logger('GoogleAPIService');

  constructor(private readonly configService: ConfigService) {}

  /**
   * Obtains all stock symbols from the
   * Excel Spreadsheet
   *
   * @return {*}  {Promise<string[]>}
   * @memberof GoogleApisService
   */
  public async getStockSymbols(): Promise<string[]> {
    const doc = await this.getDoc();
    const firstSheet = doc.sheetsByIndex[0];

    // Stock ticker symbols
    let symbols: string[] = [];

    try {
      const rows = await firstSheet.getRows();
      const stockSymbols = rows.map(row => row['Stock Symbol']);

      // Filter out non-string and empty string values and then uppercase all symbols
      symbols = stockSymbols
        .filter(
          symbol =>
            symbol != null &&
            symbol.trim() !== '' &&
            typeof symbol === 'string',
        )
        .map(symbol => symbol.toUpperCase());
    } catch (err) {
      this.logger.error('Had trouble grabbing rows with title Stock Symbol');
      throw new InternalServerErrorException(
        'Had trouble grabbing rows with title Stock Symbol',
      );
    }

    console.log(symbols.join(','));

    return symbols;
  }

  /**
   * This document is loaded after authentication with the Google API. It loads the rows,
   * columns, and sheet metadata for a specific sheet ID that is passed in from
   * an environment variable.
   *
   * @private
   * @return {Promise<GoogleSpreadsheet>}  {Promise<GoogleSpreadsheet>} Instance of the document from Google Sheets
   * @memberof GoogleApisService
   */
  private async getDoc(): Promise<GoogleSpreadsheet> {
    const googleApiKey = this.configService.get<string>('GOOGLE_API_KEY');
    const spreadsheetId = this.configService.get<string>(
      'GOOGLE_RCZ_PORTFOLIO_SPREADSHEET_ID',
    );

    const doc = new GoogleSpreadsheet(spreadsheetId);

    try {
      await doc.useApiKey(googleApiKey);
      await doc.loadInfo();
    } catch (err) {
      this.logger.error(
        `date=${Date.now()} Cannot get Google Sheet Document by ID`,
      );
      throw new InternalServerErrorException(
        'Cannot fetch Google Spreadsheet by Sheet ID',
      );
    }

    return doc;
  }
}
