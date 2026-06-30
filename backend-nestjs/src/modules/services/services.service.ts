import { Injectable } from '@nestjs/common';
import { WordpressService } from '../wordpress/wordpress.service';

@Injectable()
export class ServicesService {
  constructor(private readonly wp: WordpressService) {}

  async findAll() {
    const raw = await this.wp.getServices();
    return raw.map((item) => this.transform(item));
  }

  async findOne(slug: string) {
    const raw = await this.wp.getService(slug);
    if (!raw) return null;
    return this.transform(raw);
  }

  async getSlugs(): Promise<string[]> {
    const raw = await this.wp.getServices({ per_page: 100 });
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
      // ACF fields (Advanced Custom Fields plugin)
      icon: item.acf?.icon || '',
      price: item.acf?.price || '',
      features: item.acf?.features || [],
      date: item.date,
      modified: item.modified,
    };
  }
}
