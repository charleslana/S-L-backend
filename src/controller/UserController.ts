import AppSuccess from '../shared/AppSuccess';
import MessageUtils from '../utils/MessageUtils';
import UserService from '../service/UserService';
import { NextFunction, Request, Response } from 'express';

export default class UserController {
  static async create(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { email, password, name } = request.body;
    try {
      await UserService.save({
        email: email,
        password: password,
        name: name,
      });
      return new AppSuccess(MessageUtils.successUserCreate, 201).toJSON(
        response
      );
    } catch (error) {
      next(error);
    }
  }

  static async findAll(
    _request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const users = await UserService.getAll();
      return response.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  static async findOne(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { id } = request.params;
    try {
      const user = await UserService.get(+id);
      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async update(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { name } = request.body;
    try {
      await UserService.update({
        id: request.user.id,
        name: name,
      });
      return new AppSuccess(MessageUtils.successUserUpdate).toJSON(response);
    } catch (error) {
      next(error);
    }
  }

  static async delete(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const { id } = request.params;
    try {
      await UserService.delete(+id);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  static async login(request: Request, response: Response, next: NextFunction) {
    const { email, password } = request.body;
    try {
      const authenticate = await UserService.login(email, password);
      return response.status(200).json(authenticate);
    } catch (error) {
      next(error);
    }
  }

  static async detail(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const user = await UserService.get(request.user.id);
      return response.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}
