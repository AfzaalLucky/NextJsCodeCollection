import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { WordpressService } from './wordpress.service';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 3,
    }),
  ],
  providers: [WordpressService],
  exports: [WordpressService],
})
export class WordpressModule {}
