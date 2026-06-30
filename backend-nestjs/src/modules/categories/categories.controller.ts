import { Controller, Get, Param, NotFoundException, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';

@Controller('api/categories')
@UseGuards(ApiKeyGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const cat = await this.categoriesService.findBySlug(slug);
    if (!cat) throw new NotFoundException(`Category "${slug}" not found`);
    return cat;
  }
}
