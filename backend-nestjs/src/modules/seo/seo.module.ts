import { Module } from '@nestjs/common';
import { SeoController } from './seo.controller';
import { SeoService } from './seo.service';
import { ServicesModule } from '../services/services.module';
import { PostsModule } from '../posts/posts.module';
import { LocationsModule } from '../locations/locations.module';

@Module({
  imports: [ServicesModule, PostsModule, LocationsModule],
  controllers: [SeoController],
  providers: [SeoService],
})
export class SeoModule {}
