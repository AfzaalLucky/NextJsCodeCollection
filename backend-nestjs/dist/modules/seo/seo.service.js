"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeoService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const services_service_1 = require("../services/services.service");
const posts_service_1 = require("../posts/posts.service");
const locations_service_1 = require("../locations/locations.service");
let SeoService = class SeoService {
    constructor(config, servicesService, postsService, locationsService) {
        this.config = config;
        this.servicesService = servicesService;
        this.postsService = postsService;
        this.locationsService = locationsService;
        this.baseUrl = this.config.get('wordpress.baseUrl');
    }
    async generateSitemap() {
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
            .map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`)
            .join('\n');
        return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
    }
    getRobotsTxt() {
        return `User-agent: *
Allow: /

Sitemap: ${this.baseUrl}/sitemap.xml`;
    }
    generateLocalBusinessSchema(overrides = {}) {
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
    generateServiceSchema(service) {
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
    generateArticleSchema(post) {
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
};
exports.SeoService = SeoService;
exports.SeoService = SeoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        services_service_1.ServicesService,
        posts_service_1.PostsService,
        locations_service_1.LocationsService])
], SeoService);
//# sourceMappingURL=seo.service.js.map