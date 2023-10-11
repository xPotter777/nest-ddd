import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CitiesService } from './cities.service';
import { ResidentDTO } from './dto/residents.dto';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Get('city-data')
  @ApiQuery({ name: 'city', required: false, type: String, description: 'Partial city name to filter results' })
  @ApiResponse({ status: 200, type: [ResidentDTO] })
  async getCityData(@Query('city') city?: string): Promise<ResidentDTO[]> {
    return await this.citiesService.getCityData(city);
  }
}
