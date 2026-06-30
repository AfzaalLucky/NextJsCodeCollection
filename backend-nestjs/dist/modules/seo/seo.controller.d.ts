import { SeoService } from './seo.service';
export declare class SeoController {
    private readonly seoService;
    constructor(seoService: SeoService);
    getSitemap(): Promise<string>;
    getRobots(): string;
    getLocalBusinessSchema(): {
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
}
