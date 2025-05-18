import { Component } from "@angular/core";

import { AppHeaderNavigationLinkComponent } from "./link/link.component";
import { NAVIGATION_ITEMS } from "../../config/navigation.config";

@Component({
  selector: "app-header-navigation",
  templateUrl: "navigation.component.html",
  styleUrl: "navigation.component.scss",
  imports: [AppHeaderNavigationLinkComponent],
})
export class AppHeaderNavigationComponent {
  protected readonly items = NAVIGATION_ITEMS;
}
