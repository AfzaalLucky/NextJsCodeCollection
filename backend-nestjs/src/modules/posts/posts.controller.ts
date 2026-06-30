import { Controller, Get, Param, Query, NotFoundException, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';

@Controller('api/posts')
@UseGuards(ApiKeyGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(
    @Query('page') page = '1',
    @Query('perPage') perPage = '12',
    @Query('category') category?: string,
  ) {
    if (category) {
      return this.postsService.findByCategory(category, +page, +perPage);
    }
    return this.postsService.findAll(+page, +perPage);
  }

  @Get('slugs')
  async getSlugs(@Query('category') category?: string) {
    if (category) {
      return this.postsService.getSlugsByCategory(category);
    }
    return this.postsService.getSlugs();
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const post = await this.postsService.findOne(slug);
    if (!post) throw new NotFoundException(`Post "${slug}" not found`);
    return post;
  }
}
