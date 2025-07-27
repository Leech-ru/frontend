import type { USER_ROLES } from "../model/constants";

export type UserRole = (typeof USER_ROLES)[number];

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
}

export interface UserRegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRole;
}

export type UserLoginRequest = {
  email: string;
  password: string;
};
