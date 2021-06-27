import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SheetsModule } from './sheets/sheets.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SheetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
