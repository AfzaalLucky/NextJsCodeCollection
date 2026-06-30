import { Controller, Get, Header, UseGuards } from '@nestjs/common';
import { SeoService } from './seo.service';
import { ApiKeyGuard } from '../../common/guards/api-key.guard';

@Controller()
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get('sitemap.xml')
  @Header('Content-Type', 'application/xml')
  async getSitemap() {
    return this.seoService.generateSitemap();
  }

  @Get('robots.txt')
  @Header('Content-Type', 'text/plain')
  getRobots() {
    return this.seoService.getRobotsTxt();
  }

  @Get('api/seo/local-business')
  @UseGuards(ApiKeyGuard)
  getLocalBusinessSchema() {
    return this.seoService.generateLocalBusinessSchema();
  }
}
