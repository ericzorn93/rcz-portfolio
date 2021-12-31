import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';

import { CefConnectV1Controller } from './controllers/cef-connect-v1.controller';
import { CefConnectService } from './services/primary/cef-connect.service';
import { CefCalculationsService } from './services/cef-calculations/cef-calculations.service';
import { CefConnectResolver } from './resolvers/cef-connect.resolver';
import { CefConnectGateway } from './gateways/cef-connect.gateway';

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
	providers: [
		CefConnectService,
		CefCalculationsService,
		CefConnectResolver,
		CefConnectGateway,
	],
	exports: [CefConnectService],
})
export class CefConnectModule {}
