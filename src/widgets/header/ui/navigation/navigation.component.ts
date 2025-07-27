import { ChangeDetectionStrategy, Component, inject } from "@angular/core";

import { UserStore } from "@/entities/user";

import { AppHeaderNavigationItemComponent } from "./item/item.component";
import {
  ADMIN_NAVIGATION_ITEM,
  NAVIGATION_ITEMS,
} from "../../config/navigation.config";

@Component({
  selector: "app-header-navigation",
  templateUrl: "navigation.component.html",
  styleUrl: "navigation.component.less",
  imports: [AppHeaderNavigationItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderNavigationComponent {
  protected readonly items = NAVIGATION_ITEMS;
  protected readonly adminItem = ADMIN_NAVIGATION_ITEM;
  protected readonly userStore = inject(UserStore);
  protected readonly isAdmin = this.userStore.isAdmin;
}
