import { TUserRole } from './auth.types';

export interface UserModel {
  username: string;
  role: TUserRole;
}
