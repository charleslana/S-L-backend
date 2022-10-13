import RoleEnum from '../../enum/RoleEnum';
import { database } from '../database';
import { DataTypes } from 'sequelize';

export const UserModel = database.define('user', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.ENUM(...Object.values(RoleEnum)),
    allowNull: false,
    defaultValue: RoleEnum.User,
  },
});
