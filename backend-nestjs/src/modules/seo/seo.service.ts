import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ServicesService } from '../services/services.service';
import { PostsService } from '../posts/posts.service';
import { LocationsService } from '../locations/locations.service';

@Injectable()
export class SeoService {
  private readonly baseUrl: string;

  constructor(
    private readonly config: ConfigService,
    private readonly servicesService: ServicesService,
    private readonly postsService: PostsService,
    private readonly locationsService: LocationsService,
  ) {
    this.baseUrl = this.config.get<string>('wordpress.baseUrl');
  }

  async generateSitemap(): Promise<string> {
    const [serviceSlugs, postSlugs, locationSlugs] = await Promise.all([
      this.servicesService.getSlugs(),
      this.postsService.getSlugs(),
      this.locationsService.getSlugs(),
    ]);

    const staticUrls = [
      { loc: this.baseUrl, priority: '1.0', changefreq: 'weekly' },
      { loc: `${this.baseUrl}/services`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${this.baseUrl}/blog`, priority: '0.8', changefreq: 'daily' },
      { loc: `${this.baseUrl}/contact`, priority: '0.7', changefreq: 'monthly' },
    ];

    const serviceUrls = serviceSlugs.map((slug) => ({
      loc: `${this.baseUrl}/services/${slug}`,
      priority: '0.9',
      changefreq: 'weekly',
    }));

    const postUrls = postSlugs.map((slug) => ({
      loc: `${this.baseUrl}/blog/${slug}`,
      priority: '0.7',
      changefreq: 'monthly',
    }));

    const locationUrls = locationSlugs.map((slug) => ({
      loc: `${this.baseUrl}/locations/${slug}`,
      priority: '0.8',
      changefreq: 'weekly',
    }));

    const allUrls = [...staticUrls, ...serviceUrls, ...postUrls, ...locationUrls];
    const now = new Date().toISOString().split('T')[0];

    const urlEntries = allUrls
      .map(
        (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
      )
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
  }

  getRobotsTxt(): string {
    return `User-agent: *
Allow: /

Sitemap: ${this.baseUrl}/sitemap.xml`;
  }

  generateLocalBusinessSchema(overrides: Record<string, unknown> = {}) {
    return {
      '@context': 'https://schema.org',
      '@type': 'MovingCompany',
      name: 'Dubai Movers Pro',
      url: this.baseUrl,
      telephone: '+971-XX-XXX-XXXX',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Dubai',
        addressCountry: 'AE',
      },
      areaServed: ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman'],
      priceRange: '$$',
      ...overrides,
    };
  }

  generateServiceSchema(service: { title: string; excerpt: string; slug: string }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.excerpt,
      url: `${this.baseUrl}/services/${service.slug}`,
      provider: {
        '@type': 'MovingCompany',
        name: 'Dubai Movers Pro',
        url: this.baseUrl,
      },
      areaServed: 'Dubai',
    };
  }

  generateArticleSchema(post: {
    title: string;
    excerpt: string;
    slug: string;
    date: string;
    modified: string;
  }) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      url: `${this.baseUrl}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.modified,
      publisher: {
        '@type': 'Organization',
        name: 'Dubai Movers Pro',
        url: this.baseUrl,
      },
    };
  }
}
