import { CacheInterceptor } from '@nestjs/cache-manager';
export declare class HttpCacheInterceptor extends CacheInterceptor {
    protected isRequestCacheable(context: any): boolean;
}
