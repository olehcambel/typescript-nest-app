import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RolesGuard } from './common/guards/roles.guard';
import { authMiddleware } from './common/middlewares/auth.middleware';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';
// import {logger} from './common/middleware/logger.middleware'
// import { AuthService } from './auth/auth.service';

@Module({
  imports: [CatsModule],
  controllers: [AppController],
  providers: [
    AppService,
    // AuthService,
    //// global
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard
    // }
    //    {
    //   provide: APP_FILTER,
    //   useClass: HttpExceptionFilter
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(authMiddleware())
      // .apply(LoggerMiddleware())
      // .with('ApplicationMwwwM')
      // .forRoutes({path: 'cats', method: RequestMethod.ALL})
      .forRoutes('cats');
  }
}
