import { ChangeDetectionStrategy, Component, input } from "@angular/core";
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderNavigationItemComponent {
  public item = input.required<NavigationItem>();
  protected isDropdownOpen: boolean = false;
}
