import { WordpressService } from '../wordpress/wordpress.service';
export declare class LocationsService {
    private readonly wp;
    constructor(wp: WordpressService);
    findAll(): Promise<{
        id: any;
        slug: any;
        title: any;
        excerpt: any;
        content: any;
        featuredImage: {
            id: any;
            url: any;
            alt: any;
            width: any;
            height: any;
        };
        seo: {
            title: any;
            description: any;
            canonical: any;
            ogImage: any;
        };
        city: any;
        region: any;
        phone: any;
        date: any;
        modified: any;
    }[]>;
    findOne(slug: string): Promise<{
        id: any;
        slug: any;
        title: any;
        excerpt: any;
        content: any;
        featuredImage: {
            id: any;
            url: any;
            alt: any;
            width: any;
            height: any;
        };
        seo: {
            title: any;
            description: any;
            canonical: any;
            ogImage: any;
        };
        city: any;
        region: any;
        phone: any;
        date: any;
        modified: any;
    }>;
    getSlugs(): Promise<string[]>;
    private transform;
}
