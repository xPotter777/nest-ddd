import { Resident } from '../domain/city.entity';

export class CityRepositoryImplementation {
  getCityPopulation(residents: Resident[]): number {
    return residents.length;
  }

  getCityMembers(residents: Resident[]): Resident[] {
    return residents;
  }
}
