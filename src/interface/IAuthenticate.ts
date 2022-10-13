import RoleEnum from '../enum/RoleEnum';

export default interface IAuthenticate {
  accessToken: string;
  role: RoleEnum;
}
