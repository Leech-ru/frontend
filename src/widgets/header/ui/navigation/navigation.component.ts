import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TuiButton, TuiDataList, TuiDropdown } from "@taiga-ui/core";
import { TuiChevron } from "@taiga-ui/kit";

import { NAVIGATION_ITEMS } from "../../config/navigation.config";

@Component({
  selector: "app-header-navigation",
  templateUrl: "navigation.component.html",
  styleUrl: "navigation.component.scss",
  imports: [
    RouterLink,
    RouterLinkActive,
    TuiButton,
    TuiChevron,
    TuiDataList,
    TuiDropdown,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderNavigationComponent {
  protected readonly items = NAVIGATION_ITEMS;
  protected readonly dropdownOpenStates: { [routerLink: string]: boolean } = {};
}
