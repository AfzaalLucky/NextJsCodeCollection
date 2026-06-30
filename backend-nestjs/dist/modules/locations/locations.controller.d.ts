import { LocationsService } from './locations.service';
export declare class LocationsController {
    private readonly locationsService;
    constructor(locationsService: LocationsService);
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
    getSlugs(): Promise<string[]>;
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
}
