import { ChangeDetectionStrategy, Component, input } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { TuiButton, TuiDataList, TuiDropdown } from "@taiga-ui/core";
import { TuiSkeleton } from "@taiga-ui/kit";
import { NavigationItem } from "../../../model/navigation.model";

@Component({
  selector: "app-header-navigation-item",
  templateUrl: "item.html",
  styleUrl: "item.less",
  imports: [
    RouterLink,
    RouterLinkActive,
    TuiButton,
    TuiDataList,
    TuiDropdown,
    TuiSkeleton,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderNavigationItemComponent {
  public item = input.required<NavigationItem>();
  public loading = input<boolean>(false);
}
