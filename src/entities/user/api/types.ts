import { USER_ROLES } from "../config/roles";

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
