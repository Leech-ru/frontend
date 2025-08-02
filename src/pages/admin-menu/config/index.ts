import { AdminMenuBuyInfoComponent } from "@/pages/admin-menu/ui/content/admin-buy-info/admin-buy-info";

export interface AdminTab {
  name: string;
  content: unknown;
}

export const ADMIN_TABS = [
  {
    name: "Основная информация",
    content: AdminMenuBuyInfoComponent,
  },
  {
    name: "Косметика",
    content: AdminMenuBuyInfoComponent,
  },
  {
    name: "Партнеры",
    content: AdminMenuBuyInfoComponent,
  },
  {
    name: "Администраторы",
    content: AdminMenuBuyInfoComponent,
  },
] as const satisfies readonly AdminTab[];

export type AdminTabName = (typeof ADMIN_TABS)[number]["name"];
