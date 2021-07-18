import { Controller, Get, Query, ParseFloatPipe } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import {
	CEFDailyPrice,
	CustomCEFDailyPrice,
} from '../dto/cef.dailyPricing.response';
import { CefConnectService } from '../services/primary/cef-connect.service';

@ApiTags('v1/cef-connect')
@Controller('v1/cef-connect')
export class CefConnectV1Controller {
	constructor(private readonly cefConnectService: CefConnectService) {}

	@ApiOkResponse({
		type: () => [CEFDailyPrice],
	})
	@Get('daily-prices')
	public async dailyPrices(): Promise<CEFDailyPrice[]> {
		return this.cefConnectService.fetchCefConnectDailyPrices();
	}

	@ApiOkResponse({
		type: () => [CustomCEFDailyPrice],
	})
	@Get('custom-daily-prices')
	public async customDailyPrices(
		@Query('moneyInvested', ParseFloatPipe) moneyInvested: number,
	): Promise<CustomCEFDailyPrice[]> {
		return this.cefConnectService.fetchDataWithCalculations(moneyInvested);
	}
}
