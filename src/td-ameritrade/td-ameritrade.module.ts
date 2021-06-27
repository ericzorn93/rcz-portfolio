import { Module, HttpModule } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { TdAmeritradeController } from './controllers/v1/td-ameritrade.controller';
import { TdAmeritradeService } from './services/td-ameritrade/td-ameritrade.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const baseURL = configService.get<string>('TD_AMERITRADE_BASE_URL');
        const apiKey = configService.get<string>(
          'TD_AMERITRADE_DEVELOPER_API_KEY',
        );

        return {
          baseURL,
          params: {
            apikey: apiKey,
          },
        };
      },
    }),
  ],
  providers: [TdAmeritradeService],
  controllers: [TdAmeritradeController],
  exports: [TdAmeritradeService],
})
export class TdAmeritradeModule {}
