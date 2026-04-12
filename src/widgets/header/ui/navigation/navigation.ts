import { USER_RESOURCE } from "@/entities/user";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
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
  protected readonly userResource = inject(USER_RESOURCE);
  protected readonly items = NAVIGATION_ITEMS;
}
