import AppError from '../shared/AppError';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (
  error: AppError,
  _request: Request,
  response: Response,
  next: NextFunction
) => {
  const status = error.statusCode || 500;
  const message = error.message || 'Erro interno do servidor';
  return response.status(status).json({ status, message });
  next();
};

export default errorMiddleware;
