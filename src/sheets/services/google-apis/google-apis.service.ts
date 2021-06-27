import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from 'google-spreadsheet';

import { SheetsRowResponse } from '../../dto/sheets.row.response';
import { TdAmeritradeService } from 'src/td-ameritrade/services/td-ameritrade/td-ameritrade.service';

type RCZPortfolioGoogleSheetRow = GoogleSpreadsheetRow & SheetsRowResponse;

@Injectable()
export class GoogleApisService {
  private readonly logger = new Logger('GoogleAPIService');

  constructor(
    private readonly configService: ConfigService,
    private readonly tdAmeritradeService: TdAmeritradeService,
  ) {}

  /**
   * Obtains all stock data from the combines services of TD Ameritrade and CEF Connect
   *
   * @return {*}
   * @memberof GoogleApisService
   */
  public async getStockData() {
    const symbols = await this.getStockSymbols();
    const tdAmeritradeData = await this.tdAmeritradeService.getStockQuotes(
      symbols,
    );
    const finalData = symbols.map(symbol => {
      const stockData = tdAmeritradeData[symbol];

      // Do not update stock data for symbols that don't exist
      if (!stockData) return null;

      // Get Stock Data from TD Ameritrade
      const sharePrice = (stockData as any).lastPrice;
      const dividendAmount = (stockData as any).divAmount;

      return {
        symbol,
        sharePrice: `$${sharePrice}`,
        estimatedIncome: `$${dividendAmount}`,
      };
    });

    // Filter out all falsy/null values
    const nonNullStocks = finalData.filter(stock => stock != null);

    return nonNullStocks.map(stock => ({
      [stock.symbol]: true,
    }));
  }

  /**
   * Obtains all stock symbols from the
   * Excel Spreadsheet
   *
   * @return {Promise<string[]>}  {Promise<string[]>}
   * @memberof GoogleApisService
   */
  public async getStockSymbols(): Promise<string[]> {
    const doc = await this.getDoc();
    const firstSheet = doc.sheetsByIndex[0];

    // Stock ticker symbols
    let symbols: string[] = [];

    try {
      const rows = await firstSheet.getRows();
      const stockSymbols = rows.map<string>(
        (row: RCZPortfolioGoogleSheetRow) => row['Stock Symbol'],
      );

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

    // Remove duplicates
    return Array.from(new Set(symbols));
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
