import { ChangeDetectionStrategy, Component } from "@angular/core";
import { NAVIGATION_ITEMS } from "../../config/navigation.config";
import { AppHeaderNavigationItemComponent } from "./item";

@Component({
  selector: "app-header-navigation",
  templateUrl: "navigation.html",
  styleUrl: "navigation.less",
  imports: [AppHeaderNavigationItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderNavigationComponent {
  protected readonly items = NAVIGATION_ITEMS;
}
