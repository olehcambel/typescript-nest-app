// import { Injectable, NestMiddleware, MiddlewareFunction } from '@nestjs/common';
export const logger = () => (req, res, next) => {
  console.log('request..');
  next();
};
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   resolve(name: string): MiddlewareFunction {
//     return (req, res, next) => {
//       console.log(`[${name}]: request`);
//       next();
//     };
//   }
// }
