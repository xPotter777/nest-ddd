import { City, Resident } from './city.entity';
import { DatabaseService } from '../../database/database.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CityRepository {
  constructor(private databaseService: DatabaseService) {}

  async findCities(filter?: string): Promise<City[]> {
    const cityFilterCondition = filter ? 'WHERE c.name LIKE $1' : '';
    const cityFilterParam = filter ? [`%${filter}%`] : [];

    const citiesQuery = `
      SELECT c.name AS city
      FROM cities c
      ${cityFilterCondition}
      ORDER BY c.name`;

    const { rows } = await this.databaseService.query(
      citiesQuery,
      cityFilterParam,
    );

    return rows.map((row) => new City(row.city));
  }

  async findResidents(filter?: string): Promise<Resident[]> {
    const cityFilterCondition = filter ? 'WHERE c.name LIKE $1' : '';
    const cityFilterParam = filter ? [`%${filter}%`] : [];

    const residentsQuery = `
      SELECT 
        c.name AS city, 
        r.first_name 
      FROM residents r
      JOIN cities c ON c.id = r.city_id
      ${cityFilterCondition}`;

    const { rows } = await this.databaseService.query(
      residentsQuery,
      cityFilterParam,
    );

    return rows.map((row) => new Resident(row.first_name, new City(row.city)));
  }
}
