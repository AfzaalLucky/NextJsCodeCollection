import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    findAll(): Promise<import("./categories.service").WPCategory[]>;
    findOne(slug: string): Promise<import("./categories.service").WPCategory>;
}
