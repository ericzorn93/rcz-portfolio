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
	): Promise<CustomCEFDailyPrice[]> {
		const cefFundData = await this.fetchCefConnectDailyPrices();

		return cefFundData.map(fund => ({
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
		}));
	}
}
