import type { USER_ROLES } from "./constants";

export type UserRole = (typeof USER_ROLES)[number];

export type UserRegisterationRequest = {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: UserRole;
};

export type UserRegisterationResponse = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
};

export type UserLoginResponse = {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
};

export type UserLoginRequest = {
  email: string;
  password: string;
};
