import { NextFunction } from "connect";

export const authMiddleware = () => (req, _res, next: NextFunction) => {
// export const authMiddleware = () => (req, _res, next: NextFunction) => {
  const {token} = req.query
  if (token && token === '1234'){
    req.user = {
      roles: ['admin', 'user']
    }
  }
  next();
};

