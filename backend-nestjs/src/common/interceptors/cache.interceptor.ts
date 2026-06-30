import { Injectable } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  protected isRequestCacheable(context: any): boolean {
    const request = context.switchToHttp().getRequest();
    return request.method === 'GET';
  }
}
