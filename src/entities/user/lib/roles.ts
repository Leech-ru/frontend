import { UserRole } from "../api/types";
import { USER_ROLES_NAMES } from "../config/roles";

export const getRoleDisplayName = (role: UserRole) => {
  return USER_ROLES_NAMES[role];
};
