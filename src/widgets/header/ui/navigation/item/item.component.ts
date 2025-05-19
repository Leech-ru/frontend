import { Component, Input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TuiButton, TuiDataList, TuiDropdown } from "@taiga-ui/core";
import { TuiChevron } from "@taiga-ui/kit";

import { NavigationItem } from "../../../model/navigation.model";

@Component({
  selector: "app-header-navigation-item",
  templateUrl: "item.component.html",
  styleUrl: "item.component.less",
  imports: [
    RouterLink,
    RouterLinkActive,
    TuiButton,
    TuiChevron,
    TuiDataList,
    TuiDropdown,
  ],
})
export class AppHeaderNavigationItemComponent {
  @Input({ required: true })
  public item!: NavigationItem;

  protected isDropdownOpen: boolean = false;
}
