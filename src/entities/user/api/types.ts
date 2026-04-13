import type { USER_ROLES } from "../config/roles";

export type UserRole = (typeof USER_ROLES)[number];

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
}

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserRegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface UserGetAllParams {
  search?: string;
  role?: UserRole;
}
