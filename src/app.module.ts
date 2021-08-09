import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TdAmeritradeModule } from './td-ameritrade/td-ameritrade.module';
import { CefConnectModule } from './cef-connect/cef-connect.module';
import { IRCZGraphQLContext } from './shared/types';
import { Request, Response } from 'express';

interface IDefaultGQLContextArgs {
	req: Request;
	res: Response;
}

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		GraphQLModule.forRoot({
			cors: true,
			debug: true,
			introspection: true,
			installSubscriptionHandlers: true,
			sortSchema: true,
			context: ({ req, res }: IDefaultGQLContextArgs): IRCZGraphQLContext => ({
				req,
				res,
				appName: 'RCZ Portfolio',
			}),
			autoSchemaFile: './schema.graphql',
		}),
		TdAmeritradeModule,
		CefConnectModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
