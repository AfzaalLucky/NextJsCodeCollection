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
exports.ServicesService = void 0;
const common_1 = require("@nestjs/common");
const wordpress_service_1 = require("../wordpress/wordpress.service");
let ServicesService = class ServicesService {
    constructor(wp) {
        this.wp = wp;
    }
    async findAll() {
        const raw = await this.wp.getServices();
        return raw.map((item) => this.transform(item));
    }
    async findOne(slug) {
        const raw = await this.wp.getService(slug);
        if (!raw)
            return null;
        return this.transform(raw);
    }
    async getSlugs() {
        const raw = await this.wp.getServices({ per_page: 100 });
        return raw.map((item) => item.slug);
    }
    transform(item) {
        return {
            id: item.id,
            slug: item.slug,
            title: item.title?.rendered || '',
            excerpt: item.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || '',
            content: item.content?.rendered || '',
            featuredImage: this.wp.extractFeaturedImage(item),
            seo: this.wp.extractSeoMeta(item),
            icon: item.acf?.icon || '',
            price: item.acf?.price || '',
            features: item.acf?.features || [],
            date: item.date,
            modified: item.modified,
        };
    }
};
exports.ServicesService = ServicesService;
exports.ServicesService = ServicesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [wordpress_service_1.WordpressService])
], ServicesService);
//# sourceMappingURL=services.service.js.map