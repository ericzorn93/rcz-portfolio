import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SheetsModule } from './sheets/sheets.module';
import { TdAmeritradeModule } from './td-ameritrade/td-ameritrade.module';
import { CefConnectModule } from './cef-connect/cef-connect.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisHost = configService.get<string>('HEROKU_REDIS_HOST');
        const redisPassword = configService.get<string>(
          'HEROKU_REDIS_PASSWORD',
        );
        const redisPort = Number.parseInt(
          configService.get<string>('HEROKU_REDIS_PORT'),
        );

        return {
          limiter: {
            max: 10_000, /// 10000 Jobs
            duration: 10_000, // 10 Seconds
          },
          redis: {
            host: redisHost,
            password: redisPassword,
            port: redisPort,
            tls: {
              servername: redisHost,
              requestCert: true,
              rejectUnauthorized: false,
            },
          },
        };
      },
    }),
    SheetsModule,
    TdAmeritradeModule,
    CefConnectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
