import AppError from '../shared/AppError';
import IAuthenticate from '../interface/IAuthenticate';
import IUser from '../interface/IUser';
import jwt from 'jsonwebtoken';
import MessageUtils from '../utils/MessageUtils';
import RoleEnum from '../enum/RoleEnum';
import Utils from '../utils/Utils';
import { Optional } from 'sequelize';
import { UserModel } from '../database/models/UserModel';

export default class UserService {
  static async save(user: IUser) {
    const emailExist = await UserModel.count({
      where: {
        email: user.email,
      },
    });
    if (emailExist) {
      throw new AppError(MessageUtils.emailUserAlreadyExist, 400);
    }
    const nameExist = await UserModel.count({
      where: {
        name: user.name,
      },
    });
    if (nameExist) {
      throw new AppError(MessageUtils.nameUserAlreadyExist, 400);
    }
    user.password = Utils.encrypt(user.password as string);
    return await UserModel.create(user as Optional<unknown, never>);
  }

  static async getAll(): Promise<IUser[]> {
    const users = (await UserModel.findAll({
      attributes: { exclude: ['password'] },
    })) as IUser[];
    if (users.length === 0) {
      throw new AppError(MessageUtils.usersNotFound, 404);
    }
    return users;
  }

  static async get(id: number): Promise<IUser> {
    return await this.getUserById(id);
  }

  static async update(user: IUser) {
    await this.getUserById(user.id);
    const userNameExist = (await UserModel.findOne({
      where: {
        name: user.name,
      },
    })) as IUser;
    if (
      userNameExist &&
      userNameExist.name === user.name &&
      userNameExist.id !== user.id
    ) {
      throw new AppError(MessageUtils.nameUserAlreadyExist, 400);
    }
    await UserModel.update(
      {
        name: user.name,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
  }

  static async delete(id: number) {
    await this.getUserById(id);
    await UserModel.destroy({
      where: {
        id: id,
      },
    });
  }

  static async login(email: string, password: string): Promise<IAuthenticate> {
    const user = (await UserModel.findOne({
      where: {
        email: email,
      },
    })) as IUser;
    if (!user) {
      throw new AppError(MessageUtils.loginError, 404);
    }
    if (!Utils.decrypt(password, user.password as string)) {
      throw new AppError(MessageUtils.loginError, 404);
    }
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string, {
      expiresIn: '1d',
    });
    return {
      accessToken: token,
      role: user.role as RoleEnum,
    };
  }

  private static async getUserById(id?: number): Promise<IUser> {
    const user = (await UserModel.findOne({
      where: {
        id: id,
      },
      attributes: { exclude: ['password'] },
    })) as IUser;
    if (!user) {
      throw new AppError(MessageUtils.userNotFound, 404);
    }
    return user;
  }
}
