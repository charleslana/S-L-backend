import RoleEnum from '../enum/RoleEnum';

export default interface IUser {
  id?: number;
  email?: string;
  password?: string;
  name?: string;
  role?: RoleEnum;
}
