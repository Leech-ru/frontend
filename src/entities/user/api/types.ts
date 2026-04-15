import type { USER_ROLES } from "../config/roles";

export type UserRole = (typeof USER_ROLES)[number];

export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  role: UserRole;
}

export interface Pagination {
  current_page: number;
  has_next: boolean;
  has_previous: boolean;
  total_items: number;
  total_pages: number;
}

export interface UsersPagination {
  items: User[];
  pagination: Pagination;
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

export interface UserPatchRequest {
  name: string;
  surname: string;
  email: string;
  role: UserRole;
}

export interface UserGetAllParams {
  q?: string;
  role?: UserRole;
  limit?: number;
  offset?: number;
}
