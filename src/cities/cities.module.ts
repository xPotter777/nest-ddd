import { Module } from '@nestjs/common';
import { CitiesController } from './cities.controller';
import { CitiesService } from "./cities.service";
import { DatabaseModule } from '../database/database.module';
import { CityRepositoryImplementation } from './infrastructure/city.repository.impl';
import { CityRepository } from './domain/city.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [CitiesController],
  providers: [CitiesService, CityRepository, CityRepositoryImplementation],
})
export class CitiesModule {}
