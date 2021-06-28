import { HttpService, Injectable, Logger } from '@nestjs/common';

import {
  CEFDailyPrice,
  CEFConnectSheetData,
} from './../dto/cef.dailyPricing.response';

@Injectable()
export class CefConnectService {
  private readonly logger = new Logger('CefConnectService');

  constructor(private readonly httpService: HttpService) {}

  /**
   * Obtains all stock information from CEF Connect,
   * specifically for closed end funds
   *
   * @return {*}  {Promise<CEFDailyPrice[]>}
   * @memberof CefConnectService
   */
  public async getClosedEndFundPricing(): Promise<
    Record<string, CEFDailyPrice>
  > {
    try {
      const time = Date.now();

      const { data: dailyPrices } = await this.httpService
        .get<CEFDailyPrice[]>(`/DailyPricing?&_=${time}`)
        .toPromise();

      return dailyPrices.reduce(
        (acc, stock) => ({
          ...acc,
          [stock.Ticker]: stock,
        }),
        {} as Record<string, CEFDailyPrice>,
      );
    } catch (err) {
      this.logger.warn(
        `date=${Date.now()} Error fetching stock symbol list from CEF Connect`,
      );
      return null;
    }
  }

  /**
   * Convert CEF data to proper type and shape for the Google Sheet
   * input.
   *
   * @param {string} symbol
   * @param {Record<string, CEFDailyPrice>} cefStocks
   * @return {*}  {CEFConnectSheetData}
   * @memberof CefConnectService
   */
  public getCefPriceForSheet(
    symbol: string,
    cefStocks: Record<string, CEFDailyPrice>,
  ): CEFConnectSheetData {
    const currentStock = cefStocks[symbol];

    const closedEndFundData: CEFConnectSheetData = {
      cefSharePrice: null,
      currentDiscount: null,
      fiftyTwoWeekLowDiscount: null,
      fiftyTwoWeekHighDiscount: null,
      fiftyTwoWeekAverageDiscount: null,
      distributionFrequency: null,
    };

    if (!currentStock) {
      return closedEndFundData;
    }

    const updatedClosedEndFundData = Object.assign(closedEndFundData, {
      cefSharePrice: this.convertToLegibleAmount(currentStock.Price, 'dollar'),
      currentDiscount: this.convertToLegibleAmount(
        currentStock.Discount,
        'percent',
      ),
      fiftyTwoWeekLowDiscount: null,
      fiftyTwoWeekHighDiscount: null,
      fiftyTwoWeekAverageDiscount: this.convertToLegibleAmount(
        currentStock.Discount52WkAvg,
        'percent',
      ),
      distributionFrequency: currentStock.DistributionFrequency,
    });

    return updatedClosedEndFundData;
  }

  /**
   * Converts dollar and percent amount to legible string
   *
   * @private
   * @param {number} amount
   * @param {('dollar' |  'percent')} type
   * @return {*}  {string}
   * @memberof CefConnectService
   */
  private convertToLegibleAmount(
    amount: number,
    type: 'dollar' | 'percent',
  ): string {
    const fixedAmount = amount.toFixed(2);

    if (type === 'dollar') {
      return `$${fixedAmount}`;
    }

    return `${fixedAmount}%`;
  }
}
