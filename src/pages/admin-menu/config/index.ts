import { AdminMenuBuyInfoComponent } from "../ui/content/admin-buy-info/admin-buy-info.component";
import { AdminCompanyInfoComponent } from "../ui/content/admin-company-info/admin-company-info.component";
import { AdminCosmeticsComponent } from "../ui/content/admin-cosmetic/admin-cosmetics.component";

export interface AdminTab {
  name: string;
  content: unknown;
}

export const ADMIN_TABS = [
  {
    name: "Основная информация",
    content: AdminCompanyInfoComponent,
  },
  {
    name: "Косметика",
    content: AdminCosmeticsComponent,
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
