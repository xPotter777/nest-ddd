import { Module } from '@nestjs/common';
import { ResidentsController } from './residents.controller';
import { ResidentsService } from './residents.service';
import { DatabaseModule } from '../database/database.module';
import { CityRepositoryImplementation } from './infrastructure/city.repository.impl';
import { CityRepository } from './domain/city.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ResidentsController],
  providers: [ResidentsService, CityRepository, CityRepositoryImplementation],
})
export class ResidentsModule {}
