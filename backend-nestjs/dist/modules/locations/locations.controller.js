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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationsController = void 0;
const common_1 = require("@nestjs/common");
const locations_service_1 = require("./locations.service");
const api_key_guard_1 = require("../../common/guards/api-key.guard");
let LocationsController = class LocationsController {
    constructor(locationsService) {
        this.locationsService = locationsService;
    }
    async findAll() {
        return this.locationsService.findAll();
    }
    async getSlugs() {
        return this.locationsService.getSlugs();
    }
    async findOne(slug) {
        const location = await this.locationsService.findOne(slug);
        if (!location)
            throw new common_1.NotFoundException(`Location "${slug}" not found`);
        return location;
    }
};
exports.LocationsController = LocationsController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('slugs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "getSlugs", null);
__decorate([
    (0, common_1.Get)(':slug'),
    __param(0, (0, common_1.Param)('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LocationsController.prototype, "findOne", null);
exports.LocationsController = LocationsController = __decorate([
    (0, common_1.Controller)('api/locations'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    __metadata("design:paramtypes", [locations_service_1.LocationsService])
], LocationsController);
//# sourceMappingURL=locations.controller.js.map