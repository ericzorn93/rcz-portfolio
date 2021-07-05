import { InternalServerErrorException, Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetRow,
  GoogleSpreadsheetWorksheet,
} from 'google-spreadsheet';

import { FinalStockData } from './../../dto/final.stock';
import { SheetsRowResponse } from '../../dto/sheets.row.response';
import { TdAmeritradeService } from 'src/td-ameritrade/services/td-ameritrade/td-ameritrade.service';
import { UpdatedStockResponse } from 'src/sheets/dto/updated.stock.response';
import { CefConnectService } from 'src/cef-connect/services/cef-connect.service';
import { SheetsQueueService } from '../sheets-queue/sheets-queue.service';

type RCZPortfolioGoogleSheetRow = GoogleSpreadsheetRow & SheetsRowResponse;

const SYMBOL_KEY = 'Stock Symbol';

@Injectable()
export class GoogleApisService {
  private readonly logger = new Logger('GoogleAPIService');

  constructor(
    private readonly configService: ConfigService,
    private readonly sheetsQueueService: SheetsQueueService,
    private readonly tdAmeritradeService: TdAmeritradeService,
    private readonly cefConnectService: CefConnectService,
  ) {}

  /**
   * Obtains all stock data from the combines services of TD Ameritrade and CEF Connect
   *
   * @return {*}
   * @memberof GoogleApisService
   */
  public async getStockData(): Promise<UpdatedStockResponse[]> {
    const symbols = await this.getStockSymbols();
    const tdAmeritradeData = await this.tdAmeritradeService.getStockQuotes(
      symbols,
    );

    // Reach out to CEF Connect API to grab current pricing
    const cefConnectStocks = await this.cefConnectService.getClosedEndFundPricing();

    // Obtain the share price, dividend and discount amounts
    const finalData: FinalStockData[] = symbols.map(symbol => {
      const stockData = tdAmeritradeData[symbol];

      // Do not update stock data for symbols that don't exist
      if (!stockData) return null;

      // Match CEF Connect Data
      const cefConnectData = this.cefConnectService.getCefPriceForSheet(
        symbol,
        cefConnectStocks,
      );

      // Get Stock Data from TD Ameritrade
      const sharePrice = (stockData as any).lastPrice ?? 0;
      const dividendAmount = (stockData as any).divAmount;

      return {
        symbol,
        sharePrice: `$${sharePrice}`,
        estimatedIncome: `$${dividendAmount}`,
        ...cefConnectData,
      };
    });

    // Filter out all falsy/null values
    const nonNullStocks = finalData.filter(stock => stock != null);

    // Call Google API to save new row data
    const finalRowsToSave = await this.updateSheetCellsWithNewData(
      nonNullStocks,
    );
    await this.sheetsQueueService.addRowsToSaveToQueue(finalRowsToSave);

    return nonNullStocks.map(stock => ({
      symbol: stock.symbol,
      isUpdated: true,
      updatedTimestamp: new Date().toISOString(),
    }));
  }

  /**
   * Updates the google spreadsheet with the new data
   *
   * @private
   * @param {FinalStockData[]} finalStocks
   * @memberof GoogleApisService
   */
  private async updateSheetCellsWithNewData(
    finalStocks: FinalStockData[],
  ): Promise<GoogleSpreadsheetRow[]> {
    const firstSheet = await this.getFirstSheet();
    const rows = await firstSheet.getRows();

    // Final updated rows
    const rowsToSave: GoogleSpreadsheetRow[] = [];

    // Update each table column/row
    finalStocks.forEach(async stock => {
      const matchingRows = rows.filter(row => row[SYMBOL_KEY] === stock.symbol);

      if (matchingRows.length) {
        matchingRows.forEach(async row => {
          row['Current Premium/Discount'] = stock.currentDiscount;
          row['3  Month Z Score'] = stock.zScoreThreeMonth;
          row['6 Month Z Score'] = stock.zScoreSixMonth;
          row['1 Year Z Score'] = stock.zScoreOneYear;
          row['Distriubtion Frequency'] = stock.distributionFrequency;
          row['Share Price'] = stock.sharePrice;
          rowsToSave.push(row);
        });
      }
    });

    return rowsToSave;
  }

  /**
   * Obtains the first spreadhsset
   * in the current Google Sheets document from the API
   *
   * @private
   * @return {*}  {Promise<GoogleSpreadsheetWorksheet>}
   * @memberof GoogleApisService
   */
  public async getFirstSheet(): Promise<GoogleSpreadsheetWorksheet> {
    const doc = await this.getDoc();
    const firstSheet = doc.sheetsByIndex[0];

    return firstSheet;
  }

  /**
   * Obtains all stock symbols from the first
   * google Spreadsheet
   *
   * @return {Promise<string[]>}  {Promise<string[]>}
   * @memberof GoogleApisService
   */
  public async getStockSymbols(): Promise<string[]> {
    // First spreadsheet from google doc
    const firstSheet = await this.getFirstSheet();

    // Stock ticker symbols
    let symbols: string[] = [];

    try {
      const rows = await firstSheet.getRows();

      // !! Row Name in the spreadsheet must remain as Stock Symbol !!
      const stockSymbols = rows.map<string>(
        (row: RCZPortfolioGoogleSheetRow) => row[SYMBOL_KEY],
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
   * @public
   * @return {Promise<GoogleSpreadsheet>}  {Promise<GoogleSpreadsheet>} Instance of the document from Google Sheets
   * @memberof GoogleApisService
   */
  private async getDoc(): Promise<GoogleSpreadsheet> {
    // const googleApiKey = this.configService.get<string>('GOOGLE_API_KEY');
    const spreadsheetId = this.configService.get<string>(
      'GOOGLE_RCZ_PORTFOLIO_SPREADSHEET_ID',
    );

    // Google Spreadsheet instance based off of spreadsheet ID
    const doc = new GoogleSpreadsheet(spreadsheetId);

    try {
      // Fetches JSON file of Google Credentials
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const googleCreds = require('../../../../google-creds.json');
      await doc.useServiceAccountAuth(googleCreds);
      await doc.loadInfo();
    } catch (err) {
      console.log(err);

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
