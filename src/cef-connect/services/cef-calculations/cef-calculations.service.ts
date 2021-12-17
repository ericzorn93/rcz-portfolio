import { Injectable } from '@nestjs/common';

import { CEFDailyPrice } from './../../dto/cef.dailyPricing.response';
@Injectable()
export class CefCalculationsService {
	/**
	 * Calculate the final yield/estimated income amount
	 * for the current CEF calculation.
	 *
	 * @param {CEFDailyPrice} fund
	 * @return {*}  {number}
	 * @memberof CefCalculationsService
	 */
	public getEstimatedIncome(fund: CEFDailyPrice): number {
		const { DistributionRatePrice, Price } = fund;

		// DistributionRatePrice - (Yield)
		const calculated = (DistributionRatePrice / 100) * Price;
		return this.useDecimalPlaces(calculated);
	}

	/**
	 * Calculates the number of shares per one dollar invested
	 * for the closed end fund.
	 *
	 * @param {CEFDailyPrice} fund
	 * @return {*}  {number}
	 * @memberof CefCalculationsService
	 */
	public getNumberOfSharedPerOneDollarInvested(fund: CEFDailyPrice): number {
		const { Price } = fund;

		const calculated = 1 / Price;
		return this.useDecimalPlaces(calculated);
	}

	/**
	 * Calculates the annual income per one dollar invested
	 * for the closed end fund.
	 *
	 * @param {CEFDailyPrice} fund
	 * @return {*}  {number}
	 * @memberof CefCalculationsService
	 */
	public getAnnualIncomePerOneDollarInvested(fund: CEFDailyPrice): number {
		const numberOfSharesPerOneDollarInvested = this.getNumberOfSharedPerOneDollarInvested(
			fund,
		);
		const estimatedIncome = this.getEstimatedIncome(fund);

		const calculated = numberOfSharesPerOneDollarInvested * estimatedIncome;
		return this.useDecimalPlaces(calculated);
	}

	/**
	 * Calculates the annual income per one-hundred dollars invested
	 * for the closed end fund.
	 *
	 * @param {CEFDailyPrice} fund
	 * @return {*}  {number}
	 * @memberof CefCalculationsService
	 */
	public getAnnualIncomePerOneHundredDollarsInvested(
		fund: CEFDailyPrice,
	): number {
		const annualIncomePerOneDollarInvested = this.getAnnualIncomePerOneDollarInvested(
			fund,
		);

		const calculated = annualIncomePerOneDollarInvested * 100;
		return this.useDecimalPlaces(calculated);
	}

	/**
	 * Calculates the total income for the closed end fund.
	 *
	 * @param {CEFDailyPrice} fund
	 * @return {*}  {number}
	 * @memberof CefCalculationsService
	 */
	public getTotalIncome(moneyInvested: number, fund: CEFDailyPrice): number {
		const annualIncomePerOneHundredDollarsInvested = this.getAnnualIncomePerOneHundredDollarsInvested(
			fund,
		);

		const calculated =
			(moneyInvested / 100) * annualIncomePerOneHundredDollarsInvested;

		return this.useDecimalPlaces(calculated);
	}

	/**
	 * Rounds the number to the specified number of decimal places/
	 * The default number of rounded decimal places is 3
	 *
	 * @private
	 * @param {number} calculatedValue
	 * @param {[number=3]} numberOfDecimalsPlaces
	 * @return {*}  {number}
	 * @memberof CefCalculationsService
	 */
	private useDecimalPlaces(
		calculatedValue: number,
		numberOfDecimalsPlaces = 3,
	): number {
		const stringifiedRoundedValue = calculatedValue.toFixed(
			numberOfDecimalsPlaces,
		);
		return parseFloat(stringifiedRoundedValue);
	}
}
