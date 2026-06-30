"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const wordpress_service_1 = require("../wordpress/wordpress.service");
const categories_service_1 = require("../categories/categories.service");
let PostsService = class PostsService {
    constructor(wp, categoriesService) {
        this.wp = wp;
        this.categoriesService = categoriesService;
    }
    async findAll(page = 1, perPage = 12) {
        const raw = await this.wp.getPosts({ page, per_page: perPage });
        return raw.map((item) => this.transform(item));
    }
    async findByCategory(categorySlug, page = 1, perPage = 12) {
        const categoryId = await this.categoriesService.findIdBySlug(categorySlug);
        if (!categoryId)
            return [];
        const raw = await this.wp.getPosts({ categories: categoryId, page, per_page: perPage });
        return raw.map((item) => this.transform(item));
    }
    async findOne(slug) {
        const raw = await this.wp.getPost(slug);
        if (!raw)
            return null;
        return this.transform(raw);
    }
    async getSlugs() {
        const raw = await this.wp.getPosts({ per_page: 100 });
        return raw.map((item) => item.slug);
    }
    async getSlugsByCategory(categorySlug) {
        const categoryId = await this.categoriesService.findIdBySlug(categorySlug);
        if (!categoryId)
            return [];
        const raw = await this.wp.getPosts({ categories: categoryId, per_page: 100 });
        return raw.map((item) => item.slug);
    }
    transform(item) {
        const categories = item._embedded?.['wp:term']?.[0]?.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
        })) || [];
        const tags = item._embedded?.['wp:term']?.[1]?.map((t) => t.name) || [];
        return {
            id: item.id,
            slug: item.slug,
            title: item.title?.rendered || '',
            excerpt: item.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || '',
            content: item.content?.rendered || '',
            date: item.date,
            modified: item.modified,
            featuredImage: this.wp.extractFeaturedImage(item),
            categories,
            tags,
            seo: this.wp.extractSeoMeta(item),
        };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [wordpress_service_1.WordpressService,
        categories_service_1.CategoriesService])
], PostsService);
//# sourceMappingURL=posts.service.js.map