import AppError from '../shared/AppError';
import { NextFunction, Request, Response } from 'express';

const roleMiddleware = (roles: string[] = []) => {
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    (request: Request, _response: Response, next: NextFunction) => {
      if (roles.length && !roles.includes(request.user.role)) {
        const error: AppError = new AppError('Acesso negado', 401);
        return next(error);
      }
      return next();
    },
  ];
};

export default roleMiddleware;
