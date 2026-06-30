import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class WordpressService {
  private readonly logger = new Logger(WordpressService.name);
  private readonly apiUrl: string;
  private readonly authHeader: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.apiUrl = this.config.get<string>('wordpress.apiUrl');
    const user = this.config.get<string>('wordpress.username');
    const pass = this.config.get<string>('wordpress.appPassword');
    if (user && pass) {
      this.authHeader = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');
    }
  }

  private getRequestConfig(): AxiosRequestConfig {
    const headers: Record<string, string> = {};
    if (this.authHeader) {
      headers['Authorization'] = this.authHeader;
    }
    return { headers };
  }

  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    try {
      const url = `${this.apiUrl}${endpoint}`;
      const config = { ...this.getRequestConfig(), params };
      const response = await firstValueFrom(this.http.get<T>(url, config));
      return response.data;
    } catch (error) {
      this.logger.error(`WordPress API error [${endpoint}]: ${error.message}`);
      throw new HttpException(
        `Failed to fetch from WordPress: ${error.message}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getPosts(params?: Record<string, unknown>) {
    return this.get<any[]>('/posts', { per_page: 12, _embed: true, ...params });
  }

  async getPost(slug: string) {
    const posts = await this.get<any[]>('/posts', { slug, _embed: true });
    return posts[0] || null;
  }

  async getPages(params?: Record<string, unknown>) {
    return this.get<any[]>('/pages', { per_page: 100, _embed: true, ...params });
  }

  async getPage(slug: string) {
    const pages = await this.get<any[]>('/pages', { slug, _embed: true });
    return pages[0] || null;
  }

  // Custom post type: services (register CPT in WordPress)
  async getServices(params?: Record<string, unknown>) {
    return this.get<any[]>('/services', { per_page: 100, _embed: true, ...params });
  }

  async getService(slug: string) {
    const items = await this.get<any[]>('/services', { slug, _embed: true });
    return items[0] || null;
  }

  // Custom post type: locations
  async getLocations(params?: Record<string, unknown>) {
    return this.get<any[]>('/locations', { per_page: 100, _embed: true, ...params });
  }

  async getLocation(slug: string) {
    const items = await this.get<any[]>('/locations', { slug, _embed: true });
    return items[0] || null;
  }

  async getCategories() {
    return this.get<any[]>('/categories', { per_page: 100 });
  }

  async getTags() {
    return this.get<any[]>('/tags', { per_page: 100 });
  }

  // Extract featured image from embedded data
  extractFeaturedImage(item: any) {
    const media = item?._embedded?.['wp:featuredmedia']?.[0];
    if (!media) return null;
    return {
      id: media.id,
      url: media.source_url,
      alt: media.alt_text || media.title?.rendered || '',
      width: media.media_details?.width || 0,
      height: media.media_details?.height || 0,
    };
  }

  // Extract Yoast SEO data if plugin is installed
  extractSeoMeta(item: any) {
    const yoast = item?.yoast_head_json;
    return {
      title: yoast?.title || item?.title?.rendered || '',
      description: yoast?.description || item?.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || '',
      canonical: yoast?.canonical || '',
      ogImage: yoast?.og_image?.[0]?.url || this.extractFeaturedImage(item)?.url || '',
    };
  }
}
