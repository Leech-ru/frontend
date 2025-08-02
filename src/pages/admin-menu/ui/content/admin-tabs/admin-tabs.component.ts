import { Component, inject } from "@angular/core";
import { TuiItem } from "@taiga-ui/cdk";
import { TuiTab, TuiTabsWithMore } from "@taiga-ui/kit";

import { AdminMenuTabsStore } from "@/pages/admin-menu";
import { ADMIN_TABS } from "@/pages/admin-menu/config";

@Component({
  selector: "app-admin-menu-tabs",
  imports: [TuiTabsWithMore, TuiTab, TuiItem],
  templateUrl: "admin-tabs.component.html",
  styleUrl: "admin-tabs.component.less",
})
export class AdminTabsComponent {
  protected readonly store = inject(AdminMenuTabsStore);
  protected readonly tabs = ADMIN_TABS;
}
