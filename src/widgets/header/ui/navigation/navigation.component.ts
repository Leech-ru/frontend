import { Component } from "@angular/core";

import { AppHeaderNavigationItemComponent } from "./item/item.component";
import { NAVIGATION_ITEMS } from "../../config/navigation.config";

@Component({
  selector: "app-header-navigation",
  templateUrl: "navigation.component.html",
  styleUrl: "navigation.component.less",
  imports: [AppHeaderNavigationItemComponent],
})
export class AppHeaderNavigationComponent {
  protected readonly items = NAVIGATION_ITEMS;
}
