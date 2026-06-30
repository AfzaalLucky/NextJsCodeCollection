import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { WordpressModule } from '../wordpress/wordpress.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [WordpressModule, CategoriesModule],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
