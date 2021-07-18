import {
	HttpService,
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';

import { CEFDailyPrice } from './../dto/cef.dailyPricing.response';

@Injectable()
export class CefConnectService {
	private readonly logger = new Logger('CefConnectService');

	constructor(private readonly httpService: HttpService) {}

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
}
