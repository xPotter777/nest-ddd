import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ResidentsService {
  constructor(private databaseService: DatabaseService) {}

  async getCityData(cityFilter?: string): Promise<any> {
    console.log(cityFilter);
    const cityCondition = cityFilter ? `WHERE c.name LIKE $1` : '';
    const cityParam = cityFilter ? `%${cityFilter}%` : '';

    const citiesPopulationQuery = `
      SELECT c.name AS city, COUNT(r.id) as count 
      FROM cities c 
      LEFT JOIN residents r ON c.id = r.city_id 
      ${cityCondition}
      GROUP BY c.name 
      ORDER BY count DESC`;

    const citiesPopulation = await this.databaseService.query(
      citiesPopulationQuery,
      cityFilter ? [cityParam] : [],
    );

    const cityMembersQuery = `
    SELECT 
      c.name AS city, 
      r.first_name,
      COUNT(r.id) AS count 
    FROM residents r
    JOIN cities c ON c.id = r.city_id
    ${cityCondition}
    GROUP BY c.name, r.first_name
    ORDER BY c.name, count DESC`;

    let cityMembers;
    if (cityFilter) {
      cityMembers = await this.databaseService.query(cityMembersQuery, [
        cityParam,
      ]);
    } else {
      cityMembers = await this.databaseService.query(cityMembersQuery);
    }

    const organizedCityMembers = cityMembers.rows.reduce((acc, row) => {
      acc[row.city] = acc[row.city] || [];
      acc[row.city].push({
        first_name: row.first_name,
        count: row.count,
      });
      return acc;
    }, {});

    const cityMembersArray = Object.keys(organizedCityMembers).map(city => ({
      city,
      members: organizedCityMembers[city],
    }));

    return {
      cities_population: citiesPopulation.rows,
      city_members: cityMembersArray,
    };
  }
}
