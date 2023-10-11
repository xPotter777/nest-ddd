import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResidentsService } from './residents.service';
import { ResidentDTO } from './dto/residents.dto';

@ApiTags('residents')
@Controller('residents')
export class ResidentsController {
  constructor(private residentsService: ResidentsService) {}

  @Get('city-data')
  @ApiQuery({ name: 'city', required: false, type: String, description: 'Partial city name to filter results' })
  @ApiResponse({ status: 200, type: [ResidentDTO] })
  async getCityData(@Query('city') city?: string): Promise<ResidentDTO[]> {
    return await this.residentsService.getCityData(city);
  }
}
