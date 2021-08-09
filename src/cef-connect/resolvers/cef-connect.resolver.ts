import { Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { CEFCustomDailyPriceInput } from '../dto/cef.customDailyPrice.input';
import {
	CEFDailyPrice,
	CustomCEFDailyPrice,
} from '../dto/cef.dailyPricing.response';
import { CefConnectService } from '../services/primary/cef-connect.service';

@Resolver()
export class CefConnectResolver {
	private readonly logger = new Logger('CefConnectResolver');

	constructor(private readonly cefConnectService: CefConnectService) {}

	@Query(() => [CEFDailyPrice])
	public cefConnectDailyPrices(): Promise<CEFDailyPrice[]> {
		this.logger.debug(`date=${Date.now()} fetching cef connect daily prices`);

		return this.cefConnectService.fetchCefConnectDailyPrices();
	}

	@Query(() => [CustomCEFDailyPrice])
	public cefConnectCustomDailyPrices(
		@Args('input', {
			nullable: true,
			description:
				'Accepts the requested money invested and ticker symbols requested from CEF Connect data',
		})
		{ moneyInvested = 1000, tickerSymbols = '' }: CEFCustomDailyPriceInput,
	): Promise<CustomCEFDailyPrice[]> {
		this.logger.debug(
			`date=${Date.now()} fetching custom cef connect daily prices`,
		);

		return this.cefConnectService.fetchDataWithCalculations(
			moneyInvested,
			tickerSymbols,
		);
	}
}
