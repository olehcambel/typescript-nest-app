import { ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus, } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    call$: Observable<any>,
  ): Observable<any> {
    return call$.pipe(
      catchError(err => {
        //
        return throwError(new HttpException(err, HttpStatus.BAD_GATEWAY));
      }),
    );
  }
}
