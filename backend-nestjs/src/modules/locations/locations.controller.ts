import { Controller, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';

@Controller('api/locations')
@UseGuards(ApiKeyGuard)
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  async findAll() {
    return this.locationsService.findAll();
  }

  @Get('slugs')
  async getSlugs() {
    return this.locationsService.getSlugs();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const location = await this.locationsService.findOne(slug);
    if (!location) throw new NotFoundException(`Location "${slug}" not found`);
    return location;
  }
}
