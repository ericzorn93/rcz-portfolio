import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CEFDailyPrice } from '../dto/cef.dailyPricing.response';
import { CefConnectService } from '../services/cef-connect.service';

@ApiTags('v1/cef-connect')
@Controller('v1/cef-connect')
export class CefConnectV1Controller {
	constructor(private readonly cefConnectService: CefConnectService) {}

	@ApiOkResponse({
		type: () => [CEFDailyPrice],
	})
	@Get('daily-prices')
	public async cefConnectWelcome(): Promise<CEFDailyPrice[]> {
		return this.cefConnectService.fetchCefConnectDailyPrices();
	}
}
