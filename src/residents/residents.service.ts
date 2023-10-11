import { Injectable } from '@nestjs/common';
import { CityRepositoryImplementation } from './infrastructure/city.repository.impl';
import { CityRepository } from './domain/city.repository';

@Injectable()
export class ResidentsService {
  constructor(
    private cityRepositoryImplementation: CityRepositoryImplementation,
    private cityRepository: CityRepository,
  ) {}

  async getCityData(cityFilter?: string): Promise<any> {
    const cities = await this.cityRepository.findCities(cityFilter);
    const residents = await this.cityRepository.findResidents(cityFilter);

    const citiesPopulation = cities.map((city) => {
      const cityResidents = residents.filter(
        (resident) => resident.city.name === city.name,
      );
      return {
        city: city.name,
        count:
          this.cityRepositoryImplementation.getCityPopulation(cityResidents),
      };
    });

    const cityMembers = cities.map((city) => {
      const cityResidents = residents.filter(
        (resident) => resident.city.name === city.name,
      );
      return {
        city: city.name,
        members: this.cityRepositoryImplementation
          .getCityMembers(cityResidents)
          .map((resident) => {
            return {
              first_name: resident.firstName,
            };
          }),
      };
    });

    return {
      cities_population: citiesPopulation,
      city_members: cityMembers,
    };
  }
}
