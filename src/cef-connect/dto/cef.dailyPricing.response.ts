import { ApiProperty } from '@nestjs/swagger';

export class CEFDailyPrice {
	@ApiProperty()
	Ticker: string;

	@ApiProperty()
	Discount: number;

	@ApiProperty()
	DistributionRateNAV: number;

	@ApiProperty()
	DistributionRatePrice: number;

	@ApiProperty()
	DistributionAmtUSD: number;

	@ApiProperty()
	ReturnOnNAV: number;

	@ApiProperty()
	CategoryId: number;

	@ApiProperty()
	CategoryName: string;

	@ApiProperty()
	SponsorId: number;

	@ApiProperty()
	SponsorName: string;

	@ApiProperty()
	IsManagedDistribution: boolean;

	@ApiProperty()
	Price: number;

	@ApiProperty()
	PriceChange: number;

	@ApiProperty()
	NAV: number;

	@ApiProperty()
	NAVPublished: string;

	@ApiProperty()
	Cusip: string;

	@ApiProperty()
	Name: string;

	@ApiProperty()
	LastUpdated: string;

	@ApiProperty()
	NavTicker: string;

	@ApiProperty()
	Strategy: string;

	@ApiProperty()
	LeverageRatioPercentage: number;

	@ApiProperty()
	MarketCapUSDm: number;

	@ApiProperty()
	UNIIPerShare: number;

	@ApiProperty()
	DistributionFrequency: string;

	@ApiProperty()
	EarningsPerShare: number;

	@ApiProperty()
	CurrentDistribution: number;

	@ApiProperty()
	InceptionPrice: number;

	@ApiProperty()
	AverageCoupon: number;

	@ApiProperty()
	AMTPercentage: number;

	@ApiProperty()
	AverageWeightedMaturity: number;

	@ApiProperty()
	ExpenseRatio: number;

	@ApiProperty()
	BaselineExpense: any;

	@ApiProperty()
	TotalAssetsUSDm: number;

	@ApiProperty()
	IsLeveraged: boolean;

	@ApiProperty()
	IsPriceBelow52WkAvg: boolean;

	@ApiProperty()
	IsDiscountBelow52WkAvg: boolean;

	@ApiProperty()
	IsAMTPct: boolean;

	@ApiProperty()
	IsManaged: boolean;

	@ApiProperty()
	Term: boolean;

	@ApiProperty()
	AvgWtdDurationLevAdj: number;

	@ApiProperty()
	Yr3RetOnNav: number;

	@ApiProperty()
	Yr3RetOnPrice: number;

	@ApiProperty()
	Yr5RetOnNav: number;

	@ApiProperty()
	Yr5RetOnPrice: number;

	@ApiProperty()
	YTDRetOnNav: number;

	@ApiProperty()
	YTDRetOnPrice: number;

	@ApiProperty()
	SinceInceptionRetOnNav: number;

	@ApiProperty()
	SinceInceptionRetOnPrice: number;

	@ApiProperty()
	ReturnOnPrice: number;

	@ApiProperty()
	AvgDailyVolume: number;

	@ApiProperty()
	CallableYr1Pct: number;

	@ApiProperty()
	PrerefundedPercentage: number;

	@ApiProperty()
	AvgBondPrice: number;

	@ApiProperty()
	AvgWtdDurationNonLevAdj: null;

	@ApiProperty()
	EffDurationLevAdj: number;

	@ApiProperty()
	EffDurationNonLevAdj: number;

	@ApiProperty()
	Price52WkAvg: number;

	@ApiProperty()
	Discount52WkAvg: number;

	@ApiProperty()
	ZScore1Yr: number;

	@ApiProperty()
	ZScore3M: number;

	@ApiProperty()
	ZScore6M: number;

	@ApiProperty()
	ZScoreDate: string;

	@ApiProperty()
	InceptionDate: string;

	@ApiProperty()
	InceptionDateString: string;

	@ApiProperty()
	InceptionDateUnixTimestamp: number;

	@ApiProperty()
	DistributionDate: string;
}

export class CustomCEFDailyPrice extends CEFDailyPrice {
	@ApiProperty()
	EstimatedIncome: number;

	@ApiProperty()
	NumberOfSharesPerOneDollarInvested: number;

	@ApiProperty()
	AnnualIncomePerOneDollarInvested: number;

	@ApiProperty()
	AnnualIncomePerOneHundredDollarsInvested: number;

	@ApiProperty()
	MoneyInvested: number;

	@ApiProperty()
	TotalIncome: number;
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
