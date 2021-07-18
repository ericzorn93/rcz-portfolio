import { Controller, Get, Query, ParseFloatPipe, Logger } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

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
	@Get('daily-prices')
	public async dailyPrices(): Promise<CEFDailyPrice[]> {
		this.logger.debug(`date=${Date.now()} fetching cef connect daily prices`);

		return this.cefConnectService.fetchCefConnectDailyPrices();
	}

	@ApiOkResponse({
		type: () => CustomCEFDailyPrice,
		isArray: true,
	})
	@Get('custom-daily-prices')
	public async customDailyPrices(
		@Query('moneyInvested', ParseFloatPipe) moneyInvested: number,
	): Promise<CustomCEFDailyPrice[]> {
		this.logger.debug(
			`date=${Date.now()} fetching custom cef connect daily prices`,
		);

		return this.cefConnectService.fetchDataWithCalculations(moneyInvested);
	}
}
