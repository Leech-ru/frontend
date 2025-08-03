import { NgComponentOutlet } from "@angular/common";
import { Component, inject } from "@angular/core";

import { ADMIN_TABS, AdminMenuTabsStore } from "@/pages/admin-menu";
import AdminTabsComponent from "@/pages/admin-menu/ui/content";

@Component({
  selector: "app-admin-menu-page",
  templateUrl: "admin.component.html",
  styleUrl: "admin.component.less",
  imports: [AdminTabsComponent, NgComponentOutlet],
})
export class AppAdminPageComponent {
  protected readonly store = inject(AdminMenuTabsStore);
  protected readonly tabs = ADMIN_TABS;
}
