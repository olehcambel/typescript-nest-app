import { ExceptionFilter, Catch, HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    let response = host.switchToHttp().getResponse();
    let status = (error instanceof HttpException) ? error.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;

    if (status === HttpStatus.UNAUTHORIZED) 
        return response.status(status).json({
          statusCode: status,
        });
    if (status === HttpStatus.NOT_FOUND) 
        return response.status(status).json({
          statusCode: status,
        });
    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
        if (process.env.NODE_ENV === 'production') {
          console.error(error.stack);
          return response.status(status).json({
          statusCode: status,
          message: 'Internal server error'
          });
        }
        else {
          let message = error.stack;
          return response.status(status).send(message); 
        } 
    }
    else {
      return response.status(status).json(error.message);
    }
  }
}