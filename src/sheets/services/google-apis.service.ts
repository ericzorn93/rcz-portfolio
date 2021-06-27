import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, sheets_v4 } from 'googleapis';
import { GaxiosPromise } from 'googleapis/build/src/apis/abusiveexperiencereport';

@Injectable()
export class GoogleApisService {
  constructor(private readonly configService: ConfigService) {}

  private readonly sheets = google.sheets({
    version: 'v4',
    auth: this.configService.get('GOOGLE_API_KEY'),
  });

  public async getSheet(): Promise<void> {
    const spreadsheetId = this.configService.get(
      'GOOGLE_RCZ_PORTFOLIO_SPREADSHEET_ID',
    );

    let sheet: GaxiosPromise<sheets_v4.Schema$Spreadsheet>;
    try {
      sheet = this.sheets.spreadsheets.get({
        spreadsheetId,
      });
      console.log(sheet);
    } catch (err) {
      console.log(err);
    }
  }
}
