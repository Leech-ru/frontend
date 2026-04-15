import { UserRole } from "@/entities/user";

export type NavigationSection = "navigation" | "admin";

export interface NavigationItem {
  label: string;
  routerLink: string;
  roles?: UserRole[];
  section?: NavigationSection;
}
