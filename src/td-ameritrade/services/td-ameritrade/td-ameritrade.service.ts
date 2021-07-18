import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { TDAmeritradeStock } from '../../../td-ameritrade/dto/td-ameritrade.response';

@Injectable()
export class TdAmeritradeService {
	private readonly logger = new Logger('TdAmeritradeService');

	constructor(private readonly httpService: HttpService) {}

	/**
	 * Accepts the incoming stock symbol data from the Google Spreadsheet
	 * and eventually calls the TD Ameritrade API to gain real time stock information
	 * for updating the spreadsheet.
	 *
	 * @param {string[]} stockSymbols All Stock symbol data from TD Ameritrade
	 * @return {Promise<TDAmeritradeStock[]>}  {Promise<TDAmeritradeStock[]>}
	 * @memberof TdAmeritradeService
	 */
	public async getStockQuotes(
		stockSymbols: string[],
	): Promise<TDAmeritradeStock> {
		// Return empty object in the event of a non-symbol array or nullish value
		if (!Array.isArray(stockSymbols)) {
			return {};
		}

		// Create a single string of all symbols combined in lowercase format
		const joinedStockSymbols = stockSymbols
			.map(symbol => symbol.toLowerCase())
			.join(',');

		try {
			const { data } = await this.httpService
				.get<TDAmeritradeStock>('/marketdata/quotes', {
					params: {
						symbol: joinedStockSymbols,
					},
				})
				.toPromise();

			return data;
		} catch (err) {
			this.logger.error(
				`date=${Date.now()} Cannot fetch TD Ameritrade stock symbol data. One of more symbol may be invalid`,
			);
			throw new InternalServerErrorException(
				'Cannot fetch TD Ameritrade stock symbol data. One of more symbol may be invalid',
			);
		}
	}
}
