import { PostsService } from './posts.service';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    findAll(page?: string, perPage?: string, category?: string): Promise<{
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
    getSlugs(category?: string): Promise<string[]>;
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
}
