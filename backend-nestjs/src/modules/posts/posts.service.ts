import { Injectable } from '@nestjs/common';
import { WordpressService } from '../wordpress/wordpress.service';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class PostsService {
  constructor(
    private readonly wp: WordpressService,
    private readonly categoriesService: CategoriesService,
  ) {}

  async findAll(page = 1, perPage = 12) {
    const raw = await this.wp.getPosts({ page, per_page: perPage });
    return raw.map((item) => this.transform(item));
  }

  async findByCategory(categorySlug: string, page = 1, perPage = 12) {
    const categoryId = await this.categoriesService.findIdBySlug(categorySlug);
    if (!categoryId) return [];
    const raw = await this.wp.getPosts({ categories: categoryId, page, per_page: perPage });
    return raw.map((item) => this.transform(item));
  }

  async findOne(slug: string) {
    const raw = await this.wp.getPost(slug);
    if (!raw) return null;
    return this.transform(raw);
  }

  async getSlugs(): Promise<string[]> {
    const raw = await this.wp.getPosts({ per_page: 100 });
    return raw.map((item) => item.slug);
  }

  async getSlugsByCategory(categorySlug: string): Promise<string[]> {
    const categoryId = await this.categoriesService.findIdBySlug(categorySlug);
    if (!categoryId) return [];
    const raw = await this.wp.getPosts({ categories: categoryId, per_page: 100 });
    return raw.map((item) => item.slug);
  }

  private transform(item: any) {
    const categories = item._embedded?.['wp:term']?.[0]?.map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
    })) || [];
    const tags = item._embedded?.['wp:term']?.[1]?.map((t: any) => t.name) || [];
    return {
      id: item.id,
      slug: item.slug,
      title: item.title?.rendered || '',
      excerpt: item.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || '',
      content: item.content?.rendered || '',
      date: item.date,
      modified: item.modified,
      featuredImage: this.wp.extractFeaturedImage(item),
      // categories is now an array of objects {id, name, slug}
      categories,
      tags,
      seo: this.wp.extractSeoMeta(item),
    };
  }
}
