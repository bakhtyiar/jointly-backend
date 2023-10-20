import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MongoExceptionFilter } from '@src/utilities/filters/MongoExceptionFilter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { configKeys } from '@src/config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // todo: implement forwarding mongodb errors to response
  // app.useGlobalFilters(new MongoExceptionFilter());
  const configService = app.get<ConfigService>(ConfigService);
  await app.listen(configService.get(String(configKeys.PORT)));
}
bootstrap();
