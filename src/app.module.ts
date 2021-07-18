import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TdAmeritradeModule } from './td-ameritrade/td-ameritrade.module';
import { CefConnectModule } from './cef-connect/cef-connect.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TdAmeritradeModule,
		CefConnectModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
