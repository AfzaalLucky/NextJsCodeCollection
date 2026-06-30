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
exports.SeoController = void 0;
const common_1 = require("@nestjs/common");
const seo_service_1 = require("./seo.service");
const api_key_guard_1 = require("../../common/guards/api-key.guard");
let SeoController = class SeoController {
    constructor(seoService) {
        this.seoService = seoService;
    }
    async getSitemap() {
        return this.seoService.generateSitemap();
    }
    getRobots() {
        return this.seoService.getRobotsTxt();
    }
    getLocalBusinessSchema() {
        return this.seoService.generateLocalBusinessSchema();
    }
};
exports.SeoController = SeoController;
__decorate([
    (0, common_1.Get)('sitemap.xml'),
    (0, common_1.Header)('Content-Type', 'application/xml'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeoController.prototype, "getSitemap", null);
__decorate([
    (0, common_1.Get)('robots.txt'),
    (0, common_1.Header)('Content-Type', 'text/plain'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeoController.prototype, "getRobots", null);
__decorate([
    (0, common_1.Get)('api/seo/local-business'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SeoController.prototype, "getLocalBusinessSchema", null);
exports.SeoController = SeoController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [seo_service_1.SeoService])
], SeoController);
//# sourceMappingURL=seo.controller.js.map