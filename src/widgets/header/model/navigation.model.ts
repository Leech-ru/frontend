import { UserRole } from "@/entities/user";

export interface NavigationItem {
  label: string;
  routerLink: string;
  roles?: UserRole[];
}
