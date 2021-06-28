export class CEFDailyPrice {
  Ticker: string;
  Discount: number;
  DistributionRateNAV: number;
  DistributionRatePrice: number;
  DistributionAmtUSD: number;
  ReturnOnNAV: number;
  CategoryId: number;
  CategoryName: string;
  SponsorId: number;
  SponsorName: string;
  IsManagedDistribution: boolean;
  Price: number;
  PriceChange: number;
  NAV: number;
  NAVPublished: string;
  Cusip: string;
  Name: string;
  LastUpdated: string;
  NavTicker: string;
  Strategy: string;
  LeverageRatioPercentage: number;
  MarketCapUSDm: number;
  UNIIPerShare: number;
  DistributionFrequency: string;
  EarningsPerShare: number;
  CurrentDistribution: number;
  InceptionPrice: number;
  AverageCoupon: number;
  AMTPercentage: number;
  AverageWeightedMaturity: number;
  ExpenseRatio: number;
  BaselineExpense: any;
  TotalAssetsUSDm: number;
  IsLeveraged: boolean;
  IsPriceBelow52WkAvg: boolean;
  IsDiscountBelow52WkAvg: boolean;
  IsAMTPct: boolean;
  IsManaged: boolean;
  Term: boolean;
  AvgWtdDurationLevAdj: number;
  Yr3RetOnNav: number;
  Yr3RetOnPrice: number;
  Yr5RetOnNav: number;
  Yr5RetOnPrice: number;
  YTDRetOnNav: number;
  YTDRetOnPrice: number;
  SinceInceptionRetOnNav: number;
  SinceInceptionRetOnPrice: number;
  ReturnOnPrice: number;
  AvgDailyVolume: number;
  CallableYr1Pct: number;
  PrerefundedPercentage: number;
  AvgBondPrice: number;
  AvgWtdDurationNonLevAdj: null;
  EffDurationLevAdj: number;
  EffDurationNonLevAdj: number;
  Price52WkAvg: number;
  Discount52WkAvg: number;
  ZScore1Yr: number;
  ZScore3M: number;
  ZScore6M: number;
  ZScoreDate: string;
  InceptionDate: string;
  InceptionDateString: string;
  InceptionDateUnixTimestamp: number;
  DistributionDate: string;
}

// Used for Google Sheet
export interface CEFConnectSheetData {
  cefSharePrice: string | null;
  currentDiscount: string | null;
  fiftyTwoWeekLowDiscount: string | null;
  fiftyTwoWeekHighDiscount: string | null;
  fiftyTwoWeekAverageDiscount: string | null;
  distributionFrequency: string | null;
}
