import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { ResidentsModule } from './residents/residents.module';
import { DatabaseModule } from './database/database.module';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      isGlobal: true,
    }),
    ResidentsModule,
    DatabaseModule,
    LoggingModule,
  ],
})
export class AppModule {}
