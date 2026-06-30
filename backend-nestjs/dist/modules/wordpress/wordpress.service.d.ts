import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
export declare class WordpressService {
    private readonly http;
    private readonly config;
    private readonly logger;
    private readonly apiUrl;
    private readonly authHeader;
    constructor(http: HttpService, config: ConfigService);
    private getRequestConfig;
    get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T>;
    getPosts(params?: Record<string, unknown>): Promise<any[]>;
    getPost(slug: string): Promise<any>;
    getPages(params?: Record<string, unknown>): Promise<any[]>;
    getPage(slug: string): Promise<any>;
    getServices(params?: Record<string, unknown>): Promise<any[]>;
    getService(slug: string): Promise<any>;
    getLocations(params?: Record<string, unknown>): Promise<any[]>;
    getLocation(slug: string): Promise<any>;
    getCategories(): Promise<any[]>;
    getTags(): Promise<any[]>;
    extractFeaturedImage(item: any): {
        id: any;
        url: any;
        alt: any;
        width: any;
        height: any;
    };
    extractSeoMeta(item: any): {
        title: any;
        description: any;
        canonical: any;
        ogImage: any;
    };
}
