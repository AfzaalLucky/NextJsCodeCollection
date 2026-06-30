import { WordpressService } from '../wordpress/wordpress.service';
export interface WPCategory {
    id: number;
    slug: string;
    name: string;
    description: string;
    count: number;
    parent: number;
}
export declare class CategoriesService {
    private readonly wp;
    constructor(wp: WordpressService);
    findAll(): Promise<WPCategory[]>;
    findBySlug(slug: string): Promise<WPCategory | null>;
    findIdBySlug(slug: string): Promise<number | null>;
}
