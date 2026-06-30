import { ServicesService } from './services.service';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
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
        icon: any;
        price: any;
        features: any;
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
        icon: any;
        price: any;
        features: any;
        date: any;
        modified: any;
    }>;
}
