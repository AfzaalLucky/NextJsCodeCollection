import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import configuration from './config/configuration';
import { WordpressModule } from './modules/wordpress/wordpress.module';
import { ServicesModule } from './modules/services/services.module';
import { PostsModule } from './modules/posts/posts.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { LocationsModule } from './modules/locations/locations.module';
import { SeoModule } from './modules/seo/seo.module';
import { HttpCacheInterceptor } from './common/interceptors/cache.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 300,
      max: 100,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 60,
      },
    ]),
    WordpressModule,
    ServicesModule,
    PostsModule,
    CategoriesModule,
    LocationsModule,
    SeoModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
})
export class AppModule {}
