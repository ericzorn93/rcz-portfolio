import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CefConnectV1Controller } from './controllers/cef-connect-v1.controller';
import { CefConnectService } from './services/primary/cef-connect.service';
import { CefCalculationsService } from './services/cef-calculations/cef-calculations.service';

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
	controllers: [CefConnectV1Controller],
	providers: [CefConnectService, CefCalculationsService],
	exports: [CefConnectService],
})
export class CefConnectModule {}
