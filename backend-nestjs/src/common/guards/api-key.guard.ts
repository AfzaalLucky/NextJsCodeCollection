import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey =
      request.headers['x-api-key'] ||
      request.query['apiKey'];

    const expectedKey = this.config.get<string>('security.apiKey');

    // Skip guard in development if no key set
    if (this.config.get('nodeEnv') === 'development' && !expectedKey) {
      return true;
    }

    if (apiKey !== expectedKey) {
      throw new UnauthorizedException('Invalid API key');
    }
    return true;
  }
}
