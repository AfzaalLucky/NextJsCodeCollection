import { Controller, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';

@Controller('api/services')
@UseGuards(ApiKeyGuard)
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll() {
    return this.servicesService.findAll();
  }

  @Get('slugs')
  async getSlugs() {
    return this.servicesService.getSlugs();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const service = await this.servicesService.findOne(slug);
    if (!service) throw new NotFoundException(`Service "${slug}" not found`);
    return service;
  }
}
