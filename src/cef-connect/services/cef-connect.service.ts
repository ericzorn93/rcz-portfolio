import { HttpService, Injectable, Logger } from '@nestjs/common';
import { CEFDailyPrice } from '../dto/cef.dailyPricing.response';

@Injectable()
export class CefConnectService {
  private readonly logger = new Logger('CefConnectService');

  constructor(private readonly httpService: HttpService) {}

  /**
   * Obtains all stock information from CEF Connect,
   * specifically for closed end funds
   *
   * @return {*}  {Promise<CEFDailyPrice[]>}
   * @memberof CefConnectService
   */
  public async getClosedEndFundPricing(): Promise<CEFDailyPrice[]> {
    try {
      const time = Date.now();

      const { data: dailyPrices } = await this.httpService
        .get<CEFDailyPrice[]>(`/DailyPricing?&_=${time}`)
        .toPromise();

      return dailyPrices;
    } catch (err) {
      this.logger.warn(
        `date=${Date.now()} Error fetching stock symbol list from CEF Connect`,
      );
      return null;
    }
  }
}
