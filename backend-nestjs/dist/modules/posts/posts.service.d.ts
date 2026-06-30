import { WordpressService } from '../wordpress/wordpress.service';
import { CategoriesService } from '../categories/categories.service';
export declare class PostsService {
    private readonly wp;
    private readonly categoriesService;
    constructor(wp: WordpressService, categoriesService: CategoriesService);
    findAll(page?: number, perPage?: number): Promise<{
        id: any;
        slug: any;
        title: any;
        excerpt: any;
        content: any;
        date: any;
        modified: any;
        featuredImage: {
            id: any;
            url: any;
            alt: any;
            width: any;
            height: any;
        };
        categories: any;
        tags: any;
        seo: {
            title: any;
            description: any;
            canonical: any;
            ogImage: any;
        };
    }[]>;
    findByCategory(categorySlug: string, page?: number, perPage?: number): Promise<{
        id: any;
        slug: any;
        title: any;
        excerpt: any;
        content: any;
        date: any;
        modified: any;
        featuredImage: {
            id: any;
            url: any;
            alt: any;
            width: any;
            height: any;
        };
        categories: any;
        tags: any;
        seo: {
            title: any;
            description: any;
            canonical: any;
            ogImage: any;
        };
    }[]>;
    findOne(slug: string): Promise<{
        id: any;
        slug: any;
        title: any;
        excerpt: any;
        content: any;
        date: any;
        modified: any;
        featuredImage: {
            id: any;
            url: any;
            alt: any;
            width: any;
            height: any;
        };
        categories: any;
        tags: any;
        seo: {
            title: any;
            description: any;
            canonical: any;
            ogImage: any;
        };
    }>;
    getSlugs(): Promise<string[]>;
    getSlugsByCategory(categorySlug: string): Promise<string[]>;
    private transform;
}
