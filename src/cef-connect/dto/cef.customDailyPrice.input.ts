import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class CEFCustomDailyPriceInput {
	@Field(() => Float, {
		defaultValue: 1000,
		description:
			'Money invested applies to the dollar amount invested for all requested ticker symbols from CEF Connect',
	})
	moneyInvested: number;

	@Field(() => String, {
		defaultValue: '',
		description:
			'CSV formatted ticker symbols (ABC,DEF,GHI) that will be parsed for obtaining custom CEF Connect data and calculations',
	})
	tickerSymbols: string;
}
