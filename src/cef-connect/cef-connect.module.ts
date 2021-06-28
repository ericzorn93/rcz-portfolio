import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CefConnectService } from './services/cef-connect.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const baseURL = configService.get<string>('CEF_CONNECT_BASE_URL');

        return {
          baseURL,
        };
      },
    }),
  ],
  providers: [CefConnectService],
  exports: [CefConnectService],
})
export class CefConnectModule {}
