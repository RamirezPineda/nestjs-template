import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { corsConfig } from '@/config/cors.config';
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  app.setGlobalPrefix('api/v1');
  app.enableCors(corsConfig);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const configService = app.get(ConfigService);
  const port: number = configService.get('PORT') ?? 4000;
  const appUrl: string =
    configService.get('APP_URL') ?? 'http://localhost:4000';

  await app.listen(port);
  logger.log(`Server running in ${appUrl} 🚀`);
}
void bootstrap();
