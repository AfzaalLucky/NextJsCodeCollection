import { Injectable } from '@nestjs/common';
import { WordpressService } from '../wordpress/wordpress.service';

@Injectable()
export class LocationsService {
  constructor(private readonly wp: WordpressService) {}

  async findAll() {
    const raw = await this.wp.getLocations();
    return raw.map((item) => this.transform(item));
  }

  async findOne(slug: string) {
    const raw = await this.wp.getLocation(slug);
    if (!raw) return null;
    return this.transform(raw);
  }

  async getSlugs(): Promise<string[]> {
    const raw = await this.wp.getLocations({ per_page: 100 });
    return raw.map((item) => item.slug);
  }

  private transform(item: any) {
    return {
      id: item.id,
      slug: item.slug,
      title: item.title?.rendered || '',
      excerpt: item.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || '',
      content: item.content?.rendered || '',
      featuredImage: this.wp.extractFeaturedImage(item),
      seo: this.wp.extractSeoMeta(item),
      city: item.acf?.city || item.title?.rendered || '',
      region: item.acf?.region || '',
      phone: item.acf?.phone || '',
      date: item.date,
      modified: item.modified,
    };
  }
}
