import { Injectable } from '@angular/core';
import { UserModel } from './model/user.model';
import { TUserRole } from './model/auth.types';

const USERS: UserModel[] = [
  {
    username: 'user',
    role: 'user',
  },
  {
    username: 'admin',
    role: 'admin',
  },
  {
    username: 'root',
    role: 'admin',
  },
];

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user: UserModel | undefined = undefined;

  auth(user: UserModel): boolean {
    this.user = USERS.find((u) => u.username === user?.username && u.role === user?.role);
    return !!this.user;
  }

  getRole(): TUserRole {
    return this.user?.role || 'none';
  }

  verifyLogin(): boolean {
    return this.user?.role === 'admin';
  }
}
