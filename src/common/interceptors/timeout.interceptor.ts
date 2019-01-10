import { Injectable, NestInterceptor, ExecutionContext, RequestTimeoutException, } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    const now = Date.now()
    return call$.pipe(
      timeout(5000),
      catchError(err => {
        return throwError(new RequestTimeoutException(`Your request to the backend server timed out. ${Date.now() - now}ms`));

      }),
    );
  }
}
