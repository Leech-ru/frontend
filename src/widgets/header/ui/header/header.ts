import { UserStore } from "@/entities/user";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { AppHeaderDrawerComponent } from "../drawer";
import { AppHeaderLogoComponent } from "../logo";
import { AppHeaderNavigationComponent } from "../navigation";
import { AppHeaderNavigationItemComponent } from "../navigation/item";

@Component({
  selector: "app-header",
  templateUrl: "header.html",
  styleUrl: "header.less",
  imports: [
    AppHeaderDrawerComponent,
    AppHeaderLogoComponent,
    AppHeaderNavigationComponent,
    AppHeaderNavigationItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent {
  protected readonly userStore = inject(UserStore);
}
