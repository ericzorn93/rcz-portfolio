import { Controller, Get, Query, ParseFloatPipe, Logger } from '@nestjs/common';
import {
	ApiInternalServerErrorResponse,
	ApiOkResponse,
	ApiQuery,
	ApiTags,
} from '@nestjs/swagger';

import {
	CEFDailyPrice,
	CustomCEFDailyPrice,
} from '../dto/cef.dailyPricing.response';
import { CefConnectService } from '../services/primary/cef-connect.service';

@ApiTags('v1/cef-connect')
@Controller('v1/cef-connect')
export class CefConnectV1Controller {
	private readonly logger = new Logger('CefConnectV1Controller');

	constructor(private readonly cefConnectService: CefConnectService) {}

	@ApiOkResponse({
		type: () => CEFDailyPrice,
		isArray: true,
	})
	@ApiInternalServerErrorResponse()
	@Get('daily-prices')
	public async dailyPrices(): Promise<CEFDailyPrice[]> {
		this.logger.debug(`date=${Date.now()} fetching cef connect daily prices`);

		return this.cefConnectService.fetchCefConnectDailyPrices();
	}

	@ApiQuery({
		type: () => Number,
		name: 'moneyInvested',
		description: 'Total numeric value of money invested into closed-end fund',
		example: 1000,
	})
	@ApiQuery({
		type: () => String,
		name: 'tickerSymbols',
		description:
			'All ticker symbols that are separated by commas (ex. ABC,DEF,GHI) to obtain CEF data for',
		required: false,
	})
	@ApiOkResponse({
		type: () => CustomCEFDailyPrice,
		isArray: true,
	})
	@ApiInternalServerErrorResponse()
	@Get('custom-daily-prices')
	public async customDailyPrices(
		@Query('moneyInvested', ParseFloatPipe) moneyInvested = 1000,
		@Query('tickerSymbols') tickerSymbols = '',
	): Promise<CustomCEFDailyPrice[]> {
		this.logger.debug(
			`date=${Date.now()} fetching custom cef connect daily prices`,
		);

		return this.cefConnectService.fetchDataWithCalculations(
			moneyInvested,
			tickerSymbols,
		);
	}

	@ApiOkResponse({
		type: String,
		isArray: true,
		description:
			'All Ticker Symbols from the CEF Connect Daily Pricing (All closed-end funds)',
	})
	@ApiInternalServerErrorResponse()
	@Get('symbols')
	public async getStockTickers(): Promise<string[]> {
		this.logger.debug(
			`date=${Date.now()} fetching all closed end fund ticker symbols`,
		);

		return this.cefConnectService.fetchCefTickers();
	}
}
