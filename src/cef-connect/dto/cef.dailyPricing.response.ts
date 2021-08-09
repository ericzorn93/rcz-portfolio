import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType({ description: 'Original CEF Daily Price from CEF Connect API' })
export class CEFDailyPrice {
	@Field(() => String)
	@ApiProperty()
	Ticker: string;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	Discount: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	DistributionRateNAV: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	DistributionRatePrice: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	DistributionAmtUSD: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	ReturnOnNAV: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	CategoryId: number;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	CategoryName: string;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	SponsorId: number;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	SponsorName: string;

	@Field(() => Boolean, { nullable: true })
	@ApiProperty()
	IsManagedDistribution: boolean;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	Price: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	PriceChange: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	NAV: number;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	NAVPublished: string;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	Cusip: string;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	Name: string;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	LastUpdated: string;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	NavTicker: string;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	Strategy: string;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	LeverageRatioPercentage: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	MarketCapUSDm: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	UNIIPerShare: number;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	DistributionFrequency: string;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	EarningsPerShare: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	CurrentDistribution: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	InceptionPrice: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	AverageCoupon: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	AMTPercentage: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	AverageWeightedMaturity: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	ExpenseRatio: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	BaselineExpense: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	TotalAssetsUSDm: number;

	@Field(() => Boolean, { nullable: true })
	@ApiProperty()
	IsLeveraged: boolean;

	@Field(() => Boolean, { nullable: true })
	@ApiProperty()
	IsPriceBelow52WkAvg: boolean;

	@Field(() => Boolean, { nullable: true })
	@ApiProperty()
	IsDiscountBelow52WkAvg: boolean;

	@Field(() => Boolean, { nullable: true })
	@ApiProperty()
	IsAMTPct: boolean;

	@Field(() => Boolean, { nullable: true })
	@ApiProperty()
	IsManaged: boolean;

	@Field(() => Boolean, { nullable: true })
	@ApiProperty()
	Term: boolean;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	AvgWtdDurationLevAdj: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	Yr3RetOnNav: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	Yr3RetOnPrice: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	Yr5RetOnNav: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	Yr5RetOnPrice: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	YTDRetOnNav: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	YTDRetOnPrice: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	SinceInceptionRetOnNav: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	SinceInceptionRetOnPrice: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	ReturnOnPrice: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	AvgDailyVolume: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	CallableYr1Pct: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	PrerefundedPercentage: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	AvgBondPrice: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	AvgWtdDurationNonLevAdj: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	EffDurationLevAdj: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	EffDurationNonLevAdj: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	Price52WkAvg: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	Discount52WkAvg: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	ZScore1Yr: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	ZScore3M: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	ZScore6M: number;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	ZScoreDate: string;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	InceptionDate: string;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	InceptionDateString: string;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	InceptionDateUnixTimestamp: number;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	DistributionDate: string;
}

@ObjectType({
	description:
		'Custom calculations applied to select CEF Connect data for optimal investment insight',
})
export class CustomCEFDailyPrice extends CEFDailyPrice {
	@Field(() => Float, { nullable: true })
	@ApiProperty()
	EstimatedIncome: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	NumberOfSharesPerOneDollarInvested: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	AnnualIncomePerOneDollarInvested: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	AnnualIncomePerOneHundredDollarsInvested: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	MoneyInvested: number;

	@Field(() => Float, { nullable: true })
	@ApiProperty()
	TotalIncome: number;

	@Field(() => String, { nullable: true })
	@ApiProperty()
	CustomUpdated: string;
}

// Used for Google Sheet
export interface CEFConnectSheetData {
	cefSharePrice: string | null;
	currentDiscount: string | null;
	fiftyTwoWeekLowDiscount: string | null;
	fiftyTwoWeekHighDiscount: string | null;
	fiftyTwoWeekAverageDiscount: string | null;
	zScoreThreeMonth: number | null;
	zScoreSixMonth: number | null;
	zScoreOneYear: number | null;
	distributionFrequency: string | null;
}
