import { Component, Input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TuiButton, TuiDataList, TuiDropdown } from "@taiga-ui/core";
import { TuiChevron } from "@taiga-ui/kit";

import { NavigationItem } from "../../../model/navigation.model";

@Component({
  selector: "app-header-navigation-link",
  templateUrl: "link.component.html",
  styleUrl: "link.component.scss",
  imports: [
    RouterLink,
    RouterLinkActive,
    TuiButton,
    TuiChevron,
    TuiDataList,
    TuiDropdown,
  ],
})
export class AppHeaderNavigationLinkComponent {
  @Input({ required: true })
  public item!: NavigationItem;

  protected isDropdownOpen: boolean = false;
}
