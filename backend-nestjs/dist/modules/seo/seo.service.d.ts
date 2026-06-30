import { ConfigService } from '@nestjs/config';
import { ServicesService } from '../services/services.service';
import { PostsService } from '../posts/posts.service';
import { LocationsService } from '../locations/locations.service';
export declare class SeoService {
    private readonly config;
    private readonly servicesService;
    private readonly postsService;
    private readonly locationsService;
    private readonly baseUrl;
    constructor(config: ConfigService, servicesService: ServicesService, postsService: PostsService, locationsService: LocationsService);
    generateSitemap(): Promise<string>;
    getRobotsTxt(): string;
    generateLocalBusinessSchema(overrides?: Record<string, unknown>): {
        '@context': string;
        '@type': string;
        name: string;
        url: string;
        telephone: string;
        address: {
            '@type': string;
            addressLocality: string;
            addressCountry: string;
        };
        areaServed: string[];
        priceRange: string;
    };
    generateServiceSchema(service: {
        title: string;
        excerpt: string;
        slug: string;
    }): {
        '@context': string;
        '@type': string;
        name: string;
        description: string;
        url: string;
        provider: {
            '@type': string;
            name: string;
            url: string;
        };
        areaServed: string;
    };
    generateArticleSchema(post: {
        title: string;
        excerpt: string;
        slug: string;
        date: string;
        modified: string;
    }): {
        '@context': string;
        '@type': string;
        headline: string;
        description: string;
        url: string;
        datePublished: string;
        dateModified: string;
        publisher: {
            '@type': string;
            name: string;
            url: string;
        };
    };
}
