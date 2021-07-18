import { Injectable } from '@nestjs/common';

import { CEFDailyPrice } from './../../dto/cef.dailyPricing.response';
@Injectable()
export class CefCalculationsService {
	public getEstimatedIncome(fund: CEFDailyPrice): number {
		const { DistributionRatePrice, Price } = fund;

		// DistributionRatePrice - (Yield)
		return (DistributionRatePrice / 100) * Price;
	}
}
