import { Injectable } from '@nestjs/common';
import { WordpressService } from '../wordpress/wordpress.service';

export interface WPCategory {
  id: number;
  slug: string;
  name: string;
  description: string;
  count: number;
  parent: number;
}

@Injectable()
export class CategoriesService {
  constructor(private readonly wp: WordpressService) {}

  async findAll(): Promise<WPCategory[]> {
    const raw = await this.wp.getCategories();
    return raw
      .filter((c) => c.count > 0) // only categories that have posts
      .map((c) => ({
        id: c.id,
        slug: c.slug,
        name: c.name,
        description: c.description || '',
        count: c.count,
        parent: c.parent,
      }));
  }

  async findBySlug(slug: string): Promise<WPCategory | null> {
    const all = await this.findAll();
    return all.find((c) => c.slug === slug) || null;
  }

  async findIdBySlug(slug: string): Promise<number | null> {
    const cat = await this.findBySlug(slug);
    return cat?.id ?? null;
  }
}
