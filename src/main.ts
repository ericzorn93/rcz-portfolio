import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { writeFileSync } from 'fs';
import { join } from 'path';

import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule);

	// Allow microservice start from NestJS over TCP
	await app.startAllMicroservices();

	// Global Middleware
	app.enableCors();

	// Global Pipes
	app.useGlobalPipes(new ValidationPipe({ transform: true }));

	// Static Files
	app.useStaticAssets(join(__dirname, '..', 'public'));

	// Global Middleware
	app.use(cookieParser());

	// Swagger/OpenAPI Documentation and write swagger spec on startup
	const config = new DocumentBuilder()
		.setTitle('RCZ Portfolio Spreadsheet API')
		.setDescription(
			'A REST and GraphQL API that interacts with the RCZ Portfolio Google Sheet to pull in latest stock and closed-end fund data.',
		)
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	try {
		writeFileSync('./public/docs/swagger-spec.json', JSON.stringify(document));
	} catch (err) {
		console.log(err);

		Logger.error(
			`date=${Date.now()} Had trouble outputting schema to JSON file`,
		);
	}
	SwaggerModule.setup('api-docs', app, document);

	// Start Server
	const PORT = process.env.PORT ?? 8080;
	await app.listen(PORT, () => {
		Logger.debug(`Server started on port ${PORT}`);
	});
}
bootstrap();
