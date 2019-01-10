import { NestFactory, HTTP_SERVER_REF } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filter/all-expeption.filter';
import { ErrorFilter } from './common/filter/error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const httpRef = app.get(HTTP_SERVER_REF)
  // app.useGlobalFilters(new AllExceptionsFilter(httpRef))
  // app.useGlobalFilters(new ErrorFilter())
  await app.listen(5050);
}
bootstrap();
