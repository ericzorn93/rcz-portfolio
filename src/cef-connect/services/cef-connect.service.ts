import { HttpService, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import {
  CEFDailyPrice,
  CEFConnectSheetData,
} from './../dto/cef.dailyPricing.response';

@Injectable()
export class CefConnectService {
  private readonly logger = new Logger('CefConnectService');

  constructor(private readonly httpService: HttpService) {}


	/**
	 * Returns the array of Closed End Fund daily pricing
	 * for the current time stamp that the user has executed the query.
	 *
	 * @return {Promise<CEFDailyPrice[]>}  {Promise<CEFDailyPrice[]>}
	 * @memberof CefConnectService
	 */
	public async getClosedEndFundPricingArray(): Promise<CEFDailyPrice[]> {
		this.logger.debug(`date=${Date.now()} Obtaining current Closed End Fund Pricing data`);
		return this.fetchCefConnectDailyPrices();
	}


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

      const dailyPrices = await this.fetchCefConnectDailyPrices();

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
	 * Makes API request to the CEF Connect Daily prices endpoint and returns an array of all closed end fund data
	 * for the current timestamp
	 *
	 * @private
	 * @return {Promise<CEFDailyPrice[]>}  {Promise<CEFDailyPrice[]>}
	 * @memberof CefConnectService
	 */
	private async fetchCefConnectDailyPrices(): Promise<CEFDailyPrice[]> {
		try {
			const timeStart = Date.now()
			const { data: dailyPrices } = await this.httpService
		.get<CEFDailyPrice[]>(`/DailyPricing?&_=${timeStart}`)
		.toPromise();
		const timeElapsed = Date.now() - timeStart

		this.logger.debug(`date=${Date.now()} Fetched the CEF Connect Daily Prices in ${timeElapsed}ms`)

		return dailyPrices
		} catch(err) {
			this.logger.error(`date=${Date.now()} Having trouble fetching CEF Connect daily prices`)
			throw new InternalServerErrorException('Cannot successfully fetch the Closed End Fund Daily Pricing. Please try again.')
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
      zScoreThreeMonth: null,
      zScoreSixMonth: null,
      zScoreOneYear: null,
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
      zScoreThreeMonth: currentStock.ZScore3M,
      zScoreSixMonth: currentStock.ZScore6M,
      zScoreOneYear: currentStock.ZScore1Yr,
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
