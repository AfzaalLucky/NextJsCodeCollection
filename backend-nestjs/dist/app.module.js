"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cache_manager_1 = require("@nestjs/cache-manager");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const configuration_1 = require("./config/configuration");
const wordpress_module_1 = require("./modules/wordpress/wordpress.module");
const services_module_1 = require("./modules/services/services.module");
const posts_module_1 = require("./modules/posts/posts.module");
const categories_module_1 = require("./modules/categories/categories.module");
const locations_module_1 = require("./modules/locations/locations.module");
const seo_module_1 = require("./modules/seo/seo.module");
const cache_interceptor_1 = require("./common/interceptors/cache.interceptor");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
                ttl: 300,
                max: 100,
            }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    ttl: 60000,
                    limit: 60,
                },
            ]),
            wordpress_module_1.WordpressModule,
            services_module_1.ServicesModule,
            posts_module_1.PostsModule,
            categories_module_1.CategoriesModule,
            locations_module_1.LocationsModule,
            seo_module_1.SeoModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: cache_interceptor_1.HttpCacheInterceptor,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map