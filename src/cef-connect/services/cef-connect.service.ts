import { HttpService, Injectable, Logger } from '@nestjs/common';
import * as cheerio from 'cheerio';

@Injectable()
export class CefConnectService {
  private readonly logger = new Logger('CefConnectService');

  constructor(private readonly httpService: HttpService) {}

  public async getClosedEndFundPricing(stockSymbol: string): Promise<any> {
    try {
      const { data: cefHtml } = await this.httpService
        .get<string>(`/${stockSymbol}`, {
          headers: {
            accept: 'text/html',
          },
        })
        .toPromise();

      const $ = cheerio.load(cefHtml);
      const table = $('table.cefconnect-table-1').html();
      console.log(table);
    } catch (err) {
      this.logger.warn(
        `date=${Date.now()} Error fetching stock symbol from CEF Connect and/or stock symbol ${stockSymbol} does not exist`,
      );
      return null;
    }
  }
}
