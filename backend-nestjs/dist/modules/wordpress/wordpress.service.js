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
var WordpressService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordpressService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
let WordpressService = WordpressService_1 = class WordpressService {
    constructor(http, config) {
        this.http = http;
        this.config = config;
        this.logger = new common_1.Logger(WordpressService_1.name);
        this.apiUrl = this.config.get('wordpress.apiUrl');
        const user = this.config.get('wordpress.username');
        const pass = this.config.get('wordpress.appPassword');
        if (user && pass) {
            this.authHeader = 'Basic ' + Buffer.from(`${user}:${pass}`).toString('base64');
        }
    }
    getRequestConfig() {
        const headers = {};
        if (this.authHeader) {
            headers['Authorization'] = this.authHeader;
        }
        return { headers };
    }
    async get(endpoint, params) {
        try {
            const url = `${this.apiUrl}${endpoint}`;
            const config = { ...this.getRequestConfig(), params };
            const response = await (0, rxjs_1.firstValueFrom)(this.http.get(url, config));
            return response.data;
        }
        catch (error) {
            this.logger.error(`WordPress API error [${endpoint}]: ${error.message}`);
            throw new common_1.HttpException(`Failed to fetch from WordPress: ${error.message}`, common_1.HttpStatus.BAD_GATEWAY);
        }
    }
    async getPosts(params) {
        return this.get('/posts', { per_page: 12, _embed: true, ...params });
    }
    async getPost(slug) {
        const posts = await this.get('/posts', { slug, _embed: true });
        return posts[0] || null;
    }
    async getPages(params) {
        return this.get('/pages', { per_page: 100, _embed: true, ...params });
    }
    async getPage(slug) {
        const pages = await this.get('/pages', { slug, _embed: true });
        return pages[0] || null;
    }
    async getServices(params) {
        return this.get('/services', { per_page: 100, _embed: true, ...params });
    }
    async getService(slug) {
        const items = await this.get('/services', { slug, _embed: true });
        return items[0] || null;
    }
    async getLocations(params) {
        return this.get('/locations', { per_page: 100, _embed: true, ...params });
    }
    async getLocation(slug) {
        const items = await this.get('/locations', { slug, _embed: true });
        return items[0] || null;
    }
    async getCategories() {
        return this.get('/categories', { per_page: 100 });
    }
    async getTags() {
        return this.get('/tags', { per_page: 100 });
    }
    extractFeaturedImage(item) {
        const media = item?._embedded?.['wp:featuredmedia']?.[0];
        if (!media)
            return null;
        return {
            id: media.id,
            url: media.source_url,
            alt: media.alt_text || media.title?.rendered || '',
            width: media.media_details?.width || 0,
            height: media.media_details?.height || 0,
        };
    }
    extractSeoMeta(item) {
        const yoast = item?.yoast_head_json;
        return {
            title: yoast?.title || item?.title?.rendered || '',
            description: yoast?.description || item?.excerpt?.rendered?.replace(/<[^>]+>/g, '').trim() || '',
            canonical: yoast?.canonical || '',
            ogImage: yoast?.og_image?.[0]?.url || this.extractFeaturedImage(item)?.url || '',
        };
    }
};
exports.WordpressService = WordpressService;
exports.WordpressService = WordpressService = WordpressService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService])
], WordpressService);
//# sourceMappingURL=wordpress.service.js.map