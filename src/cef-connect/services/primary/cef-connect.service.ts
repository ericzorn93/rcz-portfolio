import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import {
	CEFDailyPrice,
	CustomCEFDailyPrice,
} from './../../dto/cef.dailyPricing.response';
import { CefCalculationsService } from './../cef-calculations/cef-calculations.service';

@Injectable()
export class CefConnectService {
	private readonly logger = new Logger('CefConnectService');

	constructor(
		private readonly httpService: HttpService,
		private readonly cefCalculationsService: CefCalculationsService,
	) {}

	/**
	 * Makes API request to the CEF Connect Daily prices endpoint and returns an array of all closed end fund data
	 * for the current timestamp
	 *
	 * @private
	 * @return {Promise<CEFDailyPrice[]>}  {Promise<CEFDailyPrice[]>}
	 * @memberof CefConnectService
	 */
	public async fetchCefConnectDailyPrices(): Promise<CEFDailyPrice[]> {
		try {
			const timeStart = Date.now();
			const { data: dailyPrices } = await this.httpService
				.get<CEFDailyPrice[]>(`/DailyPricing?&_=${timeStart}`)
				.toPromise();
			const timeElapsed = Date.now() - timeStart;

			this.logger.debug(
				`date=${Date.now()} Fetched the CEF Connect Daily Prices in ${timeElapsed}ms`,
			);

			return dailyPrices;
		} catch (err) {
			this.logger.error(err);

			this.logger.error(
				`date=${Date.now()} Having trouble fetching CEF Connect daily prices`,
			);
			throw new InternalServerErrorException(
				'Cannot successfully fetch the Closed End Fund Daily Pricing. Please try again.',
			);
		}
	}

	/**
	 * Runs CEF Connect Calculations to append extra fields and return data
	 * for each individual closed end fund
	 *
	 * @param {number} moneyInvested
	 * @return {{Promise<CEFDailyPrice[]>}}  {Promise<CEFDailyPrice[]>} Array of closed end funds with special calculations
	 * @memberof CefConnectService
	 */
	public async fetchDataWithCalculations(
		moneyInvested: number,
		tickerSymbols: string,
	): Promise<CustomCEFDailyPrice[]> {
		const cefFundData = await this.fetchCefConnectDailyPrices();

		const data: CustomCEFDailyPrice[] = cefFundData.map(fund => ({
			...fund,
			EstimatedIncome: this.cefCalculationsService.getEstimatedIncome(fund),
			NumberOfSharesPerOneDollarInvested: this.cefCalculationsService.getNumberOfSharedPerOneDollarInvested(
				fund,
			),
			AnnualIncomePerOneDollarInvested: this.cefCalculationsService.getAnnualIncomePerOneDollarInvested(
				fund,
			),
			AnnualIncomePerOneHundredDollarsInvested: this.cefCalculationsService.getAnnualIncomePerOneHundredDollarsInvested(
				fund,
			),
			MoneyInvested: moneyInvested,
			TotalIncome: this.cefCalculationsService.getTotalIncome(
				moneyInvested,
				fund,
			),
			CustomUpdated: new Date().toISOString(),
		}));

		// If NO Ticker Symbols are specified, return the original data
		if (!tickerSymbols || tickerSymbols === '') {
			return data;
		}

		// Split ticker symbols on comma and find all tickers that are in the parsed ticker symbols array
		const parsedTickerSymbols = tickerSymbols
			.split(',')
			.map(symbol => symbol.toUpperCase());
		return data.filter(fund => parsedTickerSymbols.includes(fund.Ticker));
	}

	/**
	 * Fetches the daily pricing from CEF connect and returns array of
	 * all ticker symbols for each closed end fund.
	 *
	 * @return {Promise<string[]>}  {Promise<string[]>}
	 * @memberof CefConnectService
	 */
	public async fetchCefTickers(): Promise<string[]> {
		const allFunds = await this.fetchCefConnectDailyPrices();

		return allFunds.map(fund => {
			this.logger.debug(
				`date=${Date.now()} obtaining ticker symbol for cefFund=${fund.Ticker}`,
			);

			return fund.Ticker;
		});
	}
}
