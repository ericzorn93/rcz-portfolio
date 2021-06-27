import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Global Middleware
  app.enableCors();

  // Global Pipes
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const PORT = process.env.PORT ?? 8080;
  await app.listen(PORT, () => {
    Logger.debug(`Server started on port ${PORT}`);
  });
}
bootstrap();
