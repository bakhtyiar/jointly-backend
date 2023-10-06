import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MongoExceptionFilter } from '@src/utilities/filters/MongoExceptionFilter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  // todo: implement forwarding mongodb errors to response
  // app.useGlobalFilters(new MongoExceptionFilter());
  await app.listen(process.env.PORT);
}
bootstrap();
