import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Global Middleware
  app.enableCors();

  // Global Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // Swagger/OpenAPI Documentation
  const config = new DocumentBuilder()
    .setTitle('RCZ Portfolio Spreadsheet API')
    .setDescription(
      'A REST and GraphQL API that interacts with the RCZ Portfolio Google Sheet to pull in latest stock and closed-end fund data.',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Start Server
  const PORT = process.env.PORT ?? 8080;
  await app.listen(PORT, () => {
    Logger.debug(`Server started on port ${PORT}`);
  });
}
bootstrap();
