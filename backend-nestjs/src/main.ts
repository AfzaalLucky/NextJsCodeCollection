import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  app.use(helmet());

  const allowedOrigins = config.get<string[]>('security.allowedOrigins');
  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'HEAD'],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const port = config.get<number>('port');
  await app.listen(port, '0.0.0.0');
  console.log(`NestJS API running on port ${port}`);
}
bootstrap();
